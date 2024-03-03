import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Navbar from '../../components/navbar/Navbar';

function PaymentSuccessful() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
                <div className="bg-slate-900 p-6 rounded-lg border border-gray-300 w-3/4 md:max-w-xl lg:max-w-3xl xl:max-w-3xl 2xl:max-w-3xl flex flex-col justify-center items-center">
                    <svg viewBox="0 0 24 24" className="text-green-500 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
                    </svg>
                    <div className="text-center">
                        <h3 className="md:text-3xl text-xl text-white font-semibold">Payment Done!</h3>
                        <p className="text-white text-lg my-2">Thank you for completing your secure online payment.</p>
                        <p className="text-white text-lg my-2">Have a great day!</p>
                        <div className="py-10 text-center">
                            <Link to="/marketplace">
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                    <span className="relative px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        BACK TO MARKETPLACE
                                    </span>
                                </button>
                            </Link>
                            <Link to="/payment-history">
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                    <span className="relative px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Go TO Payment History
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccessful;
