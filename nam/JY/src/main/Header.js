import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './main.css';

function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const onDropDown = () => {
setIsOpen(!isOpen);
  };

   return (
        <div className='Header'>
            <div className='nav'>
                <div className='logo'>
                    <div className='logo-icon'>
                        <div className='group'>
                            <div className='vector' />
                            <div className='vector-3' />
                        </div>
                        <div className='vector-4' />
                    </div>
                    <Link to="/" className='pflow'>PFLOW</Link>
                </div>
                <div className='menu'>
                    <ul className='tags'>
                        <li><Link to="/resume/Resume1" className='tag'>이력서 작성</Link></li>
                        <li><span className='tag'>회사 추천</span></li>
                        <li><span className='tag'>회사 검색 </span></li>
                        <li><span className='tag'>커뮤니티</span></li>
                    </ul>
                    <Link to="/Login" className='login'>
                        <button className='login-btn'>Login</button>
                    </Link>
                </div>
            </div>
            <div className='m-nav'>
            <Link to="/" className='m-pflow'>PFLOW</Link>
            <Link to="/Login" className='login'>
                    <button className='m-login-btn'>Login</button>
                </Link>
                <div className="faBars">
                    <FontAwesomeIcon  className="faBars" icon={faBars} size="2x" onClick={onDropDown} />
                </div>
            </div>
            <ul className={`dropdown ${isOpen ? 'show' : ''}`}>
                    <li><Link to="/resume/Resume1">이력서 작성</Link></li>
                    <li>회사 추천</li>
                    <li>회사 검색</li>
                    <li>커뮤니티</li>
                </ul>
      </div>
    );
};


export default Header;
