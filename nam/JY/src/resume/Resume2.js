import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Resume.css";
import SideBar from "../components/SideBar";

const Resume2 = () => {
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    age: "",
    contact: "",
    email: "",
    address1: "",
    address2: "",
    skill: "",
    image: null,
  });

  const BasicInfoChange = (e) => {
    const { name, value, files } = e.target; // 이벤트 객체에서 name, value, files 가져오기

    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBasicInfo({
          ...basicInfo,
          image: reader.result, // 파일의 데이터를 읽어와서 image 상태 업데이트
        });
      };
      reader.readAsDataURL(files[0]); // 파일을 Data URL로 변환
    } else {
      setBasicInfo({
        ...basicInfo,
        [name]: value // 일반적인 입력 필드 처리
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('basicInfo', JSON.stringify(basicInfo));
    navigate('/resume/Resume3');
  };

  const handleDelete = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('basicInfo');
    setBasicInfo({
      name: "",
      age: "",
      contact: "",
      email: "",
      address1: "",
      address2: "",
      skill: "",
      image: null,
    });
  };

  return (
    <div className="container">
      <SideBar />
      <form className="Form" onSubmit={handleSubmit}>
        <h1 className="h1">사용자님의 기본 정보를 입력해주세요!</h1>
        {basicInfo.image && <img src={basicInfo.image} style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '50px' }} />}
        <table className="tableForm">
          <tbody>
            <input className="file" id="file" type="file" name="image" accept="image/*" onChange={BasicInfoChange} />
            <label htmlFor="file" className="file-btn">+</label>
            <tr>
              <th>사진 첨부</th>
              <td><p className="warn">최대 300KB까지 첨부 가능합니다.</p></td>
              <th>이름:</th>
              <td><input type="text" name="name" value={basicInfo.name} onChange={BasicInfoChange} /></td>
            </tr>
            <tr>
              <th>이메일:</th>
              <td><input type="email" name="email" value={basicInfo.email} onChange={BasicInfoChange} /></td>
              <th>나이:</th>
              <td><input type="text" name="age" value={basicInfo.age} onChange={BasicInfoChange} /></td>
            </tr>
            <tr>
              <th>연락처:</th>
              <td><input type="tel" name="contact" value={basicInfo.contact} onChange={BasicInfoChange} placeholder="번호만 입력하세요." /></td>
              <th>주소1:</th>
              <td><input type="text" name="address1" value={basicInfo.address1} onChange={BasicInfoChange} placeholder="도/시/구 입력" /></td>
            </tr>
            <tr>
              <th>기술태그</th>
              <td><input type="text" name="skill" value={basicInfo.skill} onChange={BasicInfoChange} /></td>
              <th>주소2:</th>
              <td><input type="text" name="address2" value={basicInfo.address2} onChange={BasicInfoChange} placeholder="상세주소 입력" /></td>
            </tr>
          </tbody>
        </table>
        <button className="submit" type="submit">저장하기</button>
        <button className="delete" type="button" onClick={handleDelete}>초기화</button>
      </form>
    </div>
  );
};

export default Resume2;
