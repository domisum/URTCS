import type {Point, SvgCursor} from "../../datatypes.svelte";
import {createPoint, getPermanentPoint, points, removeTempElement, setTempElement} from "../../track.svelte";

export function selectPoint(svgCursor: SvgCursor, exclude: (Point | undefined)[]): Point | undefined {
    outer: for (const id of svgCursor.hoveredTrackElementIds) {
        const p = getPermanentPoint(id);
        if (p) {
            for (const e of exclude) {
                if (e && e.id == p.id)
                    continue outer;
            }
            return p;
        }
    }
    return undefined;
}

export function determinePoint(svgCursor: SvgCursor, exclude: (Point | undefined)[]): Point {
    return selectPoint(svgCursor, exclude) || createPoint(svgCursor.location);
}

export function previewPoint(svgCursor: SvgCursor, exclude: (Point | undefined)[]) {
    const selectedPoint = selectPoint(svgCursor, exclude);
    if (selectedPoint) removeTempElement(points);
    return selectedPoint || setTempElement(points, {location: svgCursor.location} as Point);
}