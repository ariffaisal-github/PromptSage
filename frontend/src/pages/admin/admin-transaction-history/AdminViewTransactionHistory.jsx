import React from 'react';
import Navbar from '../../../components/navbar/Navbar';

function AdminViewTransactionHistory() {
    // Dummy data for demonstration
    const transactions = [
        { id: 1, user: 'User 1', prompt_id: 1, amount: 50, date: '2024-02-12' },
        { id: 2, user: 'User 2', prompt_id: 2, amount: 70, date: '2024-02-11' },
        { id: 3, user: 'User 3', prompt_id: 3, amount: 90, date: '2024-02-10' },
    ];

    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-3xl font-bold text-white mb-4">Admin View Transaction History</h1>
                {transactions.map(transaction => (
                    <div key={transaction.id} className="relative bg-gray-800 border rounded-lg p-4 md:p-8 w-8/12 max-w-full text-white mb-4 overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-20 w-20">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8U80XAvqnq-qRc01c-OlQniEeKgIo8ZHqZx9bTKJf2rav8k0deO1rmry_ctGprnPoUB0"
                                    alt="Transaction"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="ml-4 flex-grow">
                                <h2 className="text-xl font-bold">Transaction ID: {transaction.id}</h2>
                                <p className="text-sm">User: {transaction.user}</p>
                                <p className="text-sm">Prompt ID: {transaction.prompt_id}</p>
                                <p className="text-sm">Amount: ${transaction.amount}</p>
                                <p className="text-sm">Date: {transaction.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminViewTransactionHistory;
