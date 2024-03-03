import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

function UserProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [uploadedPrompts, setUploadedPrompts] = useState([]);
    const [boughtPrompts, setBoughtPrompts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPrompts = async () => {
            setLoading(true);
            try {
                // Fetch uploaded prompts
                const uploadedResponse = await axios.get('/api/v1/prompts/my-prompts', { withCredentials: true });
                setUploadedPrompts(uploadedResponse.data.prompts);

                // Fetch bought prompts
                const boughtResponse = await axios.get('/api/v1/prompts/bought-prompts', { withCredentials: true });
                setBoughtPrompts(boughtResponse.data.prompts);
            } catch (error) {
                console.error('Error fetching prompts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrompts();
    }, []);

    const handlePromptClick = (promptId) => {
        navigate(`/bought-prompt-details/${promptId}`);
    };

    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />
            <div className="flex justify-between p-6">
                <div className="bg-slate-900 rounded-lg border ml-28 p-6 md:p-16 max-w-md w-full text-white">
                    <div className="text-center mb-4">
                        <img
                            src="https://img.freepik.com/free-photo/white-notebook-black-data-firewall_1150-1733.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707609600&semt=sph"
                            alt="Profile"
                            className="rounded-lg mx-auto mb-2"
                        />
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <p className="text-sm mt-2">{user.email}</p>
                    </div>
                </div>

                <div className="flex flex-col w-full ml-4 mr-24">
                    {/* Uploaded Prompts */}
                    <div className="bg-slate-900 border rounded-lg p-8 md:p-8 max-w-full w-full text-white mb-4">
                        <h2 className="text-lg font-semibold mb-4">Uploaded Prompts:</h2>
                        {loading ? (
                            <p className="text-white">Loading...</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {uploadedPrompts.map(prompt => (
                                    <div key={prompt._id} className="relative group" onClick={() => handlePromptClick(prompt._id)}>
                                        <div
                                            style={{ backgroundImage: `url(${prompt.cover_image.url})` }}
                                            className="bg-cover bg-center rounded-lg p-4 h-28 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105"
                                        >
                                            <p className="text-white font-semibold text-sm">{prompt.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Bought Prompts */}
                    <div className="bg-slate-900 border rounded-lg p-8 md:p-8 max-w-full w-full text-white">
                        <h2 className="text-lg font-semibold mb-4">Bought Prompts:</h2>
                        {loading ? (
                            <p className="text-white">Loading...</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {boughtPrompts.map(prompt => (
                                    <div key={prompt._id} className="relative group" onClick={() => handlePromptClick(prompt._id)}>
                                        <div
                                            style={{ backgroundImage: `url(${prompt.cover_image.url})` }}
                                            className="bg-cover bg-center rounded-lg p-4 h-28 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105"
                                        >
                                            <p className="text-white font-semibold text-sm">{prompt.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
