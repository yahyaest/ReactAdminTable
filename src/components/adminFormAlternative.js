import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  setValidationProperty,
  validate,
  validateProperty,
} from "./services/validation";
import { sleepTime } from "./services/sleepFunction";

function AdminFormAlternative(props) {
  AdminFormAlternative.prototype = {
    tables: PropTypes.array.isRequired,
    currentTable: PropTypes.object.isRequired,
  };

  const { tables, currentTable, handleShow, currentId, tableName, url } = props;

  const [intialComponent, setIntialComponent] = useState({});
  const [currentComponent, setCurrentComponent] = useState({});
  const [isFile, setIsFile] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [fileAttribute, setFileAttribute] = useState("");

  const [schema, setSchema] = useState({});
  const [schemaComponent, setSchemaComponent] = useState({});

  const [errors, setErrors] = useState({});
  let history = useHistory();

  if (Object.keys(currentTable).length === 0)
    history.push(`/admin/${tableName}`);

  const setSchemaObject = () => {
    let schemaObject = {};
    let schemaComponentObject = {};

    setValidationProperty(schemaObject, tableName, "object");

    if (url !== `/admin/${tableName}/new`) {
      schemaComponentObject[`${tableName}`] = getTextAreaObject(currentId);
    }

    setSchema(schemaObject);
    setSchemaComponent(schemaComponentObject);
  };

  const getTextAreaObject = (id) => {
    let result = tables.filter((table) => table.data.name === tableName)[0].data
      .table;

    result = result.filter(
      (element) => element.id === id || element._id === id
    );
    result = result[0];
    result = JSON.stringify(result);
    return result;
  };

  const checkFileUpload = () => {
    let result = tables.filter((table) => table.data.name === tableName)[0]
      .tableAttributes;

    result = result.find((attribute) => attribute.image === true);
    const isFile = result ? true : false;
    setIsFile(isFile);
    return isFile;
  };

  const getFileAttribute = () => {
    let attributes = tables.filter((table) => table.data.name === tableName)[0]
      ?.tableAttributes;

    attributes?.forEach((attribute) => {
      if (attribute.image === true) {
        setFileAttribute(attribute.title);
      }
    });
  };

  useEffect(() => {
    setIntialComponent(getTextAreaObject(currentId));
    setCurrentComponent(getTextAreaObject(currentId));

    checkFileUpload();
    setSchemaObject();
    getFileAttribute();
  }, []);

  let component = currentComponent;

  const handleChange = (e) => {
    // Errors
    const errorsObject = { ...errors };

    const errorMessage = validateProperty(schema, e.currentTarget);

    if (errorMessage) {
      errorsObject[e.currentTarget.name] = errorMessage;
    } else {
      delete errorsObject[e.currentTarget.name];
    }
    setErrors(errorsObject);

    // Schema change
    let schemaComponentObject = { ...schemaComponent };
    schemaComponentObject[`${tableName}`] = e.currentTarget.value;
    setSchemaComponent(schemaComponentObject);

    // Change

    try {
      component = JSON.parse(e.currentTarget.value);
    } catch (error) {
      console.log(error);
    }

    let componentFormData = new FormData();
    for (let key in component) {
      componentFormData.append(key, component[key]);
    }

    if (isFileUpload === true) setCurrentComponent(componentFormData);
    else setCurrentComponent(component);
  };

  const handleImageInput = (e) => {
    try {
      component = JSON.parse(currentComponent);
      if (fileAttribute && component !== undefined && component !== null) {
        delete component[`${fileAttribute}`];
      }
    } catch (error) {
      component = currentComponent;
      if (fileAttribute && component !== undefined && component !== null) {
        delete component[`${fileAttribute}`];
      }
    }

    if (component === undefined || component === null) component = {};
    component[`${fileAttribute}`] = e.target.files[0];

    let componentFormData = new FormData();
    for (let key in component) {
      componentFormData.append(key, component[key]);
    }

    if (isFileUpload === true) setCurrentComponent(componentFormData);
    else setCurrentComponent(component);

    document.getElementById("Json-Format").value = JSON.stringify(component);
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
      const elementUpdated = await targetTable.elementUpdate(
        currentComponent,
        currentId
      );

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Form className="form__page" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div
            className="json__input"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <label htmlFor="">{`${tableName} Object`}</label>
            <textarea
              name={tableName}
              id="Json-Format"
              cols="30"
              rows="10"
              defaultValue={
                url !== `/admin/${tableName}/new` ? intialComponent : ""
              }
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors[`${tableName}`] && (
              <div className="alert alert-danger">{errors[`${tableName}`]}</div>
            )}
          </div>

          {isFile && (
            <div className="file__check">
              <input
                type="checkbox"
                style={{ marginRight: "3px" }}
                onClick={() => setIsFileUpload(!isFileUpload)}
              ></input>
              <label htmlFor="">Upload File</label>
            </div>
          )}

          {isFile && isFileUpload && (
            <div className="file__input">
              <label htmlFor="file__input"></label>
              <input type="file" onChange={(e) => handleImageInput(e)} />
            </div>
          )}
        </div>

        <div className="form__submit">
          <Button
            variant="dark"
            type="submit"
            disabled={validate(schema, schemaComponent)}
          >
            Submit
          </Button>

          <p> Click below to use default format.</p>

          <div className="json__button" onClick={() => handleShow(true)}>
            <i className="fa fa-backward"></i>
            <p style={{ color: "gray" }}>Go Back</p>
          </div>
        </div>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tables: state.admin.tables,
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminFormAlternative);
