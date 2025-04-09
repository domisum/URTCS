export interface Location {
    x: number;
    y: number;
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
    c: Point;
}

export interface SvgMouseLocation {
    location: Location;
    hoveredTrackElementIds: string[];
}