<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick, ToolMove} from "./toolState.svelte";
    import {createPoint, setTempPoint} from "../../track.svelte";

    function handleMove(move: ToolMove) {
        setTempPoint(0, move.svgCursor.location);
    }

    function handleClick(click: ToolClick) {
        createPoint(click.svgCursor.location);
    }
</script>

<Tool id="create-point" displayName="Create Point" {handleMove} {handleClick}>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
</Tool>
