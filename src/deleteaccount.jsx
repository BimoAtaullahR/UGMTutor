import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const DeleteAccountCard = ({ navigate }) => {
  const [password, setPassword] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('Attempting to delete account with password:', password);
    alert('Account deletion initiated. (This is a demo)');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-red-200 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-3" />
        Danger Zone
      </h2>
      
      <p className="text-gray-700 mb-2">
        This action is permanent and cannot be undone. This will permanently delete your account, your profile, and all your course data.
      </p>
      <p className="text-gray-700 mb-6">
        To confirm, please enter your password.
      </p>
      
      <form onSubmit={handleDelete}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password to confirm" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Delete My Account
          </button>

          <button 
            type="button"
            onClick={() => navigate('settings')} // Button to go back
            className="w-full bg-transparent text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


export default function DeleteAccountPage({ navigate }) {
  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mb-4">
        <button 
          onClick={() => navigate('settings')} 
          className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </button>
      </div>
      <DeleteAccountCard navigate={navigate} />
    </div>
  );
}