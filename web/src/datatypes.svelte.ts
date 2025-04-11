import {distance as mathjsDistance, number} from "mathjs";

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
    radius: number;
    turnDirection: "r" | "l";
}

export interface SvgCursor {
    location: Location;
    hoveredTrackElementIds: string[];
}

export function distance(a: Location, b: Location): number {
    return number(mathjsDistance([a.x, a.y], [b.x, b.y]));
}
