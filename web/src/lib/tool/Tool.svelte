<script lang="ts">
    import {activeTool, type ITool, toggleTool} from './toolState.svelte'

    interface Props extends ITool {
        displayName: string
        children: any
    }

    let {id, displayName, activate, deactivate, handleMove, handleClick, children}: Props = $props();

    function onclick(event: MouseEvent) {
        if (event.button !== 0)
            return;
        toggleTool({id, activate, deactivate, handleMove, handleClick});
    }
</script>

<button title={displayName} aria-label={displayName}
        class:active={activeTool.itool !== null && activeTool.itool.id === id} {onclick}>
    <svg viewBox="0 0 24 24" width="24" height="24">
        {@render children()}
    </svg>
</button>

<style>
    button {
        width: 40px;
        height: 40px;
        padding: 8px;
        background-color: #3a3a3a;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background-color: #4a4a4a;
        transform: scale(1.05);
    }

    button.active {
        background-color: #ff3e00;
        transform: scale(1.1);
    }

    button svg {
        width: 24px;
        height: 24px;
        background: none;
    }
</style>
