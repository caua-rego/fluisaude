import React, { useEffect } from 'react';

// This page now redirects to the backend-served static dashboard to avoid duplicate React dashboard UI.
const DashboardPage: React.FC = () => {
  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.hostname}:5001/dashboard`;
    window.location.replace(url);
  }, []);
  return null;
};

export default DashboardPage;
