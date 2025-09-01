import type { QueryKey } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

declare global {
	type ApiResponse<T> = AxiosResponse<T>;
	// type QueryOpts<T> = Omit<UseQueryOptions<AxiosResponse<T>, Error>, "queryKey" | "queryFn">;
	// type MutationOpts<TData, TVariables> = UseMutationOptions<TData, Error, TVariables>;
	type QueryKeyType = QueryKey;
}

export {};
