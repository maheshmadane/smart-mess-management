import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function Gallery() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/gallery/');
        setImages(response.data);
        toast.success('Gallery fetched');
      } catch (error) {
        toast.error('Error fetching gallery');
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-secondary p-4 rounded-lg shadow-md">
            <img src={image.photo || 'https://via.placeholder.com/300'} alt={image.caption} className="w-full h-48 object-cover rounded" />
            <p className="mt-2">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;