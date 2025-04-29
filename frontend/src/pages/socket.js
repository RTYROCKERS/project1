import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ [Client] Connected to server, socket.id =", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ [Client] Connection error:", err);
});

export default socket;
