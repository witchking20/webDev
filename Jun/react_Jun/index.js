const express = require('express');
const app = express();
const mysql = require('mysql2/promise'); 
const cors = require('cors'); // 다른 Origin 접근을 혀용하기 위한 모듈
const jwt = require('jsonwebtoken'); // 토큰 생성을 위한 모듈
const bcrypt = require('bcrypt');// 암호화를 위해 사용하는 모듈
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config(); // 토큰의 secret key를 .env 파일에 환경 변수로 저장하기 위해서 사용
// 보안적인 이유로 코드에 직접 secret key를 하드코딩하지 않고, 환경 변수로 관리하기 위함
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // 통신을 허용할 주소 설정
    credentials: true, // cooki를 통해 통신할 때 true 지정
}));
// 같은 컴퓨터에서 작업 할지라도 port가 다르면 Origin이 다르다.
// Origin이 다른 접근은 무조건 막기 때문에 허용하는 작업이 필요하다.

// 커넥션 풀 설정
const pool = mysql.createPool({
    host: '20.189.76.139',
    user: 'pflow',
    password: '1234',
    database: 'mydb'
});

// 로그인 요청 받음
app.post('/login',async (req,res)=>{
    // console.log(req.body);
    console.log(JSON.stringify(req.body, null, 2));

    const {ID, PW} = req.body;
    console.log(ID,PW);

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        console.log('DB 연결 성공');
        const [result] = await connection.query(`select * from login where ID= ? and PW= ?`,
            [`${ID}`,`${PW}`]
        )
        console.log(result[0]);

        if (!result[0]) res.json(result)
            else{
                // 유저 정보가 있는경우 진행 ...
                console.log(`유저 정보 담겨있음 : ${result[0].user_id}, ${result[0].ID}`)
                try{
                    console.log('토큰 만들기 시작')
                // access Token 발급
                // DB에 들어있는 사용자 정보에 접근하기 위한 토큰
                    const accessToken = jwt.sign({
                    // 3가지 인수를 받는다.
                    // 1. 어떤 유저정보를 담을지
                        id : result[0].user_id,
                        user : result[0].ID
                    }, process.env.ACCESS_SECRET, // 2. 토큰을 생성할 때 만들어지는 비밀키를 담을 환경변수
                    {
                    // 3. 토큰의 유효기간 설정
                        expiresIn: '10m',
                        issuer : 'About Tech',
                    })
                    console.log('토큰 만들기 access')

                // refresh Token 발급
                // Access Token을 갱신하는 용도의 토큰

                const refreshToken = jwt.sign({
                    
                    // access토큰과 똑같이 3가지 인수를 받는다.
                    // 1. 어떤 유저정보를 담을지
                    id : result[0].user_id,
                    user : result[0].ID
                }, process.env.REFRESH_SECRET, // 2. access와 refresh 선택
                // secret key를 .env 파일에 환경 변수로 안전하게 저장
                {
                    // 3. 토큰의 유효기간 설정 (access토큰을 갱신하기 때문에 기간을 길게 설정)
                    expiresIn: '24h',
                    issuer : 'About Tech',
                })
                console.log('토큰 만들기 refresh')

                // token들을 cookie에 담아서 전송
                res.cookie('accessToken',accessToken,{
                    // 쿠키 속성값
                    secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
                    httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
                    sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
                })
                console.log('accessToken 쿠키 생성')

                res.cookie('refreshToken',refreshToken,{
                    // 쿠키 속성값
                    secure: false,
                    httpOnly: true,
                    sameSite: 'Lax',
                })
                console.log('refreshToken 쿠키 생성')
                res.json(result); // data 전송

                } catch(error){
                    console.error('토큰 생성 중 오류 발생:', error.message);
                    res.json(error); // 에러 반환
                }
            }
            connection.release(); // 커넥션 풀 반환
        

    } catch(err){
        console.error("DB 쿼리 에러 : ",err);
        res.status(500).send('서버에러');
    }


})

// ID 중복 확인 요청
app.post('/id_check', async (req,res)=>{
    console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
    const {ID} = req.body;

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        console.log('DB 연결 성공');
        const [result] = await connection.query(`select * from login where ID= ?`,
            [`${ID}`]
        )
        console.log(result[0]);
        res.json(result);

        connection.release(); // 커넥션 풀 반환
        
    } catch(error){
        console.error("DB 쿼리 에러 : ",error);
        res.status(500).send('서버에러');
    }
})

// 회원가입 요청
app.post('/accession', async (req,res)=>{
    console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
    const {ID, PW} = req.body;
    console.log(ID, PW);

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        console.log('회원가입 요청에 대한 DB 연결 성공');
        await connection.query(`insert into login (ID,PW) values (?,?)`,
            [`${ID}`,`${PW}`]
        )
        console.log(ID);
        res.json(`${ID} 회원가입 완료 !! `);
        // console.log(result[0]);
        // res.json(result);
        connection.release(); // 커넥션 풀 반환
        
    } catch(error){
        console.error("DB 쿼리 에러 : ",error);
        res.status(500).json(`회원가입 중 에러 발생 : ${error}`);
    }
})

// 회원 탈퇴 요청
app.post('/delete', async (req,res)=>{
    console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
    const {ID} = req.body;

    try{
        const connection = await pool.getConnection();
        // 커넥션 풀 비동기 연결
        await connection.query(`delete from login where ID=?`,
            [`${ID}`]
        )
        console.log("회원 탈퇴 진행");

        const [result] = await connection.query(`select * from login where ID= ?`,
            [`${ID}`]
        )
        console.log(result[0]);
        res.json(result);

        connection.release(); // 커넥션 풀 반환

    } catch(error){
        console.error("DB 쿼리 에러 : ",error);
        res.status(500).send('서버에러');
    }
})


// access Token 사용
app.get('/accesstoken', (req,res)=>{
    // 사용자마다 다른 서비스 제공
    try{
        // 요청받을 때 담겨있는 쿠키의 accessToken에 할당 된 값을 가져온다.
        console.log('get 접속')
        const token = req.cookies.accessToken;

        // 유저 정보를 특정하기 위한 변수
        // 인자로는 (쿠키에 저장된 토큰값 , 토큰을 생성할 때 만들어진 비밀 키값)
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        // const connection = await pool.getConnection();        
        console.log(data)
        res.json(data);

        // 쿠키에 담겨있는 accessToken의 정보가 DB에 담겨있는 정보와 같은지 비교


    } catch(error){
        console.log(error.message)
        // res.json(error);
    }
})

// refresh Token 사용
app.get('/refreshtoken', (req,res)=>{
    // accessToken을 갱신하는 목적
    try{
        const token = req.cookies.refreshToken;
        const data = jwt.verify(token, process.env.REFRESH_SECRET);

        // accessToken 새로 발급
        const accessToken = jwt.sign({
                id : data.user_id,
                user : data.ID
            }, process.env.ACCESS_SECRET,
            {
                expiresIn: '10m',
                issuer : 'About Tech',
            });

            res.cookie('accessToken',accessToken,{
                // 쿠키 속성값
                secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
                httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
                sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
            });

    }catch{

    }

})

// 로그인에 성공 할 때 
app.get('/loginok', (req,res)=>{

})

// 로그아웃 할 때
app.post('/logout', (req,res)=>{
    // 쿠키에 저장되어있는 토큰을 삭제, 초기화 작업
    try{
        res.cookie('accessToken',"");
        res.cookie('refreshToken',"");
        res.json('logout !!');
    }catch(error){
        res.json(error);
    }
})

app.listen(4000, ()=>{
    console.log(`Server Start on 4000 Port !!`)
})