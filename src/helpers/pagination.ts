export interface IPagination<T> {
    totalItems: number; // tong so ban ghi
    currentPage: number; // trang hien tai
    pageSize: number;
    totalPages: number;
    items: T[];
}