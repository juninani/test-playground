type Nullable<T> = T | null;

interface DefaultResponse<T> {
	data: T;
	message: string;
	success: boolean;
}

interface DefaultResponseList<T> {
	list: T[];
	total: number;
}
interface DefaultSearchParams {
	query?: string;
	size?: number;
	page?: number;
}

export type { Nullable, DefaultResponse, DefaultResponseList, DefaultSearchParams };
