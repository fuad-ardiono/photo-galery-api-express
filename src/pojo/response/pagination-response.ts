export interface MetaPagination {
    total: number
    per_page: number
    page: number
}

export class PaginationResponse<T> {
    data: T
    meta: MetaPagination
}
