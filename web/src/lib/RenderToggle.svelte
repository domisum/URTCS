<script lang="ts">
    import {getRenderState, toggleRenderState} from "./renderState.svelte";

    interface Props {
        id: string;
        displayName: string;
        children: any;
    }

    let {id, displayName, children}: Props = $props();

    function onclick(event: MouseEvent) {
        if (event.button !== 0)
            return;
        toggleRenderState(id);
    }
</script>


<button title={displayName} aria-label={displayName} class:active={!getRenderState(id)} {onclick}>
    <svg viewBox="0 0 24 24" width="24" height="24">
        {@render children()}
    </svg>
</button>


<style>
    button {
        width: 40px;
        height: 40px;
        padding: 8px;
        border: none;
        aspect-ratio: 1;
        --o: calc(50% * tan(-22.5deg));
        clip-path: polygon(
                var(--o) 50%,
                50% var(--o),
                calc(100% - var(--o)) 50%,
                50% calc(100% - var(--o))
        );
        transform: scale(0.95);

        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #444;
        color: white;
    }

    button:hover {
        background-color: #4a4a4a;
        transform: scale(1.1) !important;
    }

    button.active {
        background-color: #888;
        transform: scale(1);
    }

    button svg {
        width: 24px;
        height: 24px;
        background: none;
    }
</style>
