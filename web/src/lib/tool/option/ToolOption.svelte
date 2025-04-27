<script lang="ts">
    import {getToolOptionState, toggleToolOptionState} from "./toolOptionState.svelte";
    import SidebarButton from "../../SidebarButton.svelte";

    interface Props {
        id: string;
        displayName: string;
        children: any;
    }

    let {id, displayName, children}: Props = $props();

    const active = (): boolean => getToolOptionState(id);
    const onclick = () => toggleToolOptionState(id);
</script>

<div class="toolOption">
    <SidebarButton {displayName} {active} {onclick}>
        {@render children()}
    </SidebarButton>
</div>

<style>
    .toolOption > :global(button) {
        border-radius: 20px;
    }
</style>
