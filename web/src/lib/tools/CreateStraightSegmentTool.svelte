<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick, ToolMove} from "./toolState.svelte";
    import type {Point, StraightSegment} from "../../datatypes";
    import {createPoint, createSegment, removeTempElements, segments, setTempPoint} from "../../track.svelte";

    let tempPoint: Point | null = null;
    let a: Point | null = null;

    function handleMove(move: ToolMove) {
        tempPoint = setTempPoint(0, move.svgLocation.location);
    }

    function handleClick(click: ToolClick) {
        if (!a) {
            a = createPoint(click.svgLocation.location);
            segments.push({id: "s-tmp-0", type: "straight", a, b: tempPoint} as StraightSegment)
            return;
        }

        let b = createPoint(click.svgLocation.location);
        createSegment({type: "straight", a: a, b: b} as StraightSegment);

        a = null;
        removeTempElements();
        tempPoint = setTempPoint(0, click.svgLocation.location);
    }
</script>

<Tool id="create-straight" displayName="Create Straight Segment" {handleMove} {handleClick}>
    <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" stroke-width="2"/>
</Tool>
