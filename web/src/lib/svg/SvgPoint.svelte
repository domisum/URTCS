<script lang="ts">
    import type {Point} from "../../model";
    import {convertLocationToCoordinate} from "./modelSvg.svelte";
    import {viewport} from "../renderToggle/renderState.svelte";

    interface Props {
        point: Point;
    }

    let {point}: Props = $props();
    let svgLocation = $derived(convertLocationToCoordinate(point.location));
</script>


<circle id={point.id} class="trackElement" cx={svgLocation.x} cy={svgLocation.y} r={5/viewport.scale}/>


<style>
    circle {
        fill: #ccc;
    }

    circle:hover {
        fill: #ff3e00;
    }
</style>
