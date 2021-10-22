import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminNavbar(props) {
  AdminNavbar.prototype = {
    currentTable: PropTypes.object.isRequired,
  };
  const { currentTable, handleSearch, search } = props;

  return (
    <div>
      <nav>
        <div className="admin__navbar">
          <i
            className="fa fa-list-ul list_icon"
            onClick={() => {
              const icon = document.querySelector(".list_icon");
              icon.classList.toggle("list_icon_clicked");
              if (currentTable?.data?.icon) {
                const slidebar = document.querySelector(".slideBar");
                slidebar.classList.toggle("slideBar_reduced");
                const slidebarTitle =
                  document.querySelectorAll(".slideBar__title");
                slidebarTitle.forEach((element) => {
                  element.classList.toggle("slideBar__title__removed");
                });
              }
            }}
          ></i>

          <div className="current__table">
            <p>{currentTable?.data?.name}</p>
          </div>
          <InputGroup className="mb-3 search__form">
            <FormControl
              placeholder={
                currentTable?.data?.name
                  ? `Search ${currentTable?.data?.name}`
                  : ""
              }
              aria-label={
                currentTable?.data?.name
                  ? `Search ${currentTable?.data?.name}`
                  : ""
              }
              aria-describedby="basic-addon2"
              value={search}
              onChange={handleSearch}
            />
            <InputGroup.Append>
              <i className="fa fa-search search__icon"></i>
            </InputGroup.Append>
          </InputGroup>
          <div>
            <Link to="/" className="admin__exit">
              Exit Admin
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentTable: state.admin.currentTable,
});

export default connect(mapStateToProps, {})(AdminNavbar);
