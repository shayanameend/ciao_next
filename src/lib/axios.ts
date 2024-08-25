import axios from "axios";
import { authStore } from "~/stores/auth";

axios.interceptors.request.use((config) => {
	const token = authStore.get().token;

	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}

	return config;
});

axios.interceptors.response.use((response) => {
	if (response.data?.data?.token) {
		authStore.set({ token: response.data.data.token });
	}

	return response;
});

export default axios;
