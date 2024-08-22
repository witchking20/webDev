
import React, { useEffect, useState } from 'react';

function Login(props) {

    // 로그인에 활용 할 변수
    const [id,setid] = useState("");
    const [pw,setpw] = useState("");
    const [user, setUser] = useState({}); // 유저 정보 초기화
    const [islogin,setislogin] = useState(false);

    // 회원가입에 활용 할 변수
    const [accession_id, setaccession_id] = useState("");
    const [accession_pw, setaccession_pw] = useState("");
    const [check_id,setcheck_id] = useState(false);

    // user data가져오기
    const getuserinfo = () =>{
        fetch("http://localhost:4000/accesstoken", {
            
            method: "GET",
            credentials: 'include',
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if(data.user){
                setUser(data);
                setislogin(true);
            } else{
                setUser(data);
                setislogin(false);
            }
        })
            .catch(error =>{
            console.log(error)
        })

        // setislogin(true);
    }

    // 로그아웃 요청
    const logout =() =>{
        fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: 'include',
        })
        .then(response=>response.json())
        .then(data=>alert(data));

        setUser({})
        setislogin(false);
    }
    // 회원탈퇴 요청
    const user_delete =() =>{
        fetch("http://localhost:4000/delete", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ID: user.user}),
        })

        alert("회원탈퇴 성공");
        logout();
    }

    // 로그인 요청
    const savelogin = async (e) =>{
        e.preventDefault();
        console.log(`보낼 데이터 = ID : ${id}, PW : ${pw}`);
        try{
                const response = await fetch('http://localhost:4000/login',{
                    method: 'POST',
                    credentials: 'include', // cookie 포함을 허용하는 속성
                    // 요청을 보낸 경로에서 쿠키를 보내주는데(res) include하지 않으면 쿠키가 저장되지않는다.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ID: id, PW : pw})
                })
            
        // console.log(response);
        if(response.ok){
            const result = await response.json();
            if(!result[0]){
                alert("회원 정보가 일치하지않습니다.")
            } else{
                alert("로그인 성공");
                await getuserinfo();
            }
            console.log(result);
            // if (result){
            //     console.log(result);
            //     const userData = result;
            //     setUser(userData);
            //     // console.log(user);
            // }
            // else {
            //     setUser({user_id: '', ID:''})
            //     alert(`회원 정보가 일치하지 않습니다.`);
                
            //     document.getElementById('user_id').textContent = user[0].ID;
            // }
        } else alert('데이터 요청, 응답 오류');

        }catch(error){
            console.error(`전송 중 오류 발생 : ${error}`)
        }
    }

    // 회원가입
    const accession = async (e) =>{
        e.preventDefault();
        console.log(`보낼 데이터 = accession_ID : ${accession_id}, accession_PW : ${accession_pw}`);
        try{
            const response = await fetch('http://localhost:4000/accession',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ID: accession_id, PW : accession_pw})
        })
        // console.log(response);
        if(response.ok){
            const result = await response.json();
            console.log(result);
            alert(result);

            setcheck_id(false);
        } else alert('회원가입 데이터 요청, 응답 오류');

        }catch(error){
            console.error(`회원가입 전송 중 오류 발생 : ${error}`)
        }
    }

    // 아이디 중복 검사
    const id_check = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:4000/id_check", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ID: accession_id})
            })
            if(response.ok){
                const result = await response.json();
                if(!result[0]){ // 중복이 있으면 비어있는 객체 응답
                    alert(`${accession_id}는 사용 가능한 아이디입니다.`)
                    setcheck_id(true);
                } else {
                    alert(`이미 존재하는 아이디입니다. `);
                    setcheck_id(false);
                }
            } else{
                alert('서버에서 중복 결과데이터 가져오지 못함');
            }
        } catch(error) {
            console.error('아이디 중복 검사 중 오류 발생 : ', error);
        }
    }

    // 화면 리렌더링

    useEffect(()=>{
        
    },[check_id])

    useEffect(()=>{
        getuserinfo();
        if(user.user){
            setislogin(true);
        } else setislogin(false);
    },[user.user])
    return (
        <div>
            <form id='login' onSubmit={savelogin}>
                <div>
                    <label id='ID'>ID </label>
                    <input type='ID' placeholder='Enter ID' onChange={e=>setid(e.target.value)}></input>
                </div>
                <div>
                    <label id='PW'>PW </label>
                    <input type='password' placeholder='Enter PW' onChange={e=>setpw(e.target.value)}></input>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
            {/* <div>
                <button onClick={getuserinfo}>getaccessToken</button>
            </div> */}
            {islogin ? (
                   <>
                   <h3>{user.user}님이 로그인했습니다. </h3>
                   <button onClick={logout}>logout</button>
                   <button onClick={user_delete}>회원탈퇴</button>

                   </>     
                ) : (
                    
                    <h3>회원 정보가 없습니다. </h3>
                )}

                <div>
                    <h4>=======회원가입 Test=======</h4>
                    <form id='accession' onSubmit={accession}>
                        <div>
                            <label id='accession_ID'>ID </label>
                            <input type='ID' placeholder='Enter ID' onChange={e=>{setaccession_id(e.target.value); setcheck_id(false)}}></input>
                            <button id='check' onClick={id_check}>중복검사</button>
                        </div>
                        <div>
                            <label id='accession_PW'>PW </label>
                            <input type='password' placeholder='Enter PW' onChange={e=>setaccession_pw(e.target.value)}></input>
                        </div>
                        <div>
                        {check_id ? (
                            <>
                            <button id='accession' type='submit'>accession</button>
                            </>     
                            ) : (
                                <h5>중복을 확인하세요</h5>
                            )}
                        </div>
                    </form>
                </div>
        </div>
    );
}


export default Login;


// import React, { useState, useEffect } from 'react';

// function Login(props) {
//     const [id, setId] = useState("");
//     const [pw, setPw] = useState("");
//     const [user, setUser] = useState(null);

//     const savelogin = async (e) => {
//         e.preventDefault();
//         console.log(`보낼 데이터 = ID : ${id}, PW : ${pw}`);

//         try {
//             const response = await fetch('http://localhost:4000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ ID: id, PW: pw })
//             });

//             if (response.ok) {
//                 const result = await response.json();

//                 if (result.length >= 1) {
//                     setUser(result[0]);  // 결과가 배열이라면 첫 번째 요소 설정
//                 } else {
//                     setUser(null);
//                     alert(`회원 정보가 일치하지 않습니다.`);
//                 }
//             } else {
//                 alert('데이터 요청, 응답 오류');
//             }

//         } catch (error) {
//             console.error(`전송 중 오류 발생 : ${error}`)
//         }
//     }

//     // user 상태가 변경될 때마다 실행
//     useEffect(() => {
//         if (user) {
//             alert(`데이터 보내고 응답 완료 : ${user.user_id}, ${user.ID}`);
//         }
//     }, [user]);

//     return (
//         <div>
//             <form onSubmit={savelogin}>
//                 <div>
//                     <label htmlFor='ID'>ID </label>
//                     <input type='text' placeholder='Enter ID' onChange={e => setId(e.target.value)} />
//                 </div>
//                 <div>
//                     <label htmlFor='PW'>PW </label>
//                     <input type='password' placeholder='Enter PW' onChange={e => setPw(e.target.value)} />
//                 </div>
//                 <div>
//                     <button type='submit'>Login</button>
//                 </div>
//             </form>
//             <div>
//                 {user && <p id='user_id'>Logged in as: {user.ID}</p>}
//             </div>
//         </div>
//     );
// }

// export default Login;
