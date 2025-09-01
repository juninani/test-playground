import { useLayoutEffect } from "react";

import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import * as qs from "qs";

import { useAuthStore } from "@stores/authStore";

const instance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: {
		serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
	},
});

export function useAxiosInterceptor() {
	const { accessToken, clear } = useAuthStore(["accessToken", "setAuth", "clear"]);
	// const { clear: userClear } = useUserStore(["clear"]);
	// const { openModal } = useModal();

	const handleRequest = (config: InternalAxiosRequestConfig) => {
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		config.headers.ln = "kor";

		return config;
	};

	const handleResponse = (response: AxiosResponse) => {
		return response;
	};

	const handleError = async (error: AxiosError<any>) => {
		if (error.response?.status === 401) {
			const save = localStorage.getItem("save");
			if (save) {
				// const response = await axios.post<IDefaultResponse<ResponsePostLogin>>(
				// 	`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh`,
				// 	{
				// 		refreshToken: save,
				// 	},
				// );
				// if (response.data.data) {
				// 	const { accessToken, refreshToken } = response.data.data;
				// 	setAuth(accessToken, refreshToken);
				// 	window.location.href = PathContants.Home;
				// }
			} else {
				clear();
				// userClear();
				// openModal(AlertModal, {
				// 	key: "ERROR_401",
				// 	message: "접속정보가 만료 되었습니다. 다시 로그인해주세요.",
				// 	onSubmit: () => {
				// 		// window.location.href = PathContants /;
				// 	},
				// });
			}
		} else if (error.response?.status === 500) {
			// openModal(AlertModal, {
			// 	key: "ERROR_500",
			// 	message: `${error.response?.data.code}\n\n${error.response?.data.message}`,
			// });
		} else if (error.response?.status === 403 && error.response?.data.code === "IS_FORBIDDEN") {
			// openModal(AlertModal, {
			// 	key: "ERROR_403",
			// 	message: error.response?.data.message,
			// 	onSubmit: () => {
			// 		clear();
			// 		// userClear();
			// 		// window.location.href = PathContants.Login;
			// 	},
			// });
		}
		return Promise.reject(error);
	};

	// 인터셉터 셋팅
	const setupInterceptors = () => {
		const requestInterceptor = instance.interceptors.request.use(handleRequest, handleError);
		const responseInterceptor = instance.interceptors.response.use(handleResponse, handleError);

		return { requestInterceptor, responseInterceptor };
	};

	// 인터셉터 삭제
	const ejectInterceptors = (request: number, response: number) => {
		instance.interceptors.request.eject(request);
		instance.interceptors.response.eject(response);
	};

	useLayoutEffect(() => {
		const { requestInterceptor, responseInterceptor } = setupInterceptors();

		return () => {
			ejectInterceptors(requestInterceptor, responseInterceptor);
		};
	}, [accessToken]);
}

export function paramsDotSerializer(params: Record<string, any>) {
	return Object.keys(params)
		.map((key) => {
			if (typeof params[key] === "object") {
				return Object.keys(params[key])
					.map((subKey) => `${key}.${subKey}=${params[key][subKey]}`)
					.join("&");
			}
			return `${key}=${params[key]}`;
		})
		.join("&");
}

export default instance;
