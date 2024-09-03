import React from "react";
import { useLocation } from 'react-router-dom';
import ProgressBar from "../components/ProgressBar";

const SideBar = () => {
  const location = useLocation();

  

  return (
    <nav className="SideBar">
      <ul className="Step-Section">
        <li className="Step1">
        <span className="Text1"
  style={{
    color: location.pathname === '/resume/Resume1' ? 'yellow' : 'white',
    fontSize: location.pathname === '/resume/Resume1' ? '20pt' : '16pt'
  }}
>
  테마 선택
</span>
        </li>
        <li className="Step">
          <span className="Text2" style={{
    color: location.pathname === '/resume/Resume2' ? 'yellow' : 'white',
    fontSize: location.pathname === '/resume/Resume2' ? '20pt' : '16pt'
  }}>기본정보</span>
        </li>
        <li className="Step">
          <span className="Text3" style={{
    color: location.pathname === '/resume/Resume3' ? 'yellow' : 'white',
    fontSize: location.pathname === '/resume/Resume3' ? '20pt' : '16pt'
  }}>기술정보</span>
        </li>
        <li className="Step">
          <span className="Text4" style={{
    color: location.pathname === '/resume/Resume4' ? 'yellow' : 'white',
    fontSize: location.pathname === '/resume/Resume4' ? '20pt' : '16pt'
  }}>자기소개</span>
        </li>
        <li className="Step">
          <span className="Text5" style={{
    color: location.pathname === '/resume/Resume5' ? 'yellow' : 'white',
    fontSize: location.pathname === '/resume/Resume5' ? '20pt' : '16pt'
  }}>Finalize</span>
        </li>
      </ul>
      <ProgressBar />
    </nav>
  );
};

export default SideBar;
