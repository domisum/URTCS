<script lang="ts">
    import ToolSidebarGroup from "./tools/ToolSidebarGroup.svelte";
    import RenderToggleSidebarGroup from "./RenderToggleSidebarGroup.svelte";
    import {activeTool} from "./tools/toolState.svelte";

    let {isMouseNear} = $props();
</script>

<div class="sidebar-strip" class:visible={isMouseNear || activeTool.itool !== null}>
    <div class="sidebar">
        <ToolSidebarGroup/>
        <RenderToggleSidebarGroup/>
    </div>
</div>

<style>
    .sidebar-strip {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 10;
    }

    .sidebar-strip.visible {
        transform: translateX(0);
    }

    .sidebar {
        position: relative;
        left: 0;
        top: 50%;
        background-color: #2a2a2a;
        opacity: 0.8;
        padding: 10px;
        transform: translateY(-50%);

        display: flex;
        flex-direction: column;
        gap: 30px;
    }
</style>
