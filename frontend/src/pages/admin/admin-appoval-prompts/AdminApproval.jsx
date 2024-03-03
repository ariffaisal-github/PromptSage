import React from 'react';
import Navbar from '../../../components/navbar/Navbar';

function AdminApproval() {
    // Dummy data for demonstration
    const promptsToApprove = [
        { id: 4, title: 'Prompt 4', description: 'Description of Prompt 4', price: 5, prompt_type: "DALL-E", Catagory: "Art", Engine: "Chat gpt-4 turbo", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8U80XAvqnq-qRc01c-OlQniEeKgIo8ZHqZx9bTKJf2rav8k0deO1rmry_ctGprnPoUB0' },
        { id: 5, title: 'Prompt 5', description: 'Description of Prompt 5', price: 6, prompt_type: "Mid-journey", Catagory: "Animal", Engine: "Chat gpt", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8U80XAvqnq-qRc01c-OlQniEeKgIo8ZHqZx9bTKJf2rav8k0deO1rmry_ctGprnPoUB0' },
    ];

    const handleApproveClick = (id) => {
        // Logic to approve the prompt
        console.log(`Prompt with ID ${id} approved.`);
        // You can add your logic here to update the state or perform any other action
    };

    const handleRejectClick = (id) => {
        // Logic to reject the prompt
        console.log(`Prompt with ID ${id} rejected.`);
        // You can add your logic here to update the state or perform any other action
    };

    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold text-white mb-4">Admin Approval</h1>
                {promptsToApprove.map(prompt => (
                    <div key={prompt.id} className="relative bg-gray-800 border rounded-lg p-4 md:p-8 w-8/12 max-w-full text-white mb-4 overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-700">
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
                                <p className="text-sm">Prompt Type: {prompt.prompt_type}</p>
                                <p className="text-sm">Category: {prompt.Catagory}</p>
                                <p className="text-sm">Engine: {prompt.Engine}</p>
                            </div>
                            <div className="absolute bottom-2 right-2 flex">
                                <button className="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-green-500 to-blue-400 focus:ring-4 focus:outline-none focus:ring-green-200 transition-transform transform hover:scale-105 mr-2" onClick={() => handleApproveClick(prompt.id)}>
                                    <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md text-white">
                                        Approve
                                    </span>
                                </button>
                                <button className="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-red-500 to-yellow-400 focus:ring-4 focus:outline-none focus:ring-red-200 transition-transform transform hover:scale-105" onClick={() => handleRejectClick(prompt.id)}>
                                    <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md text-white">
                                        Reject
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminApproval;
