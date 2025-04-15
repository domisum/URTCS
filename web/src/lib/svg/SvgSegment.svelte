<script lang="ts">
    import type {RadialSegment, Segment} from "../../model";
    import {convertLocationToCoordinate} from "./modelSvg.svelte";

    interface Props {
        segment: Segment;
    }

    let {segment}: Props = $props();
    let aLoc = $derived(convertLocationToCoordinate(segment.a.location));
    let bLoc = $derived(convertLocationToCoordinate(segment.b.location));

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
        stroke-width: 1px;
        vector-effect: non-scaling-stroke;
    }

    line:hover {
        stroke: #ff3e00;
        stroke-width: 3px;
    }

    path {
        stroke: #ccc;
        stroke-width: 1px;
        fill: none;
        vector-effect: non-scaling-stroke;
    }

    path:hover {
        stroke: #ff3e00;
        stroke-width: 3px;
    }
</style>
