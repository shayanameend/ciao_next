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
		privateChat: (id: string, name: string) => `/private-chat/${id}/${name}`,
		groupChat: (id: string, name: string) => `/group-chat/${id}/${name}`,
	},
};
