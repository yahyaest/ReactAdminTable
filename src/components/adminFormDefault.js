import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Input from "./common/input";
import Select from "./common/select";
import { toast } from "react-toastify";
import {
  setValidationProperty,
  validate,
  validateProperty,
} from "./services/validation";
import { getSelectedTable } from "./services/dataModeling";
import { sleepTime } from "./services/sleepFunction";

function AdminFormDefault(props) {
  AdminFormDefault.prototype = {
    tables: PropTypes.array.isRequired,
    currentTable: PropTypes.object.isRequired,
  };

  const { tables, currentTable, handleShow, currentId, tableName, url } = props;

  const [currentComponent, setCurrentComponent] = useState();
  const [intialComponent, setIntialComponent] = useState({});
  const [formAttributes, setFormAttributes] = useState([]);
  const [schema, setSchema] = useState({});
  const [schemaComponent, setSchemaComponent] = useState({});
  const [uploadType, setUploadType] = useState("");
  const [errors, setErrors] = useState({});

  const isFile = useRef(false);

  let history = useHistory();

  let attributsList = [];

  if (Object.keys(currentTable).length === 0)
    history.push(`/admin/${tableName}`);

  const getUploadType = () => {
    let type = "Object";
    let attributes = tables.filter((table) => table.data.name === tableName)[0]
      ?.tableAttributes;

    attributes?.forEach((attribute) => {
      if (attribute.image === true) type = "FormData";
    });

    return type;
  };

  const getAttibutes = () => {
    let attributes = getSelectedTable(tables, tableName)?.tableAttributes;
    attributes = attributes?.filter(
      (attribute) =>
        attribute.display === "form" || attribute.display === "table/form"
    );
    setFormAttributes(attributes);
    return attributes;
  };

  const setSchemaObject = () => {
    let schemaObject = {};
    let schemaComponentObject = {};

    getSelectedTable(tables, tableName)?.tableAttributes?.map((attribute) => {
      setValidationProperty(
        schemaObject,
        attribute.title,
        attribute.validation_type
      );
      if (url !== `/admin/${tableName}/new` && attribute.validation_type) {
        if (attribute.validation_type === "object") {
          let objectAttribute = attribute.title.split(".")[0];
          schemaComponentObject[`${objectAttribute}`] = getInputValue(
            currentId,
            objectAttribute
          );
        } else {
          schemaComponentObject[`${attribute.title}`] = getInputValue(
            currentId,
            attribute.title
          );
        }
      }
    });

    setSchema(schemaObject);
    setSchemaComponent(schemaComponentObject);
  };

  const setComponent = () => {
    let component = {};

    formAttributes?.map((attribute) => {
      if (attribute.format === "json")
        attributsList.push(attribute.title.split(".")[0]);
      else attributsList.push(attribute.title);
    });

    if (url === `/admin/${tableName}/new`) {
      attributsList.map((attribute) => (component[`${attribute}`] = ""));
    } else {
      attributsList.map((attribute) => {
        component[`${attribute}`] = getInputValue(currentId, attribute);
      });
    }

    return component;
  };

  useEffect(() => {
    getAttibutes();
    setIntialComponent(setComponent());
    setUploadType(getUploadType());
    setSchemaObject();
  }, [currentTable]);

  let component = intialComponent;

  const getInputValue = (id, attribute) => {
    let result = tables.filter((table) => table.data.name === tableName)[0].data
      .table;
    result = result.filter(
      (element) => element.id === id || element._id === id
    );
    result = result[0][`${attribute}`];
    return result;
  };

  const getSelectValue = (currentOption) => {
    let options = [];
    let result = [];
    result = tables.filter((table) => table.data.name === tableName)[0].data
      .table;

    result.map((element) => {
      let index = options.indexOf(element[`${currentOption}`]);
      if (index === -1) options.push(element[`${currentOption}`]);
    });

    for (let index = 0; index < options.length; index++) {
      if (options[index] === true) options[index] = "true";
      if (options[index] === false) options[index] = "false";
    }

    return options;
  };

  const getTextAreaValue = (id, attribute) => {
    let result = tables.filter((table) => table.data.name === tableName)[0].data
      .table;

    result = result.filter(
      (element) => element.id === id || element._id === id
    );
    result = result[0][`${attribute}`];
    result = JSON.stringify(result);
    return result;
  };

  const handleChange = (e, attribute) => {
    // Errors
    if (attribute.validation_type) {
      const errorsObject = { ...errors };
      const errorMessage = validateProperty(schema, e.currentTarget);

      if (errorMessage) {
        errorsObject[e.currentTarget.name] = errorMessage;
      } else {
        delete errorsObject[e.currentTarget.name];
      }
      setErrors(errorsObject);
    }

    // Schema change
    let schemaComponentObject = { ...schemaComponent };

    if (attribute.validation_type) {
      if (attribute.validation_type === "number") {
        schemaComponentObject[`${attribute.title}`] = parseInt(
          e.currentTarget.value
        );
      } else if (attribute.validation_type === "object") {
        schemaComponentObject[`${attribute.title.split(".")[0]}`] =
          e.currentTarget.value;
      } else {
        schemaComponentObject[`${attribute.title}`] = e.currentTarget.value;
      }
    }

    setSchemaComponent(schemaComponentObject);

    // Change
    if (attribute.type === "file" && e.target.files.length > 0) {
      isFile.current = true;
    }
    if (attribute.type === "file" && e.target.files.length === 0) {
      isFile.current = false;
    } // Check that there is file to upload

    if (e.target.name === attribute.title) {
      if (attribute.image) {
        component[`${attribute.title}`] = e.target.files[0];
      } else {
        component[`${attribute.title}`] = e.currentTarget.value;
      }
    } else if (attribute.format === "json") {
      try {
        component[`${attribute.title.split(".")[0]}`] = JSON.parse(
          e.currentTarget.value
        );
      } catch (error) {}
    }

    let componentFormData = new FormData();

    for (let key in component) {
      componentFormData.append(key, component[key]);
    }

    if (uploadType === "FormData" && isFile.current)
      setCurrentComponent(componentFormData);
    else setCurrentComponent(component);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //// Errors
    const errors = validate(schema, schemaComponent);
    setErrors({ errors: errors || {} });
    if (errors) return;

    //// Submit
    const targetTable = tables.filter(
      (table) => table.data.name === tableName
    )[0];

    // Add Object
    if (url === `/admin/${targetTable.data.name}/new`) {
      const elementAdded = await targetTable.elementAdd(currentComponent);
      if (elementAdded && !elementAdded?.isError) {
        history.push(`/admin/${tableName}`);
        toast.dark("New item added.");
      } else if (elementAdded && elementAdded?.isError) {
        history.push(`/admin/${tableName}`);
        toast.error(
          elementAdded?.errorMessage
            ? elementAdded?.errorMessage
            : "An Error has occured!"
        );
      } else {
        history.push(`/admin/${tableName}`);
      }

      await sleepTime(2000);
      window.location.reload();
    }

    // Update Object
    else {
      let elementUpdated = {};

      if (Object.keys(currentComponent).length === 0) {
        elementUpdated = await targetTable.elementUpdate(
          intialComponent,
          currentId
        );
      } else {
        elementUpdated = await targetTable.elementUpdate(
          currentComponent,
          currentId
        );
      }

      if (elementUpdated && !elementUpdated?.isError) {
        history.push(`/admin/${tableName}`);
        toast.dark("Item updated successfully.");
      } else if (elementUpdated && elementUpdated?.isError) {
        history.push(`/admin/${tableName}`);
        toast.error(
          elementUpdated?.errorMessage
            ? elementUpdated?.errorMessage
            : "An Error has occured!"
        );
      } else {
        history.push(`/admin/${tableName}`);
      }

      await sleepTime(2000);
      window.location.reload();
    }
  };

  return (
    <Form className="form__page" onSubmit={(e) => handleSubmit(e)}>
      {formAttributes?.map((attribute) => (
        <div key={attribute.label}>
          {attribute.format === "input" && (
            <div key={attribute.label}>
              <Input
                key={attribute.label}
                controlid={`formBasic${attribute.label}`}
                label={attribute.label}
                name={attribute.title}
                type={attribute.type}
                value={
                  url !== `/admin/${tableName}/new`
                    ? attribute.type !== "file"
                      ? getInputValue(currentId, attribute.title)
                      : ""
                    : ""
                }
                handleChange={(e) => handleChange(e, attribute)}
              />
              {errors[`${attribute.title}`] && (
                <div className="alert alert-danger">
                  {errors[`${attribute.title}`]}
                </div>
              )}
            </div>
          )}

          {attribute.format === "select" && (
            <Select
              key={attribute.label}
              controlid={`formBasic${attribute.label}`}
              label={attribute.label}
              name={attribute.title}
              options={getSelectValue(attribute.title)}
              handleChange={(e) => handleChange(e, attribute)}
            />
          )}

          {attribute.format === "json" && (
            <div
              key={attribute.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="">{attribute.label}</label>
              <textarea
                name={attribute.title.split(".")[0]}
                id=""
                cols="30"
                rows="10"
                defaultValue={
                  url !== `/admin/${tableName}/new`
                    ? getTextAreaValue(currentId, attribute.title.split(".")[0])
                    : ""
                }
                onChange={(e) => handleChange(e, attribute)}
              ></textarea>
              {errors[`${attribute.title.split(".")[0]}`] && (
                <div className="alert alert-danger">
                  {errors[`${attribute.title.split(".")[0]}`]}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <div className="form__submit">
        <Button
          variant="dark"
          type="submit"
          disabled={validate(schema, schemaComponent)}
        >
          Submit
        </Button>
        <p>Click below to use JSON format</p>
        <div className="json__button" onClick={() => handleShow(false)}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path d="M2.1 3.1c0.2 1.3 0.4 1.6 0.4 2.9 0 0.8-1.5 1.5-1.5 1.5v1c0 0 1.5 0.7 1.5 1.5 0 1.3-0.2 1.6-0.4 2.9-0.3 2.1 0.8 3.1 1.8 3.1s2.1 0 2.1 0v-2c0 0-1.8 0.2-1.8-1 0-0.9 0.2-0.9 0.4-2.9 0.1-0.9-0.5-1.6-1.1-2.1 0.6-0.5 1.2-1.1 1.1-2-0.3-2-0.4-2-0.4-2.9 0-1.2 1.8-1.1 1.8-1.1v-2c0 0-1 0-2.1 0s-2.1 1-1.8 3.1z"></path>
            <path d="M13.9 3.1c-0.2 1.3-0.4 1.6-0.4 2.9 0 0.8 1.5 1.5 1.5 1.5v1c0 0-1.5 0.7-1.5 1.5 0 1.3 0.2 1.6 0.4 2.9 0.3 2.1-0.8 3.1-1.8 3.1s-2.1 0-2.1 0v-2c0 0 1.8 0.2 1.8-1 0-0.9-0.2-0.9-0.4-2.9-0.1-0.9 0.5-1.6 1.1-2.1-0.6-0.5-1.2-1.1-1.1-2 0.2-2 0.4-2 0.4-2.9 0-1.2-1.8-1.1-1.8-1.1v-2c0 0 1 0 2.1 0s2.1 1 1.8 3.1z"></path>
          </svg>
          <p style={{ color: "gray" }}>Use JSON</p>
        </div>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminFormDefault);
