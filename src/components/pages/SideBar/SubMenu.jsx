import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "../SideBar/side-menu.styles.scss";
import history from '../../../router/browserrouter';
import { withRouter } from 'react-router-dom';
export const SubMenu = (props) => {
  console.log(props)
  const [buttonIdsArray, setIds] = useState([]);
  const [path, setPath] = useState('')
  const isMounted = useRef(false);
  for (var i = 0; i < props.length; i++) {
    setIds(subNav.id);
  }

  const showSubNav = (id) => {
    let i = 0;
    for (i = 0; i < buttonIdsArray.length; i++) {
      if (buttonIdsArray[i] !== id) {
        var el = document.getElementById(buttonIdsArray[i]);
        el.style.maxHeight = "0px";
      }
    }
    el = document.getElementById(id);
    if (el.style.maxHeight !== "0px") {
      el.style.maxHeight = "0px";
    } else {
      el.style.maxHeight = `${content.current.scrollHeight}px`;
    }
  };


  const content = useRef(null);
  const { title, subNav, icon, id } = props;

  useEffect(() => {
    if (+localStorage.getItem("current-nav") === id) {
      showSubNav(id);


    }
  }, []);
  return (
    <div>
      <div
        className="menu-bar"
        style={{
          display: "flex",
          fontFamily: "Muli",
          cursor: "pointer",
          fontSize: "0.9rem",
          marginTop: "0.4rem",
          padding: "8px",
        }}
        onClick={(e) => {
          e.preventDefault();
          showSubNav(id);
          localStorage.setItem("current-nav", id);
        }}
      >
        <span style={{ color: 'rgb(164, 166, 179)' }}>{icon}</span>
        <span style={{ display: "inline-block", marginLeft: "3px", color: 'rgb(164, 166, 179)' }}>
          {title}
        </span>
      </div>
      <div
        id={id}
        ref={content}
        style={{
          maxHeight: "0px",
          overflowX: "hidden",
          transition: `max-height 1.0s`,
        }}
      >
        {subNav.map((item, index) => {
          return (
            <Link  className={localStorage.getItem("currentPath") === item.path ? 'side-bar-link active-yo' : 'side-bar-link'} to={item.path} key={item.title}>
              <span>{item.icon}</span>
              <span className="side-bar-label">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default withRouter(SubMenu);
