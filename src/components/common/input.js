import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  const { controlId, label, name, type, value, handleChange } = props;

  return (
    <div>
      <Form.Group controlId={controlId} className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          defaultValue={value}
          type={type}
          name={name}
          placeholder={`Enter ${label}`}
          onChange={handleChange}
        />
      </Form.Group>
    </div>
  );
}

export default Input;
