<script lang="ts">
    import SidebarGroup from "../SidebarGroup.svelte";
    import CreatePointTool from "./CreatePointTool.svelte";
    import CreateStraightSegmentTool from "./CreateStraightSegmentTool.svelte";
    import CreateRadialSegmentTool from "./CreateRadialSegmentTool.svelte";
    import DeleteTool from "./DeleteTool.svelte";
</script>

<SidebarGroup>
    <CreatePointTool/>
    <CreateStraightSegmentTool/>
    <CreateRadialSegmentTool/>
    <DeleteTool/>
</SidebarGroup>
