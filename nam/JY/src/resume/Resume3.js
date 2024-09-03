import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Resume.css";
import SideBar from "../components/SideBar";

const Resume3 = () => {
  const navigate = useNavigate();
  const [techInfo, setTechInfo] = useState({
    school_name: "", // 변경: 필드 이름을 'school_name'으로 변경
    major: "",
    completion: "", // 변경: 필드 이름을 'completion'으로 변경
    graduation_year: "", // 변경: 필드 이름을 'graduation_year'으로 변경
    careers: [],
  });

  useEffect(() => {
    const basicInfo = JSON.parse(sessionStorage.getItem('basicInfo'));
    if (basicInfo) {
      setTechInfo(prev => ({
        ...prev,
        name: basicInfo.name || "",
        email: basicInfo.email || "",
        age: basicInfo.age || "",
        contact: basicInfo.contact || "",
        address1: basicInfo.address1 || "",
        address2: basicInfo.address2 || "",
        skill: basicInfo.skill || "",
        school_name: basicInfo.school_name || "",
        major: basicInfo.major || "",
        completion: basicInfo.completion || "",
        graduation_year: basicInfo.graduation_year || "",
        careers: prev.careers // 경력 정보는 그대로 유지
      }));
    }
  }, []);

  const addCareer = () => {
    setTechInfo(prev => ({
      ...prev,
      careers: [
        ...prev.careers,
        {
          company_name: "",
          job_title: "",
          start_date: "",
          end_date: ""
        }
      ]
    }));
  };

  const handleCareerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCareers = techInfo.careers.map((career, i) =>
      i === index ? { ...career, [name]: value } : career
    );
    setTechInfo({
      ...techInfo,
      careers: updatedCareers,
    });
  };

  const techInfoChange = (e) => {
    const { name, value } = e.target;
    setTechInfo({
      ...techInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/saveStudyMemo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(techInfo),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      alert("모든 정보가 저장되었습니다.");

      sessionStorage.removeItem('basicInfo');
      setTechInfo({
        school_name: "", // 변경: 필드 이름을 'school_name'으로 변경
        major: "",
        completion: "", // 변경: 필드 이름을 'completion'으로 변경
        graduation_year: "", // 변경: 필드 이름을 'graduation_year'으로 변경
        careers: [],
      });
       
    } catch (error) {
      console.error('Error:', error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('basicInfo');
    setTechInfo({
      school_name: "", // 변경: 필드 이름을 'school_name'으로 변경
      major: "",
      completion: "", // 변경: 필드 이름을 'completion'으로 변경
      graduation_year: "", // 변경: 필드 이름을 'graduation_year'으로 변경
      careers: [],
    });
  };

  return (
    <div className="container">
      <SideBar />
      <form className="Form" onSubmit={handleSubmit}>
        <h1 className="h1">사용자님의 경력 정보를 입력해주세요!</h1>
        <h3 className="h3-1">학력사항</h3>
        <table className="tableForm">
          <tbody>
            <tr>
              <th>학교명</th>
              <td>
                <input
                  type="text"
                  name="school_name" // 변경: 'school_name'으로 수정
                  value={techInfo.school_name} // 변경: 'school_name'으로 수정
                  onChange={techInfoChange}
                />
              </td>
              <th>전공</th>
              <td>
                <input
                  type="text"
                  name="major"
                  value={techInfo.major}
                  onChange={techInfoChange}
                />
              </td>
            </tr>
            <tr>
              <th>수료여부</th>
              <td>
                <select
                  name="completion" // 변경: 'completion'으로 수정
                  value={techInfo.completion} // 변경: 'completion'으로 수정
                  onChange={techInfoChange}
                >
                  <option value="졸업">수료</option>
                  <option value="미수료">미수료</option>
                </select>
              </td>
              <th>졸업연도</th>
              <td>
                <input
                  type="date"
                  name="graduation_year" // 변경: 'graduation_year'으로 수정
                  value={techInfo.graduation_year} // 변경: 'graduation_year'으로 수정
                  onChange={techInfoChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="h3-2">경력 사항</h3>
        <button type="button" onClick={addCareer}>
          Add Career
        </button>
        {techInfo.careers.map((career, index) => (
          <table key={index} className="tableForm2">
            <tbody>
              <tr>
                <th>회사명</th>
                <td>
                  <input
                    type="text"
                    name="company_name"
                    value={career.company_name}
                    onChange={(e) => handleCareerChange(index, e)}
                  />
                </td>
                <th>직함</th>
                <td>
                  <input
                    type="text"
                    name="job_title"
                    value={career.job_title}
                    onChange={(e) => handleCareerChange(index, e)}
                  />
                </td>
              </tr>
              <tr>
                <th>입사일</th>
                <td>
                  <input
                    type="date"
                    name="start_date"
                    value={career.start_date}
                    onChange={(e) => handleCareerChange(index, e)}
                  />
                </td>
                <th>퇴사일</th>
                <td>
                  <input
                    type="date"
                    name="end_date"
                    value={career.end_date}
                    onChange={(e) => handleCareerChange(index, e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        ))}
        <button className="submit" type="submit">
          저장하기
        </button>
        <button className="delete" type="button" onClick={handleDelete}>
          초기화
        </button>
      </form>
    </div>
  );
};

export default Resume3;
