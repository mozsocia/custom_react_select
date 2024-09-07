import React, { useState, useRef, useEffect } from 'react';
import './Select.css'; // Make sure to create this CSS file

const Select = ({ options, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setInputValue(selectedOption ? selectedOption.label : '');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedOption]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setInputValue('');
    } else {
      setInputValue(selectedOption ? selectedOption.label : '');
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setInputValue(option.label);
    setIsOpen(false);
    onChange(option);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="custom-select" ref={dropdownRef}>
      <input
        type="text"
        className="select-input"
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleDropdown}
        placeholder={placeholder}
      />
      {isOpen && (
        <div className="select-dropdown">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="select-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;