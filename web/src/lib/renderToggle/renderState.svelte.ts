export interface Viewport {
    offsetX: number;
    offsetY: number;
    scale: number;
}

export let viewport: Viewport = $state({offsetX: 0, offsetY: 0, scale: 1 / 100});

export interface RenderState {
    [index: string]: boolean;
}

export let renderState: RenderState = $state({
    "points": false
});

export function getRenderState(id: string): boolean {
    const val = renderState[id];
    return val === undefined ? false : val;
}

export function toggleRenderState(id: string) {
    renderState[id] = !getRenderState(id);
}
