import React from "react";

const Select = ({ name, label, options, handleChange, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control"
        onChange={handleChange}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option + name} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
