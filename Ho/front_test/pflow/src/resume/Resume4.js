// src/resume/Resume4.js
import React, { useState } from "react";
import "./Resume.css";
import SideBar from "../components/SideBar";


const Resume4 = () => {

  const [profileInfo, setprofileInfo] = useState({
    title: "",
    intro: "",
  });

  const profileInfoChange = (e) => {
    const { name, value } = e.target;
    setprofileInfo({
      ...profileInfo,
      [name]: value
    });
    console.log(setprofileInfo);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터를 세션 스토리지에 저장
    sessionStorage.setItem('profileInfo', JSON.stringify(profileInfo));
    // 콘솔에서 데이터 확인하기
   //console.log(JSON.stringify(profileInfo));
  }

  const handleDelete = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('profileInfo');
  }

  return (
    <div className="container">
      <SideBar />
      <form className="Form" onSubmit={handleSubmit}>
      <h1 className="h1">사용자님의 소개글을 작성해주세요!</h1>
      <div className="area">
      <div className="recommend-area">문구추천 영역</div> 
      <div className="write-area">
      <label>제목</label>
      <input type="title" name="title" value={profileInfo.title} onChange={profileInfoChange}/>
      <label>자기소개서</label>
      <textarea type="text" name="intro" value={profileInfo.intro} onChange={profileInfoChange}/>
      </div>
      </div>
      <button className="submit" type="submit" >저장하기</button>
      <button className="delete" type="delete" onClick={handleDelete}>초기화</button>
      </form>
    </div>
  );
};

export default Resume4;
