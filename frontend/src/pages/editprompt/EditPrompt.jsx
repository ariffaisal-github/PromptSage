import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../AuthContext";

function EditPrompt() {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const fetchPromptDetails = async () => {
      try {
        const res = await axios.get(
          `/api/v1/prompts/${id}`
        );
        setPrompt(res.data.prompt);
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };
    fetchPromptDetails();
  }, [id]);

  return (
    <div>
      <Navbar />
      {isLoggedIn && prompt && prompt.uploadedBy === user._id ? (
        <div>
          <h1>Edit Prompt</h1>
        </div>
      ) : (
        <div className="max-h-full max-w-full bg-slate-900 pb-10">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              You are not authorized to edit this prompt
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPrompt;
