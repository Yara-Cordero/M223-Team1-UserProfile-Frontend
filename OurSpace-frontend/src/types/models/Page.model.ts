export type Page<T> = {
    content: T[]
    totalPages: number;
    totalElements: number,
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    size: number,
    number: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    numberOfElements: number,
    first: boolean,
    last: boolean,
    empty: boolean

}