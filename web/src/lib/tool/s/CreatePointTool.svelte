<script lang="ts">
    import Tool from "../Tool.svelte";
    import type {ToolClick, ToolMove} from "../toolState.svelte.js";
    import {createPoint, points, setTempElement} from "../../../track.svelte.js";

    import type {Point} from "../../../model";

    function handleMove(move: ToolMove) {
        setTempElement(points, {location: move.svgCursor.location} as Point);
    }

    function handleClick(click: ToolClick) {
        createPoint(click.svgCursor.location);
    }
</script>

<Tool id="create-point" displayName="Create Point" {handleMove} {handleClick}>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
</Tool>
