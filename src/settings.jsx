import React from 'react';
import { Sidebar, DashboardHeader } from './dashboard.jsx';
import { Upload, Trash2 } from 'lucide-react';

const EditProfile = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      <div className="flex items-center space-x-6 mb-6">
        <img src="https://placehold.co/100x100/e2e8f0/64748b?text=Shafiq" alt="Profile" className="w-24 h-24 rounded-full" />
        <div className="flex space-x-2">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">
            <Upload className="h-4 w-4 mr-2" />
            Upload Picture
          </button>
          <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-300">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">First Name</label>
            <input type="text" defaultValue="Shafiq" className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Last Name</label>
            <input type="text" defaultValue="A" className="w-full p-3 border rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" defaultValue="shafiq@gmail.com" className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full p-3 border rounded-lg" />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const AddDetail = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Detail</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Education</label>
          <input type="text" placeholder="e.g., Universitas Gadjah Mada" className="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Faculty</label>
          <input type="text" placeholder="e.g., Faculty of Engineering" className="w-full p-3 border rounded-lg" />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

const DangerZone = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-red-300 mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
      <p className="text-gray-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
      <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
        Delete Your Account
      </button>
    </div>
  );
};

export default function SettingsPage({ navigate }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar navigate={navigate} currentPage="settings" />
      <main className="flex-1 p-8 ml-4">
        <DashboardHeader navigate={navigate} />
        <div className="max-w-4xl mx-auto">
          <EditProfile />
          <AddDetail />
          <DangerZone />
        </div>
      </main>
    </div>
  );
};