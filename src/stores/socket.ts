import { map, onMount } from "nanostores";
import { type Socket, io } from "socket.io-client";
import events from "~/lib/events";

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
	const socket = io("http://localhost:8080", {
		extraHeaders: {
			token: "Bearer " + "",
		},
	});

	socketStore.setKey("instance", socket);

	socket.on(events.socket.connect, () => {
		console.log("connected");

		socketStore.setKey("isConnected", true);
		socketStore.setKey("error", null);
	});

	socket.on(events.socket.connectError, () => {
		console.log("connect_error");

		socketStore.setKey("isConnected", false);
		socketStore.setKey("error", "connect_error");
	});

	socket.on(events.socket.error, (error) => {
		console.log("error", error);

		socketStore.setKey("error", error);
	});

	socket.on(events.socket.disconnect, () => {
		console.log("disconnected");

		socketStore.setKey("isConnected", false);
	});
});
