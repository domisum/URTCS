<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick, ToolMove} from "./toolState.svelte";

    function handleMove(move: ToolMove) {
    }

    function handleClick(click: ToolClick) {
    }
</script>

<Tool id="create-radial" displayName="Create Radial Segment" {handleMove} {handleClick}>
    <path d="M2 2 A20 20 0 0 1 22 22" stroke="currentColor" stroke-width="2" fill="none"/>
</Tool>
