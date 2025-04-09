import random
from dataclasses import dataclass


@dataclass
class Location:
    x: float
    y: float


@dataclass
class Distance:
    d: float


@dataclass
class TypedId:
    ID_CHARACTERS = 'ABCDEFGHKMNPRSTWX23456789'
    
    tcs: str
    idcs: str
    
    @classmethod
    def random(cls, t: str, n: int = 6) -> 'TypedId':
        characters = random.choices(cls.ID_CHARACTERS, k=n)
        idcs = ''.join(characters)
        return TypedId(t, idcs)
    
    def __str__(self) -> str:
        return f"{self.tcs}-{self.idcs}"


@dataclass
class Point:
    id: TypedId
    location: Location


@dataclass
class Segment:
    id: TypedId
    type: str
    a: Point
    b: Point


@dataclass
class StraightSegment(Segment):
    type = "straight"
    pass


@dataclass
class RadialSegment(Segment):
    type = "radial"
    c: Point


@dataclass
class Switch:
    id: TypedId
    a: Segment
    b: Segment
    c: Segment
