<script lang="ts">
    import type {RadialSegment, Segment} from "../../model";
    import {convertCoordinateToSvg} from "./modelSvg.svelte";

    interface Props {
        segment: Segment;
    }

    let {segment}: Props = $props();
    let aLoc = $derived(convertCoordinateToSvg(segment.a.location));
    let bLoc = $derived(convertCoordinateToSvg(segment.b.location));

    function generateRadialSegmentSvgPath(): string {
        const rs = <RadialSegment>segment;
        const sweepFlag = rs.turnDirection === "r" ? "1" : "0";
        return `M ${aLoc.x} ${aLoc.y} A ${(rs.radius)} ${(rs.radius)} 0 0 ${sweepFlag} ${bLoc.x} ${bLoc.y}`;
    }
</script>


{#if segment.type === "straight"}
    <line id={segment.id} class="trackElement" x1={aLoc.x} y1={aLoc.y} x2={bLoc.x} y2={bLoc.y}/>
{:else if segment.type === "radial"}
    <path id={segment.id} class="trackElement" d={generateRadialSegmentSvgPath()}/>
{/if}


<style>
    line {
        stroke: #ccc;
        stroke-width: 2px;
    }

    line:hover {
        stroke: #ff3e00;
        stroke-width: 3px;
    }

    path {
        stroke: #ccc;
        stroke-width: 2px;
        fill: none;
    }

    path:hover {
        stroke: #ff3e00;
        stroke-width: 3px;
    }
</style>
