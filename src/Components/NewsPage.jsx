import React, { useState, useEffect, lazy, Suspense } from 'react'
import LoadingScreen from './LoadingScreen';
const NewsCard = lazy(() => import('./NewsCard'));
import API_BASE_URL from '../config';

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log('Fetching news from:', `${API_BASE_URL}/api/getItems`);
                const response = await fetch(`${API_BASE_URL}/api/getItems`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Fetched news items:', data);
                setNewsItems(data);
                
                // Cache the news items
                localStorage.setItem('cachedNews', JSON.stringify(data));
                localStorage.setItem('newsLastFetched', Date.now().toString());
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message);
                
                // Try to load cached news if available
                const cachedNews = localStorage.getItem('cachedNews');
                if (cachedNews) {
                    console.log('Loading cached news');
                    setNewsItems(JSON.parse(cachedNews));
                }
            } finally {
                setLoading(false);
            }
        };

        // Load cached news immediately while fetching fresh data
        const cachedNews = localStorage.getItem('cachedNews');
        if (cachedNews) {
            console.log('Loading cached news while fetching');
            setNewsItems(JSON.parse(cachedNews));
        }

        fetchNews();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    if (loading && newsItems.length === 0) {
        return <LoadingScreen />;
    }

    if (error && newsItems.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Error Loading News</h2>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`mx-4 md:mx-10 mb-6 md:mb-10 mt-20 md:mt-20 min-h-screen
            transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <Suspense fallback={<LoadingScreen />}>
                {newsItems.length > 0 ? (
                    newsItems.map((item) => (
                        <NewsCard
                            key={item.id}
                            title={item.title}
                            imageUrl={item.img}
                            description={item.description}
                            link={item.link}
                            imageType={item.imageType}
                        />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p>No news items available</p>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default NewsPage;