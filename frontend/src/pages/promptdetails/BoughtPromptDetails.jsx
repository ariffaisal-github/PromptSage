import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useParams, useNavigate } from "react-router-dom";

function BoughtPromptDetails() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState(null);
  const [uploadedBy, setUploadedBy] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromptDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/prompts/${id}`
        );
        const { prompt } = response.data;
        setPrompt(prompt);
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };
    fetchPromptDetails();
  }, [id]);

  useEffect(() => {
    const fetchUploaderDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/${prompt.uploadedBy}`
        );
        setUploadedBy(response.data.data);
      } catch (error) {
        console.error("Error fetching uploader details:", error);
      }
    };
    if (prompt && prompt.uploadedBy) {
      fetchUploaderDetails();
    }
  }, [prompt]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt);
  };

  const navigateToEngineerProfile = () => {
    navigate(`/engineer-profile/${uploadedBy._id}`);
  };

  if (!prompt) {
    return (
      <div className="bg-slate-900 h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-8 mt-5 px-8 lg:ml-20 xl:ml-32">
        <div className="lg:w-9/12">
          <div className="relative mb-6">
            <img
              src={prompt.cover_image.url}
              alt={prompt.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              style={{
                filter: "drop-shadow(0px 10px 100px rgba(0, 0, 0, 0.5))",
              }}
            />
            <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-30 rounded-b-lg">
              <h2 className="text-white text-lg font-semibold mb-1">
                {prompt.title}
              </h2>
            </div>
          </div>
          <div className="max-w-full bg-slate-900 p-2 rounded-lg shadow-lg mb-4">
            <p className="text-white mb-4">{prompt.description}</p>
          </div>
          <div className="max-w-full bg-slate-900 p-2 rounded-lg shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Prompt Content:
            </h3>
            <div className="text-gray-300">{prompt.prompt}</div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleCopyPrompt}
              className="flex items-center justify-center p-0.5 mt-2 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-amber-500 to-rose-600 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-slate-800 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Copy Prompt
              </span>
            </button>
          </div>
          <div className="max-w-full bg-slate-900 p-2 rounded-lg shadow-lg mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tips:</h3>
            <ul className="text-gray-300">{prompt.tipsToUse}</ul>
          </div>
        </div>
        <div className="lg:w-3/12 mb-64 mr-24 lg:ml-0">
          <h2 className="text-white text-lg font-semibold mb-2">
            Engineer: {uploadedBy.username}
          </h2>
          <div className="relative mb-6">
            <div
              style={{
                backgroundImage:
                  "url(https://img.freepik.com/free-photo/white-notebook-black-data-firewall_1150-1733.jpg?w=900&t=st=1706515656~exp=1706516256~hmac=cf8699dfe1843ed04a53830e9d1b6b11d37451a03bf65a21b476391beeb92a9d)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 relative"
              onClick={() => navigateToEngineerProfile()}
            >
              <div className="absolute p-6 bottom-0 left-0 w-full  bg-black bg-opacity-50 rounded-b-lg">
                <h2 className="text-white text-lg font-semibold mb-2">
                  {uploadedBy.email}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoughtPromptDetails;
