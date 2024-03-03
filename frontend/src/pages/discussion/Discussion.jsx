import React, { useState, useEffect } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

function Discussion() {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTopic, setSearchTopic] = useState('');

    useEffect(() => {
        const fetchDiscussions = async () => {
            setIsLoading(true);
            try {
                let url = '/api/v1/discussions/all';
                if (searchTopic) {
                    url += `?topic=${searchTopic}`;
                }
                const response = await axios.get(url);
                setDiscussions(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching discussions:', error);
                setIsLoading(false);
            }
        };

        fetchDiscussions();
    }, [searchTopic]);

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePost = async () => {
        try {
            const response = await axios.post('/api/v1/discussions/create', {
                topic,
                description,
            });
            setDiscussions([...discussions, response.data.data]);
            setTopic('');
            setDescription('');
        } catch (error) {
            console.error('Error posting discussion:', error);
        }
    };

    const handleSearch = () => {
        setSearchTopic(topic);
    };

    return (
        <div className='bg-slate-900 min-h-screen'>
            <Navbar />
            <div className="bg-slate-900 min-h-screen">
                <div className="flex flex-col items-center mt-5">
                    <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
                    <div className="mb-8">
                            <input
                                type="text"
                                className="w-full bg-gray-800 text-white p-2 rounded-tl rounded-tr"
                                placeholder="Search by topic"
                                value={searchTopic}
                                onChange={(e) => setSearchTopic(e.target.value)}
                            />
                            {/* <button
                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 float-right mt-2"
                                onClick={handleSearch}
                            >
                                <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Search
                                </span>
                            </button> */}
                        </div>
                        <div className="mb-16">
                            <h1 className="text-4xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">Discussion</span>
                            </h1>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="w-full bg-gray-800 text-white p-2 rounded-tl rounded-tr"
                                    placeholder="Add A Topic"
                                    value={topic}
                                    onChange={handleTopicChange}
                                />
                                <textarea
                                    className="w-full h-28 mt-2 bg-gray-800 text-white p-2 rounded-bl rounded-br"
                                    placeholder="Add A Description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                            <button
                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 float-right"
                                onClick={handlePost}
                            >
                                <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Post
                                </span>
                            </button>
                        </div>

                        

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            discussions.map((discussion) => (
                                <div key={discussion._id} className="border mt-4 p-4 rounded-md">
                                    <h2 className="text-lg font-semibold text-white mb-2">{discussion.topic}</h2>
                                    <p className="text-gray-300">{discussion.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discussion;
