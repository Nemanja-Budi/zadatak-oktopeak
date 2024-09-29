export type PaginationType = {
    [key: string]: string | number;
    limit: number;
    skip: number;
}

export function getDefaultPagination(): PaginationType {
    return {
        limit: 12,
        skip: 0
    };
}