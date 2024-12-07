import React, { useState } from 'react';

const NewsCard = ({ title, imageUrl, description, link, imageType = 'cover' }) => {
    return (
        <div className="overflow-hidden">
            <div className="shadow-lg p-10 mb-6 md:mb-10 px-3 md:px-6 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-2xl md:text-[2.5rem] font-bold mb-2 md:mb-4">{title}</h2>
                    <p className="text-gray-600 text-sm w-full md:w-96 mb-4 md:mt-10">{description}</p>
                </div>
                <div className="relative">
                    <img
                        loading="lazy"
                        src={imageUrl}
                        alt={title}
                        className={`w-full h-48 md:h-[26rem] rounded-xl object-${imageType}`}
                    />
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex space-x-4">
                        <button className="bg-black px-3 md:px-4 py-1 md:py-2 text-sm md:text-base font-medium hover:bg-gradient-to-r hover:from-[#EE1B49] hover:to-[#FF99AA] text-white rounded-md transform transition duration-300 hover:scale-105 border-2 border-white">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
