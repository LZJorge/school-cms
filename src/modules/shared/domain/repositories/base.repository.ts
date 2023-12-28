export interface BaseRepository<T> {

    /**
     * @description create methods
     */
    create(data: T): Promise<T | null>;

    /**
     * @description find methods
     */
    findOne(id: string): Promise<T | null>;
    findAll(): Promise<T[] | null>;
    findAllBy(param: keyof T, value: unknown): Promise<T[] | null>;

    /**
     * @description update methods
     */
    update(data: Partial<T>): Promise<T | null>;

    /**
     * @description delete methods
     */
    delete(id: string): Promise<{ success: boolean } | null>;
}