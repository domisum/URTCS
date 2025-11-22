from typing import Annotated

from pydantic import BaseModel, Field, PlainSerializer


class Location(BaseModel):
    lat: float
    lon: float


class Identifiable:
    id: str


class Point(BaseModel, Identifiable):
    id: str
    location: Location


PointReference = Annotated[Point, PlainSerializer(lambda p: p.id)]


class Segment(BaseModel, Identifiable):
    id: str
    type: str
    a: PointReference
    b: PointReference


class StraightSegment(Segment):
    type: str = Field(default="straight", frozen=True)
    pass


class RadialSegment(Segment):
    type: str = Field(default="radial", frozen=True)
    c: Point


SegmentReference = Annotated[Segment, PlainSerializer(lambda s: s.id)]


class Switch(BaseModel, Identifiable):
    id: str
    a: SegmentReference
    b: SegmentReference
    c: SegmentReference


SwitchReference = Annotated[Switch, PlainSerializer(lambda v: v.id)]


class Layout(BaseModel):
    id: str
    points: Annotated[dict[str, Point], PlainSerializer(lambda ps: list(ps.values()))] = {}
    segments: Annotated[dict[str, SegmentReference], PlainSerializer(lambda ss: list(ss.values()))] = {}
    switches: Annotated[dict[str, SwitchReference], PlainSerializer(lambda vs: list(vs.values()))] = {}
    
    @classmethod
    def empty(cls, id: str):
        return cls(id=id)
