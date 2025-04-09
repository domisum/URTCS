import type {SvgLocation} from "../../datatypes";

export interface ToolMove {
    svgLocation: SvgLocation;
}

export interface ToolClick {
    svgLocation: SvgLocation;
}

export interface ITool {
    id: string;
    handleMove: (move: ToolMove) => void
    handleClick: (click: ToolClick) => void
}

export interface ActiveTool {
    itool: ITool | null;
}

export let activeTool: ActiveTool = $state({itool: null});