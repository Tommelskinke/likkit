import React, { useState } from 'react';

type DropdownOptions = {
  options: string[];
};

const Dropdown: React.FC<DropdownOptions> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    setSelectedOptions((prev) =>
      prev.includes(selectedOption)
        ? prev.filter((option) => option !== selectedOption)
        : [...prev, selectedOption],
    );
  };

  return (
    <div className="dropdown">
      <div className="dropdown-select" onClick={toggleDropdown}>
        Select Options
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option}>
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
