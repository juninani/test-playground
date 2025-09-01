// 프로젝트에 적용하고 나면 삭제해도 됨
interface RequestGetSampleList {
	p1: number;
}

interface ResponseGetSampleList {
	total: number;
	list: SampleInfo[];
}

interface SampleInfo {
	info1: number;
}

interface ResponseGetSample extends SampleDetail {}

interface SampleDetail {
	detail1: number;
}

interface RequestCreateSample {
	c1: number;
	c2: string;
}

interface ResponseCreateSample {}

interface RequestUpdateSample {
	id: number;
	c1: number;
	c2: string;
}

interface ResponseUpdateSample {}

interface ResponseDeleteSample {}

export type {
	RequestGetSampleList,
	ResponseGetSampleList,
	SampleInfo,
	ResponseGetSample,
	SampleDetail,
	RequestCreateSample,
	ResponseCreateSample,
	RequestUpdateSample,
	ResponseUpdateSample,
	ResponseDeleteSample,
};
