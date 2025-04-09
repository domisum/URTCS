<script lang="ts">
    import SidebarGroup from "../SidebarGroup.svelte";
    import CreatePointTool from "./CreatePointTool.svelte";
    import CreateStraightSegmentTool from "./CreateStraightSegmentTool.svelte";
    import CreateRadialSegmentTool from "./CreateRadialSegmentTool.svelte";
</script>

<SidebarGroup>
    <CreatePointTool/>
    <CreateStraightSegmentTool/>
    <CreateRadialSegmentTool/>
</SidebarGroup>
