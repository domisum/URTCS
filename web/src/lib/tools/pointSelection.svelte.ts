import type {Point, SvgCursor} from "../../datatypes.svelte";
import {createPoint, getPermanentPoint} from "../../track.svelte";
import type {ToolClick} from "./toolState.svelte";

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