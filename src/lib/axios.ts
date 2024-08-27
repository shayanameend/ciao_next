import { default as axios } from "axios";
import { cookies } from "next/headers";

axios.interceptors.request.use((config) => {
	const token = cookies().get("token")?.value;
	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}
	return config;
});

axios.interceptors.response.use(
	(response) => {
		if (response.data?.data?.token) {
			cookies().set("token", response.data.data.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 30 * 24 * 60 * 60,
			});
		}
		return response;
	},
	(error) => {
		if (error.response?.data?.data?.token) {
			cookies().set("token", error.response.data.data.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 30 * 24 * 60 * 60,
			});
		}
		return Promise.reject(error);
	},
);

export { axios };
