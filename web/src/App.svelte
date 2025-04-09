<script lang="ts">
    import Sidebar from './lib/Sidebar.svelte'
    import {points} from "./track.svelte";

    interface Viewport {
        offsetX: number;
        offsetY: number;
        scale: number;
    }

    let isMouseNearSidebar = $state(false);
    let viewport: Viewport = $state({offsetX: 0, offsetY: 0, scale: 1});
    let isDragging = false;

    points.push({id: "temp", location: {x: 200, y: 200}});

    function handleMouseMove(event: MouseEvent) {
        isMouseNearSidebar = event.clientX < window.innerWidth / 4;

        if (isDragging) {
            viewport.offsetX += event.movementX;
            viewport.offsetY += event.movementY;
        }
    }

    function handleMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            isDragging = true;
        }
    }

    function handleMouseUp(event: MouseEvent) {
        isDragging = false;
    }

    function handleWheel(event: WheelEvent) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? 0.9 : 1.1;
        viewport.scale *= delta;
    }
</script>

<main>
    <svg on:mousemove={handleMouseMove} on:mouseenter={handleMouseMove}
         on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:mouseleave={handleMouseUp}
         on:wheel={handleWheel}
         role="application" aria-label="Drawing canvas">
        <g transform="translate({viewport.offsetX} {viewport.offsetY}) scale({viewport.scale})">
            {#each points as p}
                <circle cx={p.location.x} cy={p.location.y} r="5" fill='#ff3e00'/>
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
