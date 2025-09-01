import {
	useCreateMutation,
	useCreateQuery,
	type QueryOpts,
	type MutationOpts,
} from "@utils/generateReactQuery";

import type {
	RequestCreateSample,
	RequestGetSampleList,
	RequestUpdateSample,
	ResponseCreateSample,
	ResponseDeleteSample,
	ResponseGetSample,
	ResponseGetSampleList,
	ResponseUpdateSample,
} from "@schemas/sample";

import instance from "@utils/axiosInstance";

const API = {
	getList: async (params: RequestGetSampleList) =>
		await instance.get<ResponseGetSampleList>("/sample/list", { params }),
	getInfo: async (id: number) => await instance.get<ResponseGetSample>(`/sample/${id}`),
	createSample: async (body: RequestCreateSample) =>
		await instance.post<ResponseCreateSample>("/sample", body),
	updateSample: async (p: { id: number; body: RequestUpdateSample }) =>
		await instance.put<ResponseUpdateSample>(`/sample/${p.id}`, p.body),
	deleteSample: async (id: number) =>
		await instance.delete<ResponseDeleteSample>(`/sample/${id}`),
};

const KEY = {
	getList: (payload: RequestGetSampleList) => ["/sample/list", payload],
	getInfo: (lineId: number) => ["/sample", lineId],
};

export function useGetSampleList(
	params: RequestGetSampleList,
	options?: QueryOpts<ResponseGetSampleList>,
) {
	return useCreateQuery<ResponseGetSampleList>(KEY.getList(params), () => API.getList(params), {
		enabled: false,
		...options,
	});
}

export function useGetInfo(id: number, options?: QueryOpts<ResponseGetSample>) {
	return useCreateQuery<ResponseGetSample>(KEY.getInfo(id), () => API.getInfo(id), {
		enabled: id > 0,
		...options,
	});
}

export function useCreateSample(options?: MutationOpts<ResponseCreateSample, RequestCreateSample>) {
	return useCreateMutation<ResponseCreateSample, RequestCreateSample>(API.createSample, options);
}

export function useUpdateSample(
	options?: MutationOpts<ResponseUpdateSample, { id: number; body: RequestUpdateSample }>,
) {
	return useCreateMutation<ResponseUpdateSample, { id: number; body: RequestUpdateSample }>(
		API.updateSample,
		options,
	);
}

export function useDeleteSample(options?: MutationOpts<ResponseDeleteSample, number>) {
	return useCreateMutation<ResponseDeleteSample, number>(API.deleteSample, options);
}
