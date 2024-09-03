import React, { useEffect, useState } from 'react';

function Login() {

    const [id,setid] = useState("");
    const [pw,setpw] = useState("");
    const [user, setUser] = useState({user_id: '', ID:''});

    const savelogin = async (e) =>{
        e.preventDefault();
        console.log(`보낼 데이터 = ID : ${id}, PW : ${pw}`);
        try{
            const response = await fetch('http://192.168.0.144:4000/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ID: id, PW : pw})
        })
        // console.log(response);
        if(response.ok){
            const result = await response.json();
            // console.log(result);

            if (result.length>=1){
                console.log(result);
                const userData = result;
                setUser(userData);
                // console.log(user);
            }
            else {
                setUser({user_id: '', ID:''})
                alert(`회원 정보가 일치하지 않습니다.`);
                
                document.getElementById('user_id').textContent = user[0].ID;
            }
        } else alert('데이터 요청, 응답 오류');

        }catch(error){
            console.error(`전송 중 오류 발생 : ${error}`)
        }
    }
    // console.log('이거 하고 재랜더링', user);

    useEffect(()=>{
        if(user.length>=1){
            alert(`데이터 보내고 응답 완료 : ${user[0].user_id}, ${user[0].ID},${user[0].PW}`)
            document.getElementById('user_id').textContent = user[0].ID;
        } else{
            document.getElementById('user_id').textContent = user.ID;
        }
    },[user])

    return (
        <div>
            <form onSubmit={savelogin}>
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
            <div>
                <p id='user_id'></p>
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