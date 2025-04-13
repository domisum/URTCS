<script lang="ts">
    import type {Point} from "../../model";
    import {convertCoordinateToSvg} from "./modelSvg.svelte";

    interface Props {
        point: Point;
    }

    let {point}: Props = $props();
    let svgLocation = $derived(convertCoordinateToSvg(point.location));
</script>


<circle id={point.id} class="trackElement" cx={svgLocation.x} cy={svgLocation.y} r="5"/>


<style>
    circle {
        fill: #ccc;
    }

    circle:hover {
        fill: #ff3e00;
    }
</style>
