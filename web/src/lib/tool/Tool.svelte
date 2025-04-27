<script lang="ts">
    import {activeTool, type ITool, toggleTool} from './toolState.svelte'
    import SidebarButton from "../SidebarButton.svelte";

    interface Props extends ITool {
        displayName: string
        children: any
    }

    let {id, displayName, activate, deactivate, handleMove, handleClick, children}: Props = $props();

    const active = (): boolean => activeTool.itool !== null && activeTool.itool.id === id;
    const onclick = () => toggleTool({id, activate, deactivate, handleMove, handleClick});
</script>

<div class="tool">
    <SidebarButton {displayName} {active} {onclick}>
        {@render children()}
    </SidebarButton>
</div>

<style>
    .tool > :global(button) {
        --bg-color-active: #bb2e00;
        --bg-color-hover: #ff3e00;
    }
</style>
