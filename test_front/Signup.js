import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationVisible, setIsVerificationVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [check_id,setcheck_id] = useState(false);

    const id_check = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/id_check", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ID: email})
            })
            if(response.ok){
                const result = await response.json();
                if(!result[0]){ // 중복이 있으면 비어있는 객체 응답
                    alert(`${email}는 사용 가능한 이메일입니다.`)
                    setcheck_id(true);
                } else {
                    alert(`이미 존재하는 이메일입니다. `);
                    setcheck_id(false);
                }
            } else{
                alert('서버에서 중복 결과데이터 가져오지 못함');
            }
        } catch(error) {
            console.error('이메일 중복 검사 중 오류 발생 : ', error);
        }
    }
    
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.success) {
                setIsVerificationVisible(true);
                setMessage(data.message);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('회원가입 중 오류 발생');
        }
    };

    // 이메일 인증 처리
    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verificationCode }),
            });
            const data = await response.json();

            if (data.success) {

                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error during verification:', error);
            setMessage('인증 중 오류 발생');
        }
    };

    // 코드 다시받기
    const recode = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/recode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.success) {
                setMessage("인증코드를 다시 발송해드렸습니다.");
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('인증코드 다시받는중에 오류');
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <button id='check' onClick={id_check}>중복검사</button>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {check_id &&(
                    <button type="submit">인증코드 받기</button>
                )}
                
            </form>

            {isVerificationVisible && (
                <form onSubmit={handleVerify}>
                    <div>
                        <label htmlFor="verificationCode">인증코드:</label>
                        <input
                            type="text"
                            id="verificationCode"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">인증하기</button>
                </form>
                
            )}
            {isVerificationVisible && (
                <form onSubmit={recode}>
                <button type="submit">인증코드 다시받기</button>
            </form>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
