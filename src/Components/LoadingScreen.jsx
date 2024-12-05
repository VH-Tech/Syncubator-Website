import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ minLoadTime = 2000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [minLoadTime]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-red-500">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;