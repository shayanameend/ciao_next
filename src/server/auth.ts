"use server";

import { axios } from "~/lib/axios";
import { env } from "~/lib/env";
import type {
	CreateProfileBodyType,
	LoginUserBodyType,
	RegisterUserBodyType,
	VerifyOTPBodyType,
} from "~/validators/auth.validators";

export async function signUp({
	email,
	password,
	role,
	deviceType,
	deviceToken,
}: RegisterUserBodyType) {
	try {
		const response = await axios.post(
			`${env.NEXT_PUBLIC_API_URL}/app/register`,
			{
				email,
				password,
				role,
				deviceType,
				deviceToken,
			},
		);

		return response.data;
	} catch (error) {
		console.error(error);

		if (axios.isAxiosError(error)) {
			return (
				error.response?.data || {
					meta: {
						message: "An error occurred during sign up",
						status: error.response?.status,
					},
				}
			);
		}

		return {
			meta: {
				message: "An unexpected error occurred",
				status: 500,
			},
		};
	}
}

export async function verifyOtp({
	otpCode,
	verificationType,
}: VerifyOTPBodyType) {
	try {
		const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/app/verify`, {
			otpCode,
			verificationType,
		});

		return response.data;
	} catch (error) {
		console.error(error);

		if (axios.isAxiosError(error)) {
			return (
				error.response?.data || {
					meta: {
						message: "An error occurred during OTP verification",
						status: error.response?.status,
					},
				}
			);
		}

		return {
			meta: {
				message: "An unexpected error occurred",
				status: 500,
			},
		};
	}
}

export async function createProfile({ fullName, dob }: CreateProfileBodyType) {
	try {
		const response = await axios.post(
			`${env.NEXT_PUBLIC_API_URL}/app/create-profile`,
			{
				fullName,
				dob,
			},
		);

		return response.data;
	} catch (error) {
		console.error(error);

		if (axios.isAxiosError(error)) {
			return (
				error.response?.data || {
					meta: {
						message: "An error occurred during profile creation",
						status: error.response?.status,
					},
				}
			);
		}

		return {
			meta: {
				message: "An unexpected error occurred",
				status: 500,
			},
		};
	}
}

export async function signIn({
	email,
	password,
	deviceType,
	deviceToken,
}: LoginUserBodyType) {
	try {
		const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/app/login`, {
			email,
			password,
			deviceType,
			deviceToken,
		});

		return response.data;
	} catch (error) {
		console.error(error);

		if (axios.isAxiosError(error)) {
			return (
				error.response?.data || {
					meta: {
						message: "An error occurred during sign in",
						status: error.response?.status,
					},
				}
			);
		}

		return {
			meta: {
				message: "An unexpected error occurred",
				status: 500,
			},
		};
	}
}
