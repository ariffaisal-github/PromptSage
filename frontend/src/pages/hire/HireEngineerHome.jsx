import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function HireEngineerHome() {
  const [engineers, setEngineers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const response = await axios.get('/api/v1/users/engineer/all');
        setEngineers(response.data);
      } catch (error) {
        console.error('Error fetching engineers:', error);
      }
    };

    fetchEngineers();
  }, []);

  const navigateToEngineerProfile = (id) => {
    navigate(`/engineer-profile/${id}`);
  }

  return (
    <div className='bg-slate-900 min-h-screen'>
      <Navbar />
      <div className='flex flex-col pl-40 md:flex-row mt-5 md:mx-8 lg:mx-16'>
        <div className="md:w-1/2 text-white md:ml-0 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-2">Hire a Prompt Engineer</h1>
          <h1 className="text-3xl font-bold mb-4">For Your Next Project</h1>
          <p className="text-lg mb-4">Commission custom prompts from top prompt engineers,</p>
          <p className="text-lg mb-8">or hire an engineer to work on your project.</p>
          <div className="flex justify-start space-x-4">
            {/* <button className="border bg-gradient-to-r from-yellow-800 to-red-900 text-white px-6 py-3 rounded-lg transition duration-300">Hire an Engineer</button> */}
            <Link to='/sellprompt'><button className="border bg-gradient-to-r from-yellow-800 to-red-900 text-white px-6 py-3 rounded-lg transition duration-300">Become an Engineer</button></Link>
          </div>
        </div>

        <div className="md:w-1/2">
          <section className="w-full text-white mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top Engineers:</h2>
            <div className="grid grid-cols-3 gap-4">
              {engineers.map((engineer) => (
                <div key={engineer._id} className="rounded-lg overflow-hidden">
                  <div
                    className="bg-gradient-to-b from-slate-600 to-slate-900 p-4 h-32 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105 relative"
                    onClick={() => navigateToEngineerProfile(engineer.user)}
                    style={{ 
                      backgroundImage: `url(https://img.freepik.com/free-photo/white-notebook-black-data-firewall_1150-1733.jpg?w=900&t=st=1706515656~exp=1706516256~hmac=cf8699dfe1843ed04a53830e9d1b6b11d37451a03bf65a21b476391beeb92a9d)`,
                      backgroundSize: 'cover', // Change background size
                      backgroundPosition: 'center', // Center the background image
                    }}
                  >
                    <p className="text-white font-semibold">{engineer.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HireEngineerHome;
