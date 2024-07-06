// components/FormComponent.tsx

'use client';

import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';

interface ImageData {
  public_id: string;
  url: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    MRP: '',
    description: '',
    images: [] as ImageData[],
    adminId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData)
      const response = await fetch('/api/uploadProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSuccess = (result: any) => {
    const { info } = result;
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, { public_id: info.public_id, url: info.secure_url }],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>MRP:</label>
        <input
          type="number"
          name="MRP"
          value={formData.MRP}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <CldUploadWidget uploadPreset="u6pmc10j" onSuccess={handleSuccess}>
          {({ open }) => (
            <button type="button" className="btn btn-primary" onClick={() => open()}>
              Upload
            </button>
          )}
        </CldUploadWidget>
        {formData.images.length > 0 && (
          <div>
            <p>Uploaded Images:</p>
            {formData.images.map((image, index) => (
              <img key={index} src={image.url} alt="Uploaded" style={{ maxWidth: '100px', margin: '10px' }} />
            ))}
          </div>
        )}
      </div>
      <div>
        <label>Admin ID:</label>
        <input
          type="number"
          name="adminId"
          value={formData.adminId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
