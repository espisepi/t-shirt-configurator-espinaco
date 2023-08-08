import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { state } from './store';

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color is black

  const snap = useSnapshot(state);


  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    state.color = event.target.value;
  };

  return (
    <div className='color-picker'>
      <input type="color" value={selectedColor} onChange={handleColorChange} />
      <div style={{ marginTop: '20px', width: '50px', height: '50px', backgroundColor: selectedColor }}></div>
      <p>Selected color: {selectedColor}</p>
    </div>
  );
}

export default ColorPicker;
