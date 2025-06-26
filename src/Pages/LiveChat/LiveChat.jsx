import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { io } from "socket.io-client";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const socket = io("https://e-commerce-project-server-demz.onrender.com");

const LiveChat = () => {
  const { user } = useAuth();
  console.log(user, "in the livechat");
  const [liveMessage, setLiveMessage] = useState([]);
  const [input, setInput] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/messages/${user.email}`);
      //console.log(res);
      return res.data;
    },
  });

  useEffect(() => {
    if (!user?.email) return;
    socket.emit("joinRoom", { userId: user.email });

    socket.on("adminMessage", msg => {
      setLiveMessage(prev => [...prev, { sender: "admin", message: msg }]);
    });

    return () => {
      socket.off("adminMessage");
    };
  }, [user.email, axiosSecure]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("userMessage", { userId: user.email, message: input });
      setLiveMessage(prev => [...prev, { sender: "user", message: input }]);
      setInput("");
    }
  };

  const messageHistory = [...messages, ...liveMessage];
  if (!user || !user.email) {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="chat-box">
      <div className="bg-gray-400 p-2 h-60 overflow-y-scroll">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          messageHistory.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}</strong>
              {msg.message}
            </p>
          ))
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type message..."
        className="border p-1"
      ></input>
      <button onClick={sendMessage} className="bg-blue-500 text-white p-1">
        Send
      </button>
    </div>
  );
};

export default LiveChat;
