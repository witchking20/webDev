import React, { useState } from 'react';
import './App.css';

// 검색 폼 컴포넌트
const SearchForm = ({ onSearch }) => {
  const [data, setData] = useState({ location: '', skill: '', title: '' });

  // 버튼 클릭 핸들러
  const handleButtonClick = (type, value) => {
    setData(prevData => ({ ...prevData, [type]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(data);
  };

  return (
    <div>
      <h1>지역</h1>
      <form id="search_location">
        {['서울', '경기도', '강원도', '충청도'].map(location => (
          <button
            key={location}
            className="location"
            type="button"
            onClick={() => handleButtonClick('location', location)}
          >
            {location}
          </button>
        ))}
      </form>

      <h1>기술</h1>
      <form id="search_skill">
        {['Git', 'MySQL', 'JavaScript', 'Java'].map(skill => (
          <button
            key={skill}
            className="skill"
            type="button"
            onClick={() => handleButtonClick('skill', skill)}
          >
            {skill}
          </button>
        ))}
      </form>

      <h1>직무</h1>
      <form id="search_title">
        {['개발자', '프론트', '백엔드', '엔지니어'].map(title => (
          <button
            key={title}
            className="title"
            type="button"
            onClick={() => handleButtonClick('title', title)}
          >
            {title}
          </button>
        ))}
      </form>

      <form id="search" onSubmit={handleSubmit}>
        <button type="submit">찾기</button>
      </form>
    </div>
  );
};

// 검색 결과 테이블 컴포넌트
const SearchResults = ({ results }) => (
  <table id="allStudentsTable" style={{ display: results.length > 0 ? 'table' : 'none' }}>
    <thead>
      <tr>
        <th>Title</th>
        <th>Skill</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result, index) => (
        <tr key={index}>
          <td>{result.title}</td>
          <td>{result.skill}</td>
          <td>{result.location}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const App = () => {
  const [results, setResults] = useState([]);

  // 검색 수행 함수
  const handleSearch = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        setResults(result);
      } else {
        alert('데이터 전달 에러');
      }
    } catch (error) {
      console.error('검색 중 에러 발생:', error);
    }
  };

  return (
    <div className="App">
      <SearchForm onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
};

export default App;