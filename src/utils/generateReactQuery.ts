import type {
	UseQueryOptions,
	UseMutationOptions,
	QueryKey,
	QueryFunction,
} from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

// 타입 정의 추가
type QueryOpts<TData, TError = AxiosError> = Omit<
	UseQueryOptions<AxiosResponse<TData>, TError, AxiosResponse<TData>, QueryKey>,
	"queryKey" | "queryFn"
>;

type MutationOpts<TData, TVariables, TError = AxiosError> = UseMutationOptions<
	AxiosResponse<TData>,
	TError,
	TVariables
>;

function useCreateQuery<TData, TError = AxiosError>(
	queryKey: QueryKey,
	queryFn: QueryFunction<AxiosResponse<TData>, QueryKey>,
	options?: QueryOpts<TData, TError>,
) {
	return useQuery<AxiosResponse<TData>, TError, AxiosResponse<TData>, QueryKey>({
		queryKey,
		queryFn,
		...options,
	});
}

function useCreateMutation<TData, TVariables, TError = AxiosError>(
	mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>,
	options?: MutationOpts<TData, TVariables, TError>,
) {
	return useMutation<AxiosResponse<TData>, TError, TVariables>({
		mutationFn,
		...options,
	});
}

export { useCreateQuery, useCreateMutation };

export type { QueryOpts, MutationOpts };
