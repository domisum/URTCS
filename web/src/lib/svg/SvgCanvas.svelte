<script lang="ts">
    import {points, removeTempElement, segments} from "../../track.svelte.js";
    import {convertCoordinateToLocation, type SvgCoordinate, type SvgCursor} from "./modelSvg.svelte.js";
    import {activeTool} from "../tool/toolState.svelte.js";
    import SvgPoint from "./SvgPoint.svelte";
    import SvgSegment from "./SvgSegment.svelte";
    import {getRenderState, viewport} from "../renderToggle/renderState.svelte.js";

    let dragStart: null | SvgCoordinate = null;

    function getSvgCursor(mouseX: number, mouseY: number): SvgCursor {
        let x = mouseX / viewport.scale - viewport.offsetX;
        let y = mouseY / viewport.scale - viewport.offsetY;

        let hoveredElements = document.elementsFromPoint(mouseX, mouseY);
        let hoveredTrackElementIds = [];
        for (let i = 0; i < hoveredElements.length; i++) {
            if (hoveredElements[i].classList.contains("trackElement"))
                hoveredTrackElementIds.push(hoveredElements[i].id);
        }

        const coordinate = {x, y} as SvgCoordinate;
        const location = convertCoordinateToLocation(coordinate);
        return {coordinate, location, hoveredTrackElementIds};
    }

    function handleMouseMove(event: MouseEvent) {
        if (dragStart !== null) {
            viewport.offsetX += event.movementX / viewport.scale;
            viewport.offsetY += event.movementY / viewport.scale;
            return;
        }

        const itool = activeTool.itool;
        if (itool && itool.handleMove) {
            const svgLocation = getSvgCursor(event.clientX, event.clientY);
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
            const svgLocation = getSvgCursor(event.clientX, event.clientY);
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
</script>


<!-- svelte-ignore <a11y_no_noninteractive_element_interactions> -->
<svg role="application" onmousemove={handleMouseMove} onmouseenter={handleMouseMove} onmouseleave={handleMouseLeave}
     onmousedown={handleMouseDown} onmouseup={handleMouseUp} onwheel={handleWheel}>
    <g transform="scale({viewport.scale}) translate({viewport.offsetX} {viewport.offsetY})">
        {#each segments as segment}
            <SvgSegment {segment}/>
        {/each}
        {#if getRenderState("points")}
            {#each points as point}
                <SvgPoint {point}/>
            {/each}
        {/if}
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
</style>
