import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import studentmenu from "../../data/studentsidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const StudentSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };


  return (
    <div className="layout">
      <div className={`sidebar ${!isOpen && 'active-sidebar'}`} style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <FaHome
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {studentmenu.map((item, index) => {
            return <SidebarItem key={index} item={item} isOpen={isOpen} />;
          })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default StudentSidebar;
