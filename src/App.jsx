import React from 'react';
import Select from './Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const App = () => {
  const handleChange = (selectedOption) => {
    console.log('Selected:', selectedOption);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '400px' }}>
      <Select
        options={options}
        placeholder="Select a fruit"
        onChange={handleChange}
      />
    </div>
  );
};

export default App;