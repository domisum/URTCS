<script lang="ts">
    import {getRenderState, toggleRenderState} from "./renderState.svelte.js";
    import SidebarButton from "../SidebarButton.svelte";

    interface Props {
        id: string;
        displayName: string;
        children: any;
    }

    let {id, displayName, children}: Props = $props();

    const active = (): boolean => !getRenderState(id);
    const onclick = () => toggleRenderState(id);
</script>

<div class="renderToggle">
    <SidebarButton {displayName} {active} {onclick}>
        {@render children()}
    </SidebarButton>
</div>

<style>
    .renderToggle > :global(button) {
        aspect-ratio: 1;
        --o: calc(50% * tan(-22.5deg));
        clip-path: polygon(var(--o) 50%, 50% var(--o), calc(100% - var(--o)) 50%, 50% calc(100% - var(--o)));
        transform: scale(0.95);
    }
</style>
