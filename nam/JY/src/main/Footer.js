import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './main.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-1'>
          <div className='logo-description'>
            <div className='logo-35'>
              <span className='pflow-36'>PFLOW</span>
              <div className='logo-icon-37'>
                <div className='group-38'>
                  <div className='group-39'>
                    <div className='vector-3a' />
                    <div className='vector-3b' />
                  </div>
                  <div className='vector-3c' />
                </div>
              </div>
            </div>
           </div>
           <div className='info-tag'>
            <span>이력서 작성</span>
            <span>회사 추천</span>
            <span>회사 검색</span>
            <span>커뮤니티</span>
        </div>
          </div>
          <span className='footer-2'>
              성공적인 취업을 위한 도우미
            </span>
          <div className='footer-3'>
          <div className='btm-tag'>
            <span>Terms & privacy</span>
            <span>Security</span>
            <span>Status</span>
            <span>©2024 AICC PFlow.</span>
          </div>
          <div className='social-icon'>
            <FontAwesomeIcon icon={faFacebookF} size="1x" style={{ color: '#ffffff' }} />
            <FontAwesomeIcon icon={faLinkedinIn} size="0.5x" style={{ color: '#ffffff' }} />
            <FontAwesomeIcon icon={faXTwitter} size="0.5x" style={{ color: '#ffffff' }} />
          </div>
          </div>
        </div>
  );
}

export default Footer;
