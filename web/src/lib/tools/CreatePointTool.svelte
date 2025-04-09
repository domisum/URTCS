<script lang="ts">
    import Tool from "./Tool.svelte";
    import type {ToolClick, ToolMove} from "./toolState.svelte";

    function handleMove(move: ToolMove) {
    }

    function handleClick(click: ToolClick) {
    }
</script>

<Tool id="create-point" displayName="Create Point" {handleMove} {handleClick}>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
</Tool>
