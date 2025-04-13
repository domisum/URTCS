import {distance as mathjsDistance, number} from "mathjs";
import type {Coordinate} from "../../model";

export interface SvgCoordinate {
    x: number;
    y: number;
}

export interface SvgCursor {
    coordinate: SvgCoordinate;
    location: Coordinate;
    hoveredTrackElementIds: string[];
}

export function convertCoordinateToSvg(location: Coordinate): SvgCoordinate {
    return location;
}

export function convertCoordinateFromSvg(svgCoord: SvgCoordinate): Coordinate {
    return svgCoord;
}

export function distance(a: Coordinate, b: Coordinate): number {
    return number(mathjsDistance([a.x, a.y], [b.x, b.y]));
}
