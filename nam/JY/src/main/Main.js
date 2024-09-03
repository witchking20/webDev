import React from 'react';
import './main.css';

function Company() {
  return (
    <div className='main'>
      <div className='main-1'>
        <div className='content'>
              <span className='title'>쉽고 빠르게 완성하는 <br/>나만의 이력서</span>
              <span className='sub-title'>
                이력서 쓰는데 시간 버리지 말자! 글을 못써도! 단어가 생각이 안나도! <br/> AI로 발견하는 나만의 취업 강점 찾기!
                <br />
              </span>
            <button className='main-btn-section'>
              <span className='main-btn'>Get Started Free</span>
              <div className='icon'>
                <div className='icon-arrow' />
              </div>
            </button>
            </div>
          </div>
        <div className='main-2'>
        <div className='content'>
              <span className='title'>챗봇으로 찾는 나에게 맞는 기업 <br/> 회사 추천과 검색을 한번에 </span>
              <span className='sub-title'>
                입력한 정보를 바탕으로 챗봇에서 원하는 회사 검색! <br/> 검색하기 귀찮다면 챗봇에게 추천 받기!
                <br />
              </span>
            <button className='main-btn-section'>
              <span className='main-btn'>Get Started Free</span>
              <div className='icon'>
                <div className='icon-arrow' />
              </div>
            </button>   
        </div>
        </div>
        <div className='main-3'>
        <div className='content'>
              <span className='title'>취업 커뮤니티 <br/>JOB SALON</span>
              <span className='sub-title'>
                취업고민 상담부터 후기까지 <br/> 모두의 소식을 함께 나눠봐요
                <br />
              </span>
            <button className='main-btn-section'>
              <span className='main-btn'>Get Started Free</span>
              <div className='icon'>
                <div className='icon-arrow' />
              </div>
            </button>
            </div>
          </div>
        </div>
  );
}

export default Company;
