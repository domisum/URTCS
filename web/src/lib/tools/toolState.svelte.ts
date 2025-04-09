import type {SvgMouseLocation} from "../../datatypes";

export interface ToolMove {
    svgMouseLocation: SvgMouseLocation;
}

export interface ToolClick {
    svgMouseLocation: SvgMouseLocation;
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
