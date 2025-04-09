<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick, ToolMove} from "./toolState.svelte";

    function handleMove(move: ToolMove) {
    }

    function handleClick(click: ToolClick) {
    }
</script>

<Tool id="create-straight" displayName="Create Straight Segment" {handleMove} {handleClick}>
    <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" stroke-width="2"/>
</Tool>
