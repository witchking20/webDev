// src/resume/Resume3.js
import React, { useState } from "react";
import "./Resume.css";
import SideBar from "../components/SideBar";


const Resume3 = () => {

  const [techInfo, setTechInfo] = useState({
    univ: "",
    major: "",
    graduate: "",
    year: "",
    career: "",
    atitle: "",
    sdate: "",
    edate: "",
    skill: "",
  });


  const techInfoChange = (e) => {
    const { name, value } = e.target;
    setTechInfo({
      ...techInfo,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터를 세션 스토리지에 저장
    sessionStorage.setItem('techInfo', JSON.stringify(techInfo));
     // 콘솔에서 데이터 확인하기
   //console.log(JSON.stringify(techInfo));
  }

  const handleDelete = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('techInfo');
  }

  return (
    <div className="container">
      <SideBar />
     <form className="Form" onSubmit={handleSubmit}>
     <h1 className="h1">사용자님의 경력 정보를 입력해주세요!</h1>
     <h3 className="h3-1">학력사항</h3>
     <table className="tableForm">
      <tr>
        <th>학교명</th>
        <td><input type="text" name="univ" value={techInfo.univ} onChange={techInfoChange}/></td>
        <th>전공</th>
        <td><input type="text" name="major" value={techInfo.major} onChange={techInfoChange}/></td>
      </tr>
      <tr>
      <th>수료여부</th>
      <td>
        <select name="graduate" value={techInfo.graduate} onChange={techInfoChange}>
            <option value="졸업">수료</option>   
            <option value="미수료">미수료</option></select>
            </td>
        <th>졸업연도</th>
        <td><input type="date" name="year" value={techInfo.year} onChange={techInfoChange}/></td>
      </tr>
     </table>
     <h3 className="h3-2">경력  사항</h3>
     <table className="tableForm2">
      <tr>
        <th>회사명</th>
        <td><input type="text" name="career" value={techInfo.career} onChange={techInfoChange}/></td>
        <th>직함</th>
        <td><input type="text" name="atitle" value={techInfo.atitle} onChange={techInfoChange}/></td>
      </tr>
      <tr>
      <th>입사일</th>
        <td><input type="date" name="sdate" value={techInfo.sdate} onChange={techInfoChange}/></td>
        <th>퇴사일</th>
        <td><input type="date" name="edate" value={techInfo.edate} onChange={techInfoChange}/></td>
      </tr>
      <tr>
        <th>기술태그</th>
        <td><input type="text" name="skill" value={techInfo.skill} onChange={techInfoChange}/></td>
      </tr>
     </table>
     <button className="submit" type="submit" >저장하기</button>
     <button className="delete" type="delete" onClick={handleDelete}>초기화</button>
     </form>
    </div>
  );
};

export default Resume3;
