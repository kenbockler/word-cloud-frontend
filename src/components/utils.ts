// utils.ts

export const getProgressPercentage = (uploadStatus: string | null, progress: number) => {
    switch (uploadStatus) {
        case 'PENDING':
            return 33;
        case 'PROCESSING':
            return 66;
        case 'COMPLETED':
            return 100;
        case 'FAILED':
            return 100;
        default:
            return progress;
    }
};

export const getStatusClassName = (uploadStatus: string | null) => {
    switch (uploadStatus) {
        case 'COMPLETED':
            return 'status-completed';
        case 'PENDING':
            return 'status-pending';
        case 'PROCESSING':
            return 'status-processing';
        case 'FAILED':
            return 'status-failed';
        default:
            return '';
    }
};

export async function fetchStatusUpdates(id: string) {
    const response = await fetch(`http://localhost:8080/api/textfiles/${id}`);
    const data = await response.json();
    return data;
}

export async function fetchWordCounts(id: string) {
    const response = await fetch(`http://localhost:8080/api/textfiles/${id}/wordcounts`);
    const data = await response.json();
    return data;
}
