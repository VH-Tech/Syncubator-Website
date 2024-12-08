import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import API_BASE_URL from '../config';

const Dashboard = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        img: '',
        title: '',
        description: '',
        link: '',
        imageType: 'cover'
    });
    const [editingId, setEditingId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Add authentication header to axios requests
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    // Fetch all items
    const fetchItems = async () => {
        try {
            console.log('Fetching items from:', `${API_BASE_URL}/api/getItems`);
            const response = await axios.get(`${API_BASE_URL}/api/getItems`, axiosConfig);
            console.log('Response:', response.data);
            setItems(response.data);
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                config: error.config
            });
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchItems();
            } catch (error) {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.error('Authentication error:', error);
                    handleLogout();
                }
            }
        };
        
        fetchData();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission (Create/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            if (selectedFile) {
                formDataToSend.append('image', selectedFile);
            }
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('link', formData.link);
            formDataToSend.append('imageType', formData.imageType);

            if (editingId) {
                await axios.put(
                    `${API_BASE_URL}/api/updateItem/${editingId}`, 
                    formDataToSend, 
                    {
                        ...axiosConfig,
                        headers: {
                            ...axiosConfig.headers,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            } else {
                await axios.post(
                    `${API_BASE_URL}/api/postItems`, 
                    formDataToSend,
                    {
                        ...axiosConfig,
                        headers: {
                            ...axiosConfig.headers,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            }

            setFormData({ img: '', title: '', description: '', link: '', imageType: 'cover' });
            setSelectedFile(null);
            setPreviewUrl(null);
            setEditingId(null);
            fetchItems();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/deleteItem/${id}`, axiosConfig);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    // Handle edit
    const handleEdit = (item) => {
        setFormData({
            img: item.img,
            title: item.title,
            description: item.description,
            link: item.link,
            imageType: item.imageType
        });
        setEditingId(item.id);
    };

    return (
        <div className="dashboard-container mt-20">
            <div className="dashboard-header">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center h-16">
                    Admin Dashboard
                </h1>
            </div>
            
            <div className="dashboard-content-wrapper flex">
                {/* Items List - Left Side - Added fixed height and overflow */}
                <div className="items-list-container w-2/3 p-4">
                    <h2 className='text-xl md:text-2xl font-bold mb-4'>Current Items</h2>
                    <div className="items-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-250px)] overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="item-card">
                                {item.img && (
                                    <div className="relative">
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className={`w-full h-48 md:h-[26rem] rounded-xl object-${item.imageType}`}
                                            onError={(e) => {
                                                console.error('Failed to load image:', item.img);
                                                e.target.src = 'placeholder.jpg'; // Add a placeholder image
                                            }}
                                        />
                                        <p className="text-sm text-gray-500 mt-2">Image URL: {item.img}</p>
                                    </div>
                                )}
                                <h3 className='text-xl md:text-2xl font-bold mb-2'> Title: </h3>
                                 <p className='text-xl md:text-2xl font-bold mb-2'> {item.title}</p>
                                <h4 className='text-sm md:text-base mb-2'> Description: </h4>
                                <p className='text-sm md:text-base mb-2'> {item.description}</p>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className='text-sm md:text-base mb-2 text-blue-500'>View Link</a>
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)} className='bg-black text-white px-4 py-2 rounded-md'>Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className='bg-black text-white px-4 py-2 rounded-md'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add/Edit Form - Right Side */}
                <div className="form-section w-1/3 p-4 border-l h-[calc(100vh-250px)]">
                <div className='flex flex-row justify-between'>
                    <h2 className='text-xl md:text-2xl font-bold mb-4'>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
                    <button onClick={handleLogout} className="logout-button bg-black text-white  rounded-md p-4">
                            Logout
                        </button>   
                    </div>
                    <form onSubmit={handleSubmit} className='p-4'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full"
                            />
                            {previewUrl && (
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="mt-2 h-32 object-contain"
                                />
                            )}
                        </div>
                        <input
                            className='border rounded-md p-2 mb-4'
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            className='border rounded-md p-2 mb-4'
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <input
                            className='border rounded-md p-2 mb-4'
                            type="text"
                            name="link"
                            placeholder="Link"
                            value={formData.link}
                            onChange={handleInputChange}
                        />
                        <div className="flex items-center mb-4">
                            <label className="mr-2">Image Display:</label>
                            <select
                                name="imageType"
                                value={formData.imageType}
                                onChange={handleInputChange}
                                className="border rounded-md p-2"
                            >
                                <option value="cover">Cover</option>
                                <option value="contain">Contain</option>
                            </select>
                        </div>
                        <button type="submit" className='bg-black text-white px-4 py-2 rounded-md'>
                            {editingId ? 'Update Item' : 'Add Item'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => {
                                setEditingId(null);
                                setFormData({ img: '', title: '', description: '', link: '', imageType: 'cover' });
                            }}>
                                Cancel Edit
                            </button>
                        )}
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 