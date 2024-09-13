import React from 'react';
import './style.css';

interface InputProps {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, onChange, label }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
