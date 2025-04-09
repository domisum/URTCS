<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick, ToolMove} from "./toolState.svelte";
    import type {Point, StraightSegment, SvgMouseLocation} from "../../datatypes";
    import {
        createPoint,
        createSegment,
        getPermanentPoint,
        removeTempElements,
        removeTempPoint,
        segments,
        setTempPoint
    } from "../../track.svelte";

    let tempPoint: Point | null = $state(null);
    let a: Point | null = $state(null);
    let sTmp: StraightSegment | null = $state(null);

    function handleMove(move: ToolMove) {
        const hoveredPoint = getHoveredCandidatePoint(move.svgMouseLocation);
        if (hoveredPoint) {
            removeTempPoint(0);
            if (sTmp)
                sTmp.b = hoveredPoint;
        } else {
            tempPoint = setTempPoint(0, move.svgMouseLocation.location);
            if (sTmp)
                sTmp.b = tempPoint;
        }
    }

    function handleClick(click: ToolClick) {
        if (!a) {
            a = determinePoint(click);
            sTmp = {id: "s-tmp-0", type: "straight", a, b: tempPoint} as StraightSegment;
            segments.push(sTmp);
            return;
        }

        const b = determinePoint(click);
        createSegment({type: "straight", a, b} as StraightSegment);

        a = null;
        sTmp = null;
        removeTempElements();
        handleMove(click);
    }

    function determinePoint(click: ToolClick) {
        return getHoveredCandidatePoint(click.svgMouseLocation) || createPoint(click.svgMouseLocation.location);
    }

    function getHoveredCandidatePoint(svgMouseLocation: SvgMouseLocation) {
        for (const id of svgMouseLocation.hoveredTrackElementIds) {
            const p = getPermanentPoint(id);
            if (p) {
                if (a && a.id == p.id)
                    continue;
                return p;
            }
        }
        return undefined;
    }
</script>

<Tool id="create-straight" displayName="Create Straight Segment" {handleMove} {handleClick}>
    <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" stroke-width="2"/>
</Tool>
