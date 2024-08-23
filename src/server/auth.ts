"use server";

import axios, { type AxiosResponse } from "axios";
import { env } from "~/lib/env";
import type {
	RegisterUserBodyType,
	LoginUserBodyType,
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
				error.response?.data || { error: "An error occurred during sign in" }
			);
		}
		return { error: "An unexpected error occurred" };
	}
}
