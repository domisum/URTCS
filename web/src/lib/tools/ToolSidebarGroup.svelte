<script lang="ts">
    import SidebarGroup from "../SidebarGroup.svelte";
    import CreatePointTool from "./CreatePointTool.svelte";
    import CreateStraightSegmentTool from "./CreateStraightSegmentTool.svelte";
    import Tool from "./Tool.svelte";
    import CreateRadialSegmentTool from "./CreateRadialSegmentTool.svelte";

    let tools = null;

</script>

<SidebarGroup bind:this={tools}>
    <CreatePointTool/>
    <CreateStraightSegmentTool/>
    <CreateRadialSegmentTool/>
</SidebarGroup>
