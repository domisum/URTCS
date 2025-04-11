import type {SvgCursor} from "../../datatypes.svelte";

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
    handleMove?: (move: ToolMove) => void
    handleClick?: (click: ToolClick) => void
}

export interface ActiveTool {
    itool: ITool | null;
}

export let activeTool: ActiveTool = $state({itool: null});
