import React, { useState } from 'react';
import { state } from './store';
import { useSnapshot } from 'valtio';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const snap = useSnapshot(state)


  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        state.decalName = reader.result;
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* {image && <img src={image} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%' }} />} */}
    </div>
  );
}

export default ImageUpload;
