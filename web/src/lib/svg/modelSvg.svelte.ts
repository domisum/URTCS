import {distance as mathjsDistance, number} from "mathjs";
import type {Location} from "../../model";

export interface SvgCoordinate {
    x: number;
    y: number;
}

export interface SvgCursor {
    coordinate: SvgCoordinate;
    location: Location;
    hoveredTrackElementIds: string[];
}

const topLeft = {lat: 48.416, lon: 10.73}
const earthCf = 40075 * 1000;

export function convertLocationToCoordinate(location: Location): SvgCoordinate {
    const dLat = topLeft.lat - location.lat;
    const dLon = location.lon - topLeft.lon;
    const lonSquish = 1 - Math.abs(location.lat / 90) ** 2;
    const x = dLon / 360 * earthCf * lonSquish;
    const y = dLat / 360 * earthCf;
    return {x, y};
}

export function convertCoordinateToLocation(svgCoord: SvgCoordinate): Location {
    const dLat = svgCoord.y / earthCf * 360;
    const lat = topLeft.lat - dLat;
    const lonSquish = 1 - Math.abs(lat / 90) ** 2;
    const dLon = svgCoord.x / earthCf * 360 / lonSquish;
    const lon = topLeft.lon + dLon;
    return {lat, lon};
}

export function distance(a: Location, b: Location): number {
    const as = convertLocationToCoordinate(a);
    const bs = convertLocationToCoordinate(b);
    return number(mathjsDistance([as.x, as.y], [bs.x, bs.y]));
}
