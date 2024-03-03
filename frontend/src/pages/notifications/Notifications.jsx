import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New notification 1', timestamp: new Date().toLocaleString() },
    { id: 2, message: 'New notification 2', timestamp: new Date().toLocaleString() },
    { id: 3, message: 'New notification 3', timestamp: new Date().toLocaleString() },
    { id: 4, message: 'New notification 4', timestamp: new Date().toLocaleString() },
  ]);

  return (
    <div className='h-screen bg-slate-900'>
      <Navbar />

      <div className="flex flex-col items-center mt-5">
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
          <h1 className="text-4xl font-bold text-white mb-8">Notifications</h1>

          {notifications.map((notification) => (
            <div key={notification.id} className="mb-4 p-4 border rounded-lg bg-gray-800">
              <p className="text-white">{notification.message}</p>
              <p className="text-gray-400 text-sm">{notification.timestamp}</p>
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="text-white text-center">No notifications at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
