<script lang="ts">

    interface Props {
        displayName: string;
        onclick: () => void;
        active: () => boolean;
        children: any;
    }

    let {displayName, onclick, active, children}: Props = $props();

    function onclickProxy(event: MouseEvent) {
        if (event.button === 0)
            onclick();
    }
</script>

<button title={displayName} aria-label={displayName} class:active={active()} onclick={onclickProxy}>
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
        border-radius: 4px;

        background-color: var(--bg-color-inactive, #3a3a3a);
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        transition: all 0.2s;
    }

    button.active {
        background-color: var(--bg-color-active, #888);
        transform: scale(1.05);
    }

    button:hover {
        background-color: var(--bg-color-hover, #aaa) !important;
        transform: scale(1.1);
    }

    button svg {
        width: 24px;
        height: 24px;
        background: none;
    }
</style>
