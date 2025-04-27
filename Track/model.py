from typing import Annotated

from pydantic import BaseModel, Field, PlainSerializer

class Location(BaseModel):
    lat: float
    lon: float

class Point(BaseModel):
    id: str
    location: Location

PointReference = Annotated[Point, PlainSerializer(lambda p: p.id)]

class Segment(BaseModel):
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

class Switch(BaseModel):
    id: str
    a: SegmentReference
    b: SegmentReference
    c: SegmentReference

SwitchReference = Annotated[Switch, PlainSerializer(lambda v: v.id)]

class Layout(BaseModel):
    id: str
    points: list[Point]
    segments: list[SegmentReference]
    switches: list[SwitchReference]
