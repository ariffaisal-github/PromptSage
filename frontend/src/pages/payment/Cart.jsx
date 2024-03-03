import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

function Cart() {
    const navigate = useNavigate();

    const prompts = [
        { id: 1, title: 'Prompt 1', description: 'Description of Prompt 1', price: 10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8U80XAvqnq-qRc01c-OlQniEeKgIo8ZHqZx9bTKJf2rav8k0deO1rmry_ctGprnPoUB0' },
        { id: 2, title: 'Prompt 2', description: 'Description of Prompt 2', price: 15, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8U80XAvqnq-qRc01c-OlQniEeKgIo8ZHqZx9bTKJf2rav8k0deO1rmry_ctGprnPoUB0' },
        { id: 3, title: 'Prompt 3', description: 'Description of Prompt 3', price: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8U80XAvqnq-qRc01c-OlQniEeKgIo8ZHqZx9bTKJf2rav8k0deO1rmry_ctGprnPoUB0' },
    ];

    const handleBuyClick = () => {
        // Redirect to payment page
        navigate('/buy-prompt/:id');
    };

    const handlePromptClick = (id) => {
        // Redirect to specific prompt details page
        navigate(`/prompt/${id}`);
    };

    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold text-white mb-4">Your Cart</h1>
                {prompts.map(prompt => (
                    <div key={prompt.id} className="relative bg-gray-800 border rounded-lg p-4 md:p-8 w-8/12 max-w-full text-white mb-4 overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-700" onClick={() => handlePromptClick(prompt.id)}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-20 w-20">
                                <img
                                    src={prompt.image}
                                    alt="Prompt"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h2 className="text-xl font-bold">{prompt.title}</h2>
                                <p className="text-sm">{prompt.description}</p>
                                <p className="text-sm">Price: ${prompt.price}</p>
                            </div>
                            <button className="absolute bottom-2 right-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 transition-transform transform hover:scale-105" onClick={(e) => { e.stopPropagation(); handleBuyClick(); }}>
                                <span className="relative px-16 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
                                    Buy
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
