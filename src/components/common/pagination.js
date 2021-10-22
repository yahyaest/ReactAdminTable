import React, { useState } from "react";
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Paginate = (props) => {
  Paginate.propTypes = {
    itemsCounts: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

  const { itemsCounts, pageSize, currentPage, onPageChange, handlePageSize } =
    props;
  const pageSizeOptions = [5, 10, 20, 50];
  const pagesCount = Math.ceil(itemsCounts / pageSize);

  const [count, setCount] = useState(0);

  const activePage =
    currentPage > pagesCount || currentPage < 1 ? 1 : currentPage;
  let items = [];

  const handleGoToPagePopUp = async () => {
    const popover = document.getElementById("popover-basic");
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");

    if (popover && first) first.click();

    if (popover && second) {
      second.click();
    }
    if (popover && third) third.click();
  };

  const handleCount = (count) => {
    setCount(parseInt(count));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="text-dark">
        {" "}
        Go to Page
      </Popover.Title>
      <Popover.Content>
        <div className="pagination__extension">
          <input
            type="number"
            step="1"
            min={1}
            max={pagesCount}
            defaultValue={activePage}
            onChange={(e) => handleCount(e.currentTarget.value)}
          />
          <Button
            variant="dark"
            size="sm"
            onClick={() => {
              if (count < 1) onPageChange(1);
              else if (count > pagesCount) onPageChange(pagesCount);
              else onPageChange(count);

              handleGoToPagePopUp();
            }}
          >
            Go
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );

  if (pagesCount === 1)
    return (
      <div className="pagination__bar">
        <p>Per page: </p>
        <select
          name="pageSize"
          id="page-size"
          defaultValue={pageSize}
          onChange={(e) => handlePageSize(e.currentTarget.value)}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );

  if (pagesCount < 6) {
    items = [];

    for (let number = 1; number <= pagesCount; number++) {
      items.push(
        <Pagination.Item
          key={number}
          className={number === activePage ? "page-item active" : "page-item"}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
  } else {
    // Active Page = 1 || 2 || 3
    if (0 < activePage && activePage < 4) {
      items = [];

      if (activePage !== 1) {
        items.push(
          <Pagination.Item
            key={"prev"}
            className={"page-item start_end_item"}
            style={{ margin: "0 5px" }}
            onClick={() => {
              onPageChange(activePage - 1);
              handleGoToPagePopUp();
            }}
          >
            PREV
          </Pagination.Item>
        );
      }
      for (let number = 1; number <= 3; number++) {
        items.push(
          <Pagination.Item
            key={number}
            className={number === activePage ? "page-item active" : "page-item"}
            onClick={() => {
              onPageChange(number);
              handleGoToPagePopUp();
            }}
          >
            {number}
          </Pagination.Item>
        );
      }

      items.push(
        <OverlayTrigger
          key={"..."}
          trigger="click"
          placement="bottom"
          overlay={popover}
        >
          <Pagination.Item className={"page-item"} id={"first"}>
            ...
          </Pagination.Item>
        </OverlayTrigger>
      );

      items.push(
        <Pagination.Item
          key={pagesCount}
          className={
            pagesCount === activePage ? "page-item active" : "page-item"
          }
          onClick={() => {
            onPageChange(pagesCount);
            handleGoToPagePopUp();
          }}
        >
          {pagesCount}
        </Pagination.Item>
      );

      if (activePage !== pagesCount) {
        items.push(
          <Pagination.Item
            key={"next"}
            className={"page-item start_end_item"}
            style={{ margin: "0 5px" }}
            onClick={() => {
              onPageChange(activePage + 1);
              handleGoToPagePopUp();
            }}
          >
            NEXT
          </Pagination.Item>
        );
      }
    }

    // 3 < Active Page < pagesCount - 2

    if (3 < activePage && activePage < pagesCount - 2) {
      items = [];

      items.push(
        <Pagination.Item
          key={"prev"}
          className={"page-item start_end_item"}
          style={{ margin: "0 5px" }}
          onClick={() => {
            onPageChange(activePage - 1);
            handleGoToPagePopUp();
          }}
        >
          PREV
        </Pagination.Item>
      );

      items.push(
        <Pagination.Item
          key={"1"}
          className={activePage === 1 ? "page-item active" : "page-item"}
          onClick={() => {
            onPageChange(1);
            handleGoToPagePopUp();
          }}
        >
          1
        </Pagination.Item>
      );

      items.push(
        <Pagination.Item
          className={"page-item"}
          onClick={() => {
            handleGoToPagePopUp();
          }}
        >
          ...
        </Pagination.Item>
      );

      for (let number = activePage - 1; number <= activePage + 1; number++) {
        items.push(
          <Pagination.Item
            key={number}
            className={number === activePage ? "page-item active" : "page-item"}
            onClick={() => {
              onPageChange(number);
              handleGoToPagePopUp();
            }}
          >
            {number}
          </Pagination.Item>
        );
      }

      items.push(
        <OverlayTrigger
          key={"...2"}
          trigger="click"
          placement="bottom"
          overlay={popover}
        >
          <Pagination.Item
            className={"page-item"}
            id={"second"}
            onClick={() => {
              handleGoToPagePopUp();
            }}
          >
            ...
          </Pagination.Item>
        </OverlayTrigger>
      );

      items.push(
        <Pagination.Item
          key={pagesCount}
          className={
            pagesCount === activePage ? "page-item active" : "page-item"
          }
          onClick={(e) => {
            onPageChange(pagesCount);
            handleGoToPagePopUp(e.currentTarget.id);
          }}
        >
          {pagesCount}
        </Pagination.Item>
      );

      if (activePage !== pagesCount)
        items.push(
          <Pagination.Item
            key={"next"}
            className={"page-item start_end_item"}
            style={{ margin: "0 5px" }}
            onClick={() => {
              onPageChange(activePage + 1);
              handleGoToPagePopUp();
            }}
          >
            NEXT
          </Pagination.Item>
        );
    }

    //  pagesCount - 3 < Active Page

    if (pagesCount - 3 < activePage) {
      items = [];

      items.push(
        <Pagination.Item
          key={"prev"}
          className={"page-item start_end_item"}
          style={{ margin: "0 5px" }}
          onClick={() => {
            onPageChange(activePage - 1);
            handleGoToPagePopUp();
          }}
        >
          PREV
        </Pagination.Item>
      );

      items.push(
        <Pagination.Item
          key={"1"}
          className={activePage === 1 ? "page-item active" : "page-item"}
          onClick={() => {
            onPageChange(1);
            handleGoToPagePopUp();
          }}
        >
          1
        </Pagination.Item>
      );

      items.push(
        <OverlayTrigger
          key={"..."}
          trigger="click"
          placement="bottom"
          overlay={popover}
        >
          <Pagination.Item className={"page-item"} id={"third"}>
            ...
          </Pagination.Item>
        </OverlayTrigger>
      );

      for (let number = pagesCount - 2; number <= pagesCount; number++) {
        items.push(
          <Pagination.Item
            key={number}
            className={number === activePage ? "page-item active" : "page-item"}
            onClick={() => {
              onPageChange(number);
              handleGoToPagePopUp();
            }}
          >
            {number}
          </Pagination.Item>
        );
      }

      if (activePage !== pagesCount)
        items.push(
          <Pagination.Item
            key={"next"}
            className={"page-item start_end_item"}
            style={{ margin: "0 5px" }}
            onClick={() => {
              onPageChange(activePage + 1);
              handleGoToPagePopUp();
            }}
          >
            NEXT
          </Pagination.Item>
        );
    }
  }

  return (
    <div>
      <div className="pagination__bar">
        <p>Per page: </p>
        <select
          name="pageSize"
          id="page-size"
          defaultValue={pageSize}
          onChange={(e) => handlePageSize(e.currentTarget.value)}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
};

export default Paginate;
