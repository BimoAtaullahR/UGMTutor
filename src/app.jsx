import React, { useState } from 'react';
import Homepage from './home.jsx';
import TutorProfilePage from './TutorProfilePage.jsx';
import CourseDetailPage from './CourseDetail.jsx';
import MyCoursesPage from './mycourse.jsx';
import SettingsPage from './settings.jsx';
import ExplorePage from './Explore.jsx';
import DeleteAccountPage from './deleteaccount.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage navigate={navigate} />;
      case 'tutorProfile':
        return <TutorProfilePage navigate={navigate} />;
      case 'courseDetail':
        return <CourseDetailPage navigate={navigate} />;
      case 'mycourses':
        return <MyCoursesPage navigate={navigate} />;
      case 'explore':
        return <ExplorePage navigate={navigate} />;
      case 'account':
        return <SettingsPage navigate={navigate} />;
      case 'settings':
        return <SettingsPage navigate={navigate} />;
      case 'deleteAccount':
        return <DeleteAccountPage navigate={navigate} />;
      default:
        return <Homepage navigate={navigate} />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}