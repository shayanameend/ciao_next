"use server";

import axios from "~/lib/axios";
import { env } from "~/lib/env";
import type {
	LoginUserBodyType,
	RegisterUserBodyType,
	VerifyOTPBodyType,
} from "~/validators/auth.validators";

export async function requestSignUp({
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
		if (axios.isAxiosError(error)) {
			return (
				error.response?.data || { error: "An error occurred during sign up" }
			);
		}
		return { error: "An unexpected error occurred" };
	}
}

export async function requestVerifyOtp({
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

export async function requestSignIn({
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
