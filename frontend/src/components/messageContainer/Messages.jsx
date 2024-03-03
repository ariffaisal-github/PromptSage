import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("message are -",messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

      {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center mt-3 text-lg">
          Send a message to start conversation.
        </p>
      )}
    </div>
  );
};
export default Messages;
