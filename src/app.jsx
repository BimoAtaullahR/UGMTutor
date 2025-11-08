import React, { useState } from 'react';
import Homepage from './home.jsx';
import TutorProfilePage from './TutorProfilePage.jsx';
import CourseDetailPage from './CourseDetail.jsx';
import MyCoursesPage from './mycourse.jsx';
import SettingsPage from './settings.jsx';
import ExplorePage from './Explore.jsx'; // Added the new Explore page

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // The router component that renders the correct page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage navigate={navigate} />;
      case 'tutorProfile':
        return <TutorProfilePage navigate={navigate} />;
      case 'courseDetail':
        return <CourseDetailPage navigate={navigate} />;
      case 'mycourses': // This will now go to the ExplorePage
        return <ExplorePage navigate={navigate} />;
      case 'explore': // Added an explicit 'explore' route
        return <ExplorePage navigate={navigate} />;
      case 'settings':
        return <SettingsPage navigate={navigate} />;
      default:
        return <Homepage navigate={navigate} />;
    }
  };

  // Render the current page
  return (
    <>
      {renderPage()}
    </>
  );
}