import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const socket = io("https://e-commerce-project-server-demz.onrender.com");

const AdminChat = () => {
  const [liveMessages, setLiveMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [input, setInput] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: messages = [], refetch } = useQuery({
    queryKey: ["messages", currentUser],
    enabled: !!currentUser,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/messages/${currentUser}`);
      return res.data;
    },
  });

  useEffect(() => {
    socket.emit("joinAdminRoom");

    socket.on("userMessage", ({ userId, message }) => {
      alert(`new message from ${userId}: ${message}`);
      if (!currentUser && messages.length > 0) {
        setCurrentUser(messages[0]?.userId);
      } else {
        setCurrentUser(userId);
      }
      setLiveMessages(prev => [...prev, { sender: "user", message }]);
      refetch();
    });
    return () => {
      socket.off("userMessage");
    };
  }, [currentUser, messages, refetch]);

  const handleSendMessage = () => {
    if (currentUser && input.trim() !== "") {
      socket.emit("adminMessage", { userId: currentUser, message: input });
      setLiveMessages(prev => [...prev, { sender: "admin", message: input }]);
      setInput("");
    }
  };

  const messageHistory = [...messages, ...liveMessages];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Live Chat</h2>

      <p>Chatting with {currentUser || "No user selected"}</p>
      {messageHistory.map((msg, index) => (
        <p key={index}>
          <strong>{msg.sender}:</strong> {msg.message}
        </p>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)}></input>
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default AdminChat;
