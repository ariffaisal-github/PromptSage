import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function EngineerProfile() {
  const [engineer, setEngineer] = useState({});
  const [prompts, setPrompts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEngineerDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/engineer/${id}`
        );
        setEngineer(response.data);

        // Fetch prompts associated with the engineer
        const promptsResponse = await axios.get(
          `/api/v1/prompts/engineer/${id}`
        );
        setPrompts(promptsResponse.data.data);
      } catch (error) {
        console.error("Error fetching engineer details:", error);
      }
    };

    fetchEngineerDetails();
  }, [id]);

  const navigateToPromptDetails = (promptId) => {
    navigate(`/marketplace/${promptId}`);
  };

  const navigateToChats = async () => {
    try{
        const res = await axios.post(`/api/v1/messages/send/${engineer.user}`, {
            message: `Hi ${engineer.username}, I'm interested in your services. Let's chat!`
        }, {
            withCredentials: true
        });
    } catch (error) {
        console.error("Error navigating to chats:", error);
    }
    navigate(`/chats`);
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <div className="flex justify-between p-6">
        <div className="bg-slate-900 rounded-lg border ml-28 p-6 md:p-16 max-w-md w-full text-white">
          <div className="text-center mb-4">
            <img
              src="https://img.freepik.com/free-photo/white-notebook-black-data-firewall_1150-1733.jpg?w=900&t=st=1706515656~exp=1706516256~hmac=cf8699dfe1843ed04a53830e9d1b6b11d37451a03bf65a21b476391beeb92a9d"
              alt="Profile"
              className="rounded-lg mx-auto mb-2"
            />
            <h1 className="text-3xl font-bold">{engineer.username}</h1>
            <p className="text-sm mt-2">Prompt Engineer</p>
          </div>
          <div className="border-b border-gray-700 pb-2 mb-2">
            <h2 className="text-lg font-semibold">Details</h2>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-400">Username</p>
              <p className="text-sm">{engineer.username}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-sm">{engineer.email}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-400">Total Prompts Sold</p>
              <p className="text-sm">{engineer.soldPrompts?.length}</p>
            </div>
          </div>
          {engineer.user !== user._id && (
            <div className="flex justify-around mt-4">
              <button
                onClick={navigateToChats}
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span class="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Send a Message
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full ml-4 mr-24">
          {/* First Box */}
          <div className="bg-slate-900 border rounded-lg p-8 md:p-8 max-w-full w-full text-white mb-4">
            <h2 className="text-lg font-semibold mb-4">Top Prompts:</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {prompts.map((prompt) => (
                <div key={prompt._id} className="relative group">
                  <div
                    style={{
                      backgroundImage: `url(${prompt.cover_image.url})`,
                    }}
                    className="bg-cover bg-center rounded-lg p-4 h-28 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105"
                  >
                    <p className="text-white font-semibold text-sm">
                      {prompt.title}
                    </p>
                  </div>
                  {/* Add onClick handler to navigate to prompt details */}
                  <div
                    className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-opacity-10 transition duration-300"
                    onClick={() => navigateToPromptDetails(prompt._id)}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngineerProfile;
