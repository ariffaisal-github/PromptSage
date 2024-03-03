import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/users/chats", {
          withCredentials: true, // Include cookies
        });
        setConversations(res.data.data);
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          toast.error(err.response.data.message);
        } else if (err.request) {
          // The request was made but no response was received
          toast.error("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("Error in sending the request");
        }
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
