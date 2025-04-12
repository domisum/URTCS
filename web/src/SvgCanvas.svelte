<script lang="ts">
    import {points, removeTempElement, segments} from "./track.svelte";
    import type {RadialSegment, SvgCursor} from "./datatypes.svelte";
    import {activeTool} from "./lib/tool/toolState.svelte";

    interface Viewport {
        offsetX: number;
        offsetY: number;
        scale: number;
    }

    interface SvgCoordinate {
        x: number;
        y: number;
    }

    let viewport: Viewport = $state({offsetX: 0, offsetY: 0, scale: 1});
    let dragStart: null | SvgCoordinate = null;

    function getSvgLocation(mouseX: number, mouseY: number): SvgCursor {
        let x = mouseX / viewport.scale - viewport.offsetX;
        let y = mouseY / viewport.scale - viewport.offsetY;

        let hoveredElements = document.elementsFromPoint(mouseX, mouseY);
        let hoveredTrackElementIds = [];
        for (let i = 0; i < hoveredElements.length; i++) {
            if (hoveredElements[i].classList.contains("trackElement"))
                hoveredTrackElementIds.push(hoveredElements[i].id);
        }

        return {location: {x, y}, hoveredTrackElementIds};
    }

    function handleMouseMove(event: MouseEvent) {
        if (dragStart !== null) {
            viewport.offsetX += event.movementX / viewport.scale;
            viewport.offsetY += event.movementY / viewport.scale;
            return;
        }

        const itool = activeTool.itool;
        if (itool && itool.handleMove) {
            const svgLocation = getSvgLocation(event.clientX, event.clientY);
            itool.handleMove({svgCursor: svgLocation})
        }
    }

    function handleMouseDown(event: MouseEvent) {
        if (event.button === 0) {
            dragStart = {x: event.clientX, y: event.clientY};
        }
    }

    function handleMouseUp(event: MouseEvent) {
        if (dragStart) {
            const dragEnd = {x: event.clientX, y: event.clientY};
            if (isClick(dragStart, dragEnd)) {
                handleClick(event);
            }
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
        if (itool && itool.handleClick) {
            const svgLocation = getSvgLocation(event.clientX, event.clientY);
            itool.handleClick({svgCursor: svgLocation});
        }
    }

    function handleMouseLeave() {
        removeTempElement(points);
        dragStart = null;
    }

    function handleWheel(event: WheelEvent) {
        event.preventDefault();

        let scaleMultiplier = 1.1;
        if (event.deltaY > 0)
            scaleMultiplier = 1 / scaleMultiplier;

        viewport.offsetX -= event.clientX / viewport.scale * (1 - 1 / scaleMultiplier);
        viewport.offsetY -= event.clientY / viewport.scale * (1 - 1 / scaleMultiplier);
        viewport.scale *= scaleMultiplier;

        handleMouseMove(event);
    }

    function generateRadialSegmentSvgPath(s: any): string {
        const rs = <RadialSegment>s;
        const sweepFlag = rs.turnDirection === "r" ? "1" : "0";
        return `M ${rs.a.location.x} ${rs.a.location.y} A ${(rs.radius)} ${(rs.radius)} 0 0 ${sweepFlag} ${rs.b.location.x} ${rs.b.location.y}`;
    }
</script>

<!-- svelte-ignore <a11y_no_noninteractive_element_interactions> -->
<svg role="application" onmousemove={handleMouseMove} onmouseenter={handleMouseMove} onmouseleave={handleMouseLeave}
     onmousedown={handleMouseDown} onmouseup={handleMouseUp} onwheel={handleWheel}>
    <g transform="scale({viewport.scale}) translate({viewport.offsetX} {viewport.offsetY})">
        {#each segments as s}
            {#if s.type === "straight"}
                <line id={s.id} class="trackElement"
                      x1={s.a.location.x} y1={s.a.location.y} x2={s.b.location.x} y2={s.b.location.y}/>
            {:else if s.type === "radial"}
                <path id={s.id} class="trackElement" d={generateRadialSegmentSvgPath(s)}/>
            {/if}
        {/each}
        {#each points as p}
            <circle id={p.id} class="trackElement" cx={p.location.x} cy={p.location.y} r="5"/>
        {/each}
    </g>
</svg>


<style>
    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1a1a1a;
    }

    svg circle {
        fill: #ccc;
    }

    svg circle:hover {
        fill: #ff3e00;
    }

    svg line {
        stroke: #ccc;
        stroke-width: 2px;
    }

    svg line:hover {
        stroke: #ff3e00;
        stroke-width: 3px;
    }

    svg path {
        stroke: #ccc;
        stroke-width: 2px;
        fill: none;
    }

    svg path:hover {
        stroke: #ff3e00;
        stroke-width: 3px;
    }
</style>
