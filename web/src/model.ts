export interface Location {
    lat: number;
    lon: number;
}

export interface Point {
    id: string;
    location: Location;
}

export interface Segment {
    id: string;
    type: string;
    a: Point;
    b: Point;
}

export interface StraightSegment extends Segment {
    type: "straight";
}

export interface RadialSegment extends Segment {
    type: "radial";
    radius: number;
    turnDirection: "r" | "l";
}
