import React, { useState, useEffect, lazy, Suspense } from 'react'
import LoadingScreen from './LoadingScreen';
const NewsCard = lazy(() => import('./NewsCard'));

const SQL = import.meta.env.VITE_PORT || 3306;

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Add fade-in effect
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:${SQL}/api/getItems`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNewsItems(data);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={`mx-4 md:mx-10 mb-6 md:mb-10 mt-20 md:mt-20 min-h-screen
            transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <Suspense fallback={<LoadingScreen />}>
                {newsItems.map((item) => (
                    <NewsCard
                        key={item.id}
                        title={item.title}
                        imageUrl={item.img}
                        description={item.description}
                        link={item.link}
                        imageType={item.imageType}
                    />
                ))}
            </Suspense>
        </div>
    );
}

export default NewsPage