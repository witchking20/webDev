import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

function Header() {
  return (
    <div className='header'>
      <div className='block'>
        <div className='logo'>
          <div className='logo-1'>
            <div className='logo-icon'>
              <div className='group'>
                <div className='group-2'>
                  <div className='vector' />
                  <div className='vector-3' />
                </div>
                <div className='vector-4' />
              </div>
            </div>
            <Link to="/" className='pflow'>PFLOW</Link>
          </div>
        </div>
        <div className='menu'>
          <div className='nav-menu'>
            <div className='products'>
              <Link to="/resume/Resume1" className='resume-writing'  Z>이력서 작성</Link>
            </div>
            <div className='solutions'>
              <span className='company-recommendation'>회사 추천</span>
            </div>
            <div className='resources'>
              <span className='company-search'>회사 검색 </span>
            </div>
            <div className='pricing'>
              <span className='community'>커뮤니티</span>
            </div>
          </div>
          <button className='btn'>
            <div className='btn-login'>
              <span className='login'>Login</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
