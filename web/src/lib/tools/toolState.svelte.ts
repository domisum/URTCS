import type {SvgMouseLocation} from "../../datatypes";

export interface ToolMove {
    svgLocation: SvgMouseLocation;
}

export interface ToolClick {
    svgLocation: SvgMouseLocation;
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
