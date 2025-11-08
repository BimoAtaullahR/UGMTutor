import React from 'react';
import { Sidebar, DashboardHeader } from './dashboard.jsx';

const AddCourseForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Your Course</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Course Name" className="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Price" className="w-full p-3 border rounded-lg" />
        <textarea placeholder="Description" rows="4" className="w-full p-3 border rounded-lg"></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          Add Course
        </button>
      </form>
    </div>
  );
};

const ActiveCourseTable = () => {
  const courses = [
    { name: 'Calculus 1', startDate: '05 Dec, 2024' },
    { name: 'Calculus 1', startDate: '05 Dec, 2024' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Active Course</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-3">Course Name</th>
            <th className="p-3">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{course.name}</td>
              <td className="p-3">{course.startDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function MyCoursesPage({ navigate }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar navigate={navigate} currentPage="mycourses" />
      <main className="flex-1 p-8 ml-4">
        <DashboardHeader navigate={navigate} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActiveCourseTable />
          </div>
          <div>
            <AddCourseForm />
          </div>
        </div>
      </main>
    </div>
  );
};