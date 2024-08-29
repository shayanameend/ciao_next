export const routes = {
	auth: {
		signUp: "/sign-up",
		verification: "/verification",
		forgetPasswordRequest: "/forget-password-request",
		resetPassword: "/reset-password",
		createProfile: "/create-profile",
		signIn: "/sign-in",
		logout: "/logout",
		changePassword: "/change-password",
	},
	chats: {
		recentChats: "/recent-chats",
		privateChat: (id: string) => `/private-chat/${id}`,
		groupChat: (id: string) => `/group-chat/${id}`,
	},
};
