import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Gallery() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/gallery/')
      .then(response => setImages(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('gallery.title')}</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <div key={image.id} className="bg-white p-4 rounded shadow">
            <img src={image.image_url} alt={image.category} className="w-full h-48 object-cover" />
            <p>{image.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
