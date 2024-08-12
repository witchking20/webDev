import React from 'react';
import './main.css';

function Company() {
  return (
    <div className='work-management'>
      <div className='block-7'>
        <div className='content'>
          <div className='headline'>
            <div className='text-block-8'>
              <div className='element' />
              <span className='company-recommendation-9'>회사 추천</span>
              <span className='chatbot-company'>
                챗봇 AI로 찾는 나를 위한 회사!
              </span>
            </div>
            <button className='btn-get-started'>
              <span className='get-started-a'>Get Started</span>
              <div className='icon'>
                <div className='group-b' />
              </div>
            </button>
          </div>
          <div className='image-container-c' />
        </div>
        <div className='content-d'>
          <div className='work-together-image'>
            {/* Other elements */}
          </div>
          <div className='headline-26'>
            <div className='text-block-27'>
              <div className='element-28' />
              <span className='company-search-29'>회사 검색</span>
              <span className='chatbot-find-company'>
                챗봇으로 내가 원하는 조건에 맞는 회사 찾기!
                <br />
              </span>
            </div>
            <button className='btn-get-started-2a'>
              <span className='get-start'>Get Start</span>
              <div className='icon-2b'>
                <div className='group-2c' />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
