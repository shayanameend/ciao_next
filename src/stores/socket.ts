import { map, onMount } from "nanostores";
import { type Socket, io } from "socket.io-client";
import { toast } from "~/components/ui/use-toast";
import { default as events } from "~/lib/events";

export const socketStore = map<{
	instance: Socket | null;
	isConnected: boolean;
	error: string | null;
}>({
	instance: null,
	isConnected: false,
	error: null,
});

onMount(socketStore, () => {
	if (typeof window === "undefined" || socketStore.get().isConnected) {
		return;
	}

	const socket = io(
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
		{
			transports: ["websocket"],
			autoConnect: false,
			withCredentials: true,
			// extraHeaders: {
			// 	token: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjRiYmM4LWNhOGItNDMzNS1hZmM1LWVmYjFkNzRkMzQyZiIsImVtYWlsIjoiY2lhbzNAeW9wbWFpbC5jb20iLCJ0b2tlblR5cGUiOiJ2ZXJpZmljYXRpb24iLCJkZXZpY2VUb2tlbiI6InF3ZXJ0eXVpb3AiLCJkZXZpY2VUeXBlIjoid2ViIiwiaWF0IjoxNzI0NzYwMjc0fQ.mmgHwPWUsjaWcTG7E3OEwqOBIVKK63AXta96EyJZIgo"}`,
			// },
		},
	);

	socketStore.setKey("instance", socket);

	socket.on(events.socket.connect, () => {
		console.log("socket connected");

		socketStore.setKey("error", null);
		socketStore.setKey("isConnected", true);

		toast({
			variant: "success",
			title: "Socket Connection",
			description: "Connected",
		});
	});

	socket.on(events.socket.connectError, (error) => {
		console.error(error);

		socketStore.setKey("error", error?.message || "Connection Error");
		socketStore.setKey("isConnected", false);

		toast({
			variant: "error",
			title: "Socket Error",
			description: error?.message || "Connection Error",
		});
	});

	socket.on(events.socket.error, (error) => {
		console.error(error);

		socketStore.setKey("error", error?.message || "Unknown Error");

		toast({
			variant: "error",
			title: "Socket Error",
			description: error?.message || "Unknown Error",
		});
	});

	socket.on(events.socket.disconnect, () => {
		console.log("socket disconnected");

		socketStore.setKey("error", null);
		socketStore.setKey("isConnected", false);

		toast({
			variant: "error",
			title: "Socket Connection",
			description: "Disconnected",
		});
	});
});
