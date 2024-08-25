import { default as axios } from "axios";

import { authStore } from "~/stores/auth";

axios.interceptors.request.use(
	(config) => {
		const token = authStore.get().token;

		if (token) {
			config.headers.authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(response) => {
		if (response.data?.data?.token) {
			authStore.set({ token: response.data.data.token });
		}
		return response;
	},
	(error) => {
		if (error.response?.data?.data?.token) {
			authStore.set({ token: error.response.data.data.token });
		}
		return Promise.reject(error);
	},
);

export { axios };
