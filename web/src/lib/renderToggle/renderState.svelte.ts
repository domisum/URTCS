export interface RenderState {
    [index: string]: boolean;
}

export let renderState: RenderState = $state({
    "points": true
});

export function getRenderState(id: string): boolean {
    const val = renderState[id];
    return val === undefined ? false : val;
}

export function toggleRenderState(id: string) {
    renderState[id] = !getRenderState(id);
}
