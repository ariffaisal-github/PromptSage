import { useAuth } from "../../AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-700" : "";
  const formattedTime = extractTime(message.createdAt);
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://avatar.iran.liara.run/public/boy" alt="avatar" />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>

      {/* <div className="chat chat-start max-w-[600px]">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://avatar.iran.liara.run/public/boy" alt="avatar" />
          </div>
        </div>
        <div className="chat-bubble text-white bg-blue-700">
          Yes, Sure. Please pay me 100$ for each custom prompt. I will do it for
          you. I am a professional prompt engineer.
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          12:42
        </div>
      </div> */}
    </>
  );
};

export default Message;
