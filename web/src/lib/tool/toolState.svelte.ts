import type {SvgCursor} from "../svg/modelSvg.svelte.js";
import {removeTempElements} from "../../track.svelte.js";

export interface ToolMove {
    svgCursor: SvgCursor;
}

export interface ToolClick {
    svgCursor: SvgCursor;
}

export interface ITool {
    id: string;
    activate?: () => void;
    deactivate?: () => void;
    handleMove?: (move: ToolMove) => void;
    handleClick?: (click: ToolClick) => void;
}

export interface ActiveTool {
    itool: ITool | null;
}

export let activeTool: ActiveTool = $state({itool: null});

export function toggleTool(itool: ITool) {
    const shouldActivate = !activeTool.itool || activeTool.itool.id !== itool.id;
    if (activeTool.itool)
        deactivateTool();

    if (shouldActivate) {
        activeTool.itool = itool;
        if (activeTool.itool.activate)
            activeTool.itool.activate();
    }
}

export function deactivateTool() {
    if (activeTool.itool && activeTool.itool.deactivate)
        activeTool.itool.deactivate();
    activeTool.itool = null;
    removeTempElements();
}
