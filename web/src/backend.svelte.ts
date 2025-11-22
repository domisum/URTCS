export interface BackendTask {
    path: string;
    requestInit?: RequestInit;
    handleSuccess?: (response: Response) => void;
    handleFail?: (reason: any) => void;
}

let taskQueue: BackendTask[] = $state([]);

export function enqueueTask(task: BackendTask) {
    taskQueue.push(task);
}
