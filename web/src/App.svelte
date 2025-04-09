<script lang="ts">
    import Sidebar from './lib/Sidebar.svelte'
    import {points, removeTempElements, segments} from "./track.svelte";
    import type {SvgMouseLocation} from "./datatypes";
    import {activeTool} from "./lib/tools/toolState.svelte";

    interface Viewport {
        offsetX: number;
        offsetY: number;
        scale: number;
    }

    interface SvgCoordinate {
        x: number;
        y: number;
    }

    let isMouseNearSidebar = $state(false);
    let viewport: Viewport = $state({offsetX: 0, offsetY: 0, scale: 1});
    let svgElement: SVGElement;
    let dragStart: null | SvgCoordinate = null;

    function getSvgLocation(mouseX: number, mouseY: number): SvgMouseLocation {
        const rect = svgElement.getBoundingClientRect();
        let x = (mouseX - rect.left - viewport.offsetX) / viewport.scale;
        let y = (mouseY - rect.top - viewport.offsetY) / viewport.scale;
        return {location: {x, y}};
    }

    function handleMouseMove(event: MouseEvent) {
        isMouseNearSidebar = event.clientX < window.innerWidth / 4;

        if (dragStart !== null) {
            viewport.offsetX += event.movementX;
            viewport.offsetY += event.movementY;
            return;
        }

        const itool = activeTool.itool;
        if (itool) {
            const svgLocation = getSvgLocation(event.clientX, event.clientY);
            itool.handleMove({svgLocation})
        }
    }

    function handleMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            dragStart = {x: event.clientX, y: event.clientY};
        }
    }

    function handleMouseUp(event: MouseEvent) {
        const dragEnd = {x: event.clientX, y: event.clientY};
        if (isClick(<SvgCoordinate>dragStart, dragEnd)) {
            handleClick(event);
        }
        dragStart = null;
    }

    function isClick(dragStart: SvgCoordinate, dragEnd: SvgCoordinate): boolean {
        const threshold = window.screen.width / 400;
        let dx = Math.abs(dragEnd.x - dragStart.x);
        let dy = Math.abs(dragEnd.y - dragStart.y);
        return dx + dy <= threshold;
    }

    function handleClick(event: MouseEvent) {
        const itool = activeTool.itool;
        if (itool) {
            const svgLocation = getSvgLocation(event.clientX, event.clientY);
            itool.handleClick({svgLocation})
        }
    }

    function handleMouseLeave(event: MouseEvent) {
        removeTempElements();
    }

    function handleWheel(event: WheelEvent) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 0.9 : 1.1;
        viewport.scale *= delta;
        handleMouseMove(event)
    }
</script>

<main>
    <!-- svelte-ignore <a11y_no_noninteractive_element_interactions> -->
    <svg role="application" bind:this={svgElement}
         onmousemove={handleMouseMove} onmouseenter={handleMouseMove} onmouseleave={handleMouseLeave}
         onmousedown={handleMouseDown} onmouseup={handleMouseUp} onwheel={handleWheel}>
        <g transform="translate({viewport.offsetX} {viewport.offsetY}) scale({viewport.scale})">
            {#each points as p}
                <circle cx={p.location.x} cy={p.location.y} r="5" fill='#ff3e00'/>
            {/each}
            {#each segments as s}
                {#if s.type === "straight"}
                    <line x1={s.a.location.x} y1={s.a.location.y} x2={s.b.location.x} y2={s.b.location.y}
                          stroke="#ff3e00" stroke-width="2"/>
                {/if}
            {/each}
        </g>
    </svg>

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

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a;
    }
</style>
