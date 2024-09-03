import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { useTheme } from '../context/ThemeContext'; // useTheme 훅을 사용
import SideBar from "../components/SideBar";
import "./Resume.css";

const Resume5 = () => {
  const { theme } = useTheme();
  const [basicInfo, setBasicInfo] = useState(null);
  const [techInfo, setTechInfo] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
// 컴포넌트가 마운트되거나 업데이트될 때 실행하는 useEffect 빈배열[]를 사용하여 처음 렌더링 될 때만 사용
  useEffect(() => {
    // 세션 스토리지에서 데이터를 가져옴
    const storedBasicInfo = JSON.parse(sessionStorage.getItem('basicInfo')); 
    const storedTechInfo = JSON.parse(sessionStorage.getItem('techInfo')); 
    const storedProfileInfo = JSON.parse(sessionStorage.getItem('profileInfo')); 
    // 세션 스토리지에서 가져온데이터를 JSON.parse통해 "storedInfo"변수에 저장
    if (storedBasicInfo, storedTechInfo) {
      setBasicInfo(storedBasicInfo);
      setTechInfo(storedTechInfo);
      setProfileInfo(storedProfileInfo);
    }
  }, []);
  // export 로직 - 출력할 부분
  const componentRef = useRef(); 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "파일 다운로드 시 저장되는 이름 작성" ,
    onAfterPrint: () => alert("파일이 다운로드 되었습니다.")// 취소했는데도 왜 뜨지..? 
  });

  return (
    <div className="container">
      <SideBar />
      <div className='form1-5'>
      <h1>수고하셨습니다!</h1>
      <h2>완성된 이력서를 출력해보세요 : )</h2>
      <button className="Export-btn" onClick={handlePrint}>export</button>
      <div id="Info" > 
        {basicInfo ? (
           <div className="resume-container"  ref={componentRef}>
            <div className="resume-header" >
              <div className="resume-header1">
              {basicInfo.image && (
                      <img src={basicInfo.image} alt="Profile" style={{ maxWidth: '50%', height: 'auto' }} />
                    )}
                    <h1>{basicInfo.name}</h1>
                    <p>{basicInfo.age}세</p>
               </div>  
               <div className="resume-header2">
            <h2>연락처</h2>
            <p>이메일: {basicInfo.email}</p>
            <p>전화번호: {basicInfo.contact}</p>
            <p>주소: {basicInfo.address}</p>
            </div>
            </div>
            
            <div className="resume-section">
            <h3 style={{ borderTop: `5px solid ${theme}` }}>학력</h3>
            <table className="resume-table">
                <tr>
                    <th style={{ border: `2px solid ${theme}` }}>학교</th>
                    <th style={{ border: `2px solid ${theme}` }}>전공</th>
                    <th style={{ border: `2px solid ${theme}` }}>{techInfo.graduate}</th>
                </tr>
                <tr>
                    <td>{techInfo.univ}</td>
                    <td>{techInfo.major}</td>
                    <td>{techInfo.year}</td>
                </tr>
            </table>
        </div>

        <div className="resume-section">
            <h3 style={{ borderTop: `5px solid ${theme}` }}>경력1</h3>
            <table className="resume-table">
                <tr>
                    <th style={{ border: `2px solid ${theme}` }}>회사명</th>
                    <th style={{ border: `2px solid ${theme}` }}>직함</th>
                    <th style={{ border: `2px solid ${theme}` }}>입사일</th>
                    <th style={{ border: `2px solid ${theme}` }}>퇴사일</th>
                    <th style={{ border: `2px solid ${theme}` }}>보유기술</th>
                </tr>
                <tr>  
                    <td>{techInfo.career}</td>
                    <td>{techInfo.atitle}</td>
                    <td>{techInfo.sdate}</td>
                    <td>{techInfo.edate}</td>
                    <td>{basicInfo.skill}</td>
                </tr>
            </table>
            <h3>경력2</h3>
            <table className="resume-table">
            <tr>
                    <th style={{ border: `2px solid ${theme}` }}>회사명</th>
                    <th style={{ border: `2px solid ${theme}` }}>직함</th>
                    <th style={{ border: `2px solid ${theme}` }}>입사일</th>
                    <th style={{ border: `2px solid ${theme}` }}>퇴사일</th>
                </tr>
                <tr>
                    <td>소프트웨어 엔지니어</td>
                    <td>OOO회사</td>
                    <td>0000년 00월 </td>
                    <td>0000년 00월 </td>
                </tr>
            </table>
            <h3>경력3</h3>
            <table className="resume-table">
            <tr>
                    <th style={{ border: `2px solid ${theme}` }}>회사명</th>
                    <th style={{ border: `2px solid ${theme}` }}>직함</th>
                    <th style={{ border: `2px solid ${theme}` }}>입사일</th>
                    <th style={{ border: `2px solid ${theme}` }}>퇴사일</th>
                </tr>
                <tr>
                    <td>소프트웨어 엔지니어</td>
                    <td>OOO회사</td>
                    <td>0000년 00월 </td>
                    <td>0000년 00월 </td>                    
                </tr>
            </table>
                <table>
                <tr>
                  <th style={{ borderTop: `3px solid ${theme}` }}>제목</th>
                </tr>
                <tr>
                  <td>
                  {profileInfo.title}
                  </td>
                </tr>
                <tr>
                  <th className='intro' >본문</th>
                </tr>
                <tr>
                  <td>
                  {profileInfo.intro}
                  </td>
                </tr>
                </table>
        </div>
          </div>

        ) : (
          <p>기본 정보가 없습니다.</p>
        )}
      </div>
      </div>
      </div>
  );
};

export default Resume5;



//{basicInfo ? (<><p>거주지: {basicInfo.address}</p> </>) :  (<p>No data found</p>)}