export interface ToolOptionState {
    [index: string]: boolean;
}

export let toolOptionState: ToolOptionState = $state({
    "smooth": true
});

export function getToolOptionState(id: string): boolean {
    const val = toolOptionState[id];
    return val === undefined ? false : val;
}

export function toggleToolOptionState(id: string) {
    toolOptionState[id] = !getToolOptionState(id);
}
