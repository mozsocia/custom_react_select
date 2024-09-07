import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

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

    const handleWindowBlur = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('blur', handleWindowBlur);
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
        placeholder={selectedOption ? selectedOption.label : placeholder}
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
