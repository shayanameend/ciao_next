export enum TokenType {
	VERIFICATION = "verification",
	FORGET_PASSWORD = "forget-password",
}

export enum OtpType {
	REGISTRATION = "registration",
	FORGET_PASSWORD = "forget-password",
}

export enum OsType {
	ANDROID = "android",
	IOS = "ios",
	LINUX = "linux",
	MACOS = "macos",
	WINDOWS = "windows",
	WEB = "web",
}

export enum Roles {
	ADMIN = "admin",
	USER = "user",
}

export enum ResponseMessages {
	DEVICE_NOT_FOUND = "Device not found",
	FORGET_PASSWORD_REQUESTED_SUCCESSFULLY = "Forget Password requested successfully",
	INVALID_OTP = "Invalid OTP",
	INVALID_PASSWORD = "Invalid password",
	OTP_ALREADY_USED = "OTP already used",
	OTP_EXPIRED = "OTP expired",
	OTP_SENT_SUCCESSFULLY = "OTP sent successfully",
	OTP_VERIFIED_SUCCESSFULLY = "OTP verified successfully",
	PASSWORD_CHANGED_SUCCESSFULLY = "Password changed successfully",
	PASSWORD_RESETED_SUCCESSFULLY = "Password reseted successfully",
	PROFILE_ALREADY_EXISTS = "Profile already exists",
	PROFILE_CREATED_SUCCESSFULLY = "Profile created successfully",
	PROFILE_NOT_FOUND = "Profile not found",
	SOMETHING_WENT_WRONG = "Something went wrong",
	UNAUTHORIZED = "Unauthorized",
	USER_ALREADY_EXISTS = "User already exists",
	USER_ALREADY_VERIFIED = "User already verified",
	USER_LOGGED_IN_SUCCESSFULLY = "User logged in successfully",
	USER_LOGGED_OUT_SUCCESSFULLY = "User logged out successfully",
	USER_NOT_FOUND = "User not found",
	USER_NOT_VERIFIED = "User not verified",
	USER_REGISTERED_SUCCESSFULLY = "User registered successfully",
	USERS_FETCHED_SUCCESSFULLY = "Users fetched successfully",
}
