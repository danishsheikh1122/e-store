'use client';

import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageData {
  public_id: string;
  url: string;
}

const UploadCMP = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const handleSuccess = (result: any) => {
    const { info } = result;
    setImageData({
      public_id: info.public_id,
      url: info.secure_url,
    });
  };
console.log(imageData);
  return (
    <div>
      <CldUploadWidget uploadPreset="u6pmc10j" onSuccess={handleSuccess}>
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
      
      {/* {imageData && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageData.url} alt="Uploaded" />
        </div>
      )} */}
    </div>
  );
};

export default UploadCMP;
