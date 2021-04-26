import React from "react";
import {useState} from "react";

const Pagination = ({count, pageSize, fetchMethod}) => {
  const [pageNo, setPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(count / pageSize);
  const styles = {
    pageCounter: {
      backgroundColor: "#ffffff",
      border: "1px solid rgba(128, 128, 128, 0.25)",
      boxSizing: "border-box",
      borderRadius: 4,
      padding: "2px 7px",
      color: "#5f738c",
      userSelect: "none",
    },
    paginationContainer: {
      marginTop: 20,
      width: "100%",
      textAlign: "right",
    },
  };

  let pageArray = [];
  var i;
  for (i = pageNo; i < pageNo + 5; i++) {
    if (i <= totalPages) {
      pageArray.push(i);
    }
  }
  const pages = pageArray.map((value, key) => {
    return (
      <div
        key={key}
        className={`d-inline m-2`}
        style={{
          cursor: "pointer",
          display: "inline",
          ...styles.pageCounter,
          backgroundColor: currentPage === value ? "#333996" : "transparent",
          color: currentPage === value && "#ffffff",
          margin: 10,
        }}
        onClick={() => {
          setCurrentPage(value);
          fetchMethod(value, pageSize);
        }}
      >
        {value}
      </div>
    );
  });
  const lastPage = (
    <div
      className={`d-inline m-2`}
      style={{
        cursor: "pointer",
        display: "inline",
        margin: 10,
        ...styles.pageCounter,
      }}
      onClick={() => {
        setCurrentPage(totalPages);
        setPageNo(totalPages - (totalPages % 5) + 1);
        fetchMethod(totalPages, pageSize);
      }}
    >
      Last
    </div>
  );

  const prevPages =
    pageArray[0] > 1 ? (
      <div
        className={`d-inline m-2`}
        style={{
          cursor: "pointer",
          display: "inline",
          margin: 10,
          ...styles.pageCounter,
        }}
        onClick={() => {
          const i = pageArray[0] - 5 < 1 ? 0 : pageArray[0] - 5;
          setPageNo(i);
          setCurrentPage(i);
          fetchMethod(i, pageSize);
        }}
      >
        {" "}
        {"<"}{" "}
      </div>
    ) : (
      ""
    );

  const nextPages =
    pageArray[4] + 1 <= totalPages ? (
      <div
        className={`d-inline m-2`}
        style={{
          cursor: "pointer",
          display: "inline",
          margin: 10,
          ...styles.pageCounter,
        }}
        onClick={() => {
          const current = pageArray[4] + 1;
          setPageNo(current);
          setCurrentPage(current);
          fetchMethod(current, pageSize);
        }}
      >
        {" "}
        >{" "}
      </div>
    ) : (
      ""
    );

  return (
  
    <div className={`text-right`} style={styles.paginationContainer}>
      {prevPages}
      {pages}
      {nextPages}
      {!!count && lastPage}
    </div>
  );
};

export default Pagination;
