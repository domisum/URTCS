<script lang="ts">
    import Sidebar from './lib/Sidebar.svelte'
    import {deactivateTool} from "./lib/tool/toolState.svelte";
    import SvgCanvas from "./SvgCanvas.svelte";

    let isMouseNearSidebar = $state(false);

    function onmousemove(event: MouseEvent) {
        isMouseNearSidebar = event.clientX < window.innerWidth / 4;
    }

    function onkeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            deactivateTool();
        }
    }

</script>

<!-- svelte-ignore <a11y_no_noninteractive_element_interactions> -->
<main {onmousemove} {onkeydown}>
    <SvgCanvas/>
    <Sidebar isMouseNear={isMouseNearSidebar}/>
</main>

<style>
    :global(body) {
        margin: 0;
        background-color: #1a1a1a;
        color: #ffffff;
        overflow: hidden;
    }

    :global(*::-webkit-scrollbar) {
        display: none;
    }

    :global(*) {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
    }
</style>
