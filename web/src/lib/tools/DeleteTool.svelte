<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick} from "./toolState.svelte";
    import {deleteTrackElement} from "../../track.svelte";

    function handleMove() {
    }

    function handleClick(click: ToolClick) {
        const ids = click.svgMouseLocation.hoveredTrackElementIds;
        if (ids.length > 0)
            deleteTrackElement(ids[0]);
    }
</script>

<Tool id="delete" displayName="Delete" {handleMove} {handleClick}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
</Tool>
