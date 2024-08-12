import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Resume.css";
import SideBar from "../components/SideBar";

const Resume2 = () => {
  //입력값을 저장할 상태 
  const navigate = useNavigate(); // navigate 함수를 가져옴
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    address: "",
    image: null,
  });

  
  const BasicInfoChange = (e) => {
  const { name, value, files } = e.target;
  
      if (name === "image" && files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBasicInfo({
            ...basicInfo,
            [name]: reader.result
          });
        };
        reader.readAsDataURL(files[0]);
      } else {
        setBasicInfo({
          ...basicInfo,
          [name]: value
        });
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터를 세션 스토리지에 저장
    sessionStorage.setItem('basicInfo', JSON.stringify(basicInfo));
    // 콘솔에서 받은 데이터 확인
   console.log(JSON.stringify(basicInfo));
    // 다음 페이지로 이동
    navigate('/resume/Resume3');

  }

  const handleDelete = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('basicInfo');
  }

  // 페이지 폼 만들기
  return (
    <div className="container" onSubmit={handleSubmit}>
      <SideBar />
      <form className="Form" >
        <h1 className="h1">사용자님의 기본 정보를 입력해주세요!</h1>
        <h3 className="h3-1">기본 정보</h3>
        
        <table className="tableForm">
          <tbody>
            <tr>
              <th>사진 첨부</th>
              <td>
                <input className="file" id="file" type="file" name="image" accept="image/*" value={basicInfo.photo} onChange={BasicInfoChange} />
                <label htmlFor="file" className="file-btn">+</label>
                {basicInfo.image && <img src={basicInfo.image} style={{ maxWidth: '100px', maxHeigh: '100px', marginLeft: '50px'}} />}                
                </td>
              <th>이름:</th>
              <td><input type="text" name="name" value={basicInfo.name} onChange={BasicInfoChange}/></td>
            </tr>
            <tr>
              <th>이메일 주소:</th>
              <td><input type="email" name="email" value={basicInfo.email} onChange={BasicInfoChange}/></td>
              <th>나이:</th>
              <td><input type="text" name="age" value={basicInfo.age} onChange={BasicInfoChange}/></td>
            </tr>
            <tr>
              <th>연락처:</th>
              <td><input type="tel" name="contact" value={basicInfo.contact} onChange={BasicInfoChange} placeholder="번호만 입력하세요."/></td>
              <th>거주지:</th>
              <td><input type="text" name="address" value={basicInfo.address} onChange={BasicInfoChange}/></td>
            </tr>
          </tbody>
        </table>
        <button className="submit" type="submit">저장하기</button>
        <button className="delete" type="delete" onClick={handleDelete}>초기화</button>
      </form>
    </div>
  );
}

export default Resume2;