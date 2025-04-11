<script lang="ts">
    import SidebarGroup from "../SidebarGroup.svelte";
    import CreatePointTool from "./s/CreatePointTool.svelte";
    import CreateStraightSegmentTool from "./s/CreateStraightSegmentTool.svelte";
    import CreateRadialSegmentTool from "./s/CreateRadialSegmentTool.svelte";
    import DeleteTool from "./s/DeleteTool.svelte";
</script>

<SidebarGroup>
    <CreatePointTool/>
    <CreateStraightSegmentTool/>
    <CreateRadialSegmentTool/>
    <DeleteTool/>
</SidebarGroup>
