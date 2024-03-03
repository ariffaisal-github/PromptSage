import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Home() {
  const [prompts, setPrompts] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [engine, setEngine] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const url = `/api/v1/prompts/all-prompts/?type=${type}&sort=${sort}&engine=${engine}&category=${category}&search=${search}`;
        const response = await axios.get(url);
        setPrompts(response.data.prompts);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    const fetchEngineers = async () => {
      try {
        const response = await axios.get('/api/v1/users/engineer/all');
        setEngineers(response.data);
      } catch (error) {
        console.error('Error fetching engineers:', error);
      }
    };

    fetchPrompts();
    fetchEngineers();
  }, [type, sort, engine, category, search]);

  const navigateToPromptDetails = (promptId) => {
    navigate(`/marketplace/${promptId}`);
    console.log(`Navigate to prompt details for prompt ID ${promptId}`);
  };

  const navigateToEngineerProfile = (id) => {
    // Implement navigation logic to engineer profile page
    // navigate to engineer profile page
    navigate(`/engineer-profile/${id}`);
  };

  return (
    <div className=' bg-slate-900 pb-10'>
      <Navbar />

      <div className="flex flex-col items-center mt-5">
        {/* Introduction Section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to promptsage</h1>
          <p className="text-gray-300">
            Your one-stop marketplace for creative prompts and talented engineers.
            Explore top prompts, discover skilled engineers, and bring your projects to life!
          </p>
        </section>

        {/* Top Popular prompt Section */}
        <div className="ml-14"> {/* Use margin-left to move the section to the right */}
          <h2 className="text-2xl font-semibold text-white mb-2">Popular Prompts:</h2> {/* Move the title here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Render popular prompts here */}
            {prompts.map((prompt) => (
              <div key={prompt._id} className="relative group">
                <div
                  style={{
                    backgroundImage: `url(${prompt.cover_image.url})`,
                    backgroundSize: 'cover', // Ensures the background image covers the entire container
                    backgroundPosition: 'center', // Centers the background image within the container
                    width: '220px', // Set the width of the container
                    height: '120px' // Set the height of the container
                  }}
                  className="bg-gradient-to-b rounded-lg  from-slate-600 to-slate-900 p-4 h-32 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105 relative"
                  onClick={() => navigateToPromptDetails(prompt.id)}
                >
                  <p className="text-white font-semibold">{prompt.title}</p>
                  <p className="text-gray-300 text-sm">{prompt.engine}</p>
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

        <div className="ml-14 mt-6"> {/* Use margin-left to move the section to the right */}
          <h2 className="text-2xl font-semibold text-white mb-2">Top Prompt Engineers:</h2> {/* Move the title here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Render top DALL-E engineers here */}
            {engineers.map((engineer) => (
              <div key={engineer._id} className="relative group">
                <div
                  style={{
                    backgroundImage: 'url(https://img.freepik.com/free-photo/white-notebook-black-data-firewall_1150-1733.jpg?w=900&t=st=1706515656~exp=1706516256~hmac=cf8699dfe1843ed04a53830e9d1b6b11d37451a03bf65a21b476391beeb92a9d)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '220px', // Set the width of the container
                    height: '120px' // Set the height of the container
                  }}
                  className="bg-gradient-to-b rounded-lg from-slate-600 to-slate-900 p-4 h-32 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105 relative"
                // onClick={() => navigateToEngineerProfile(engineer.id)}
                >
                  <p className="text-white font-semibold">{engineer.username}</p>
                </div>
                {/* Add onClick handler to navigate to engineer profile */}
                <div
                  className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-opacity-10 transition duration-300"
                onClick={() => navigateToEngineerProfile(engineer.user)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

