// src/resume/Resume1.js
import React from "react";
import "./Resume.css";
import { useTheme } from '../context/ThemeContext'; // useTheme 훅을 사용
import SideBar from "../components/SideBar";



const Resume1 = () => {
    const { theme, changeTheme } = useTheme();

    const handleChangeTheme = (newColor) => {
        changeTheme(newColor);
    };

    return (
        <div className="container">
             <SideBar />
            <div className="form1-5">
<h1>환영합니다 이력서 작성을 도와드릴게요!</h1>
<h2>이력서 테마를 선택해 주세요</h2>
       
            <div className="color-btn">
                <button 
                    className="blue-sample" 
                    onClick={() => handleChangeTheme('#0554f2')}>
                    Blue
                </button>
                <button 
                    className="noncolor-sample" 
                    onClick={() => handleChangeTheme('#818181')}>
                    default
                </button>
            </div>
            <div className="resume-container">
                <div className="resume-header">
                    <div className="resume-header1">
                    <img src="/image.png" alt="증명사진 아이콘" />

                        <h1>홍길동</h1>
                        <p>1998-05-05</p>
                    </div>  
                    <div className="resume-header2">
                        <h2>연락처</h2>
                        <p>이메일: example00@.com</p>
                        <p>전화번호: 010-0000-0000</p>
                        <p>주소: OO시 OO구 OO동</p>
                    </div>
                </div>
                
                <div className="resume-section">
                    <h2 style={{ borderTop: `5px solid ${theme}` }}>학력</h2>
                    <table className="resume-table">
                        <thead>
                            <tr>
                                <th style={{ border: `2px solid ${theme}` }}>학교</th>
                                <th style={{ border: `2px solid ${theme}` }}>전공</th>
                                <th style={{ border: `2px solid ${theme}` }}>학사졸업</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>OO대학교</td>
                                <td>OO전공</td>
                                <td>0000-00-00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="resume-section">
                    <h2 style={{ borderTop: `3px solid ${theme}` }}>경력1</h2>
                    <table className="resume-table">
                        <thead>
                            <tr>
                                <th style={{ border: `2px solid ${theme}` }}>회사명</th>
                                <th style={{ border: `2px solid ${theme}` }}>직함</th>
                                <th style={{ border: `2px solid ${theme}` }}>입사일</th>
                                <th style={{ border: `2px solid ${theme}` }}>퇴사일</th>
                                <th style={{ border: `2px solid ${theme}` }}>보유기술</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>OOO회사</td>
                                <td>소프트웨어 엔지니어</td>
                                <td>0000년 00월</td>
                                <td>0000년 00월</td>
                                <td>GPT</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 style={{ borderTop: `2px solid ${theme}` }}>경력2</h2>
                    <table className="resume-table">
                        <thead>
                        <tr>
                                <th style={{ border: `2px solid ${theme}` }}>회사명</th>
                                <th style={{ border: `2px solid ${theme}` }}>직함</th>
                                <th style={{ border: `2px solid ${theme}` }}>입사일</th>
                                <th style={{ border: `2px solid ${theme}` }}>퇴사일</th>
                                <th style={{ border: `2px solid ${theme}` }}>보유기술</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>소프트웨어 엔지니어</td>
                                <td>OOO회사</td>
                                <td>0000년 00월</td>
                                <td>0000년 00월</td>
                                <td>파이썬</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 style={{ borderTop: `2px solid ${theme}` }}>경력3</h2>
                    <table className="resume-table">
                        <thead>
                        <tr>
                                <th style={{ border: `2px solid ${theme}` }}>회사명</th>
                                <th style={{ border: `2px solid ${theme}` }}>직함</th>
                                <th style={{ border: `2px solid ${theme}` }}>입사일</th>
                                <th style={{ border: `2px solid ${theme}` }}>퇴사일</th>
                                <th style={{ border: `2px solid ${theme}` }}>보유기술</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>소프트웨어 엔지니어</td>
                                <td>OOO회사</td>
                                <td>0000년 00월</td>
                                <td>0000년 00월</td>
                                <td>파이썬</td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ borderTop: `3px solid ${theme}` }}>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                            <tr>
                                <th style={{ borderTop: `3px solid ${theme}` }}>본문</th>
                            </tr>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Resume1;
