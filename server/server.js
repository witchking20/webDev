// const express = require('express');
// const mysql = require('mysql2/promise');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');  
// const cookieParser = require('cookie-parser');


// // const promisePool = require('./promisePool');

// dotenv.config();

// const app = express();
// app.use(cookieParser());
// app.use(bodyParser.json());
// // app.use(cors());


// // const pool = mysql.createPool({
// //     host: process.env.DB_HOST,
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASS,
// //     database: process.env.DB_NAME,
// //     waitForConnections: true,
// //     connectionLimit: 10,
// //     queueLimit: 0
// // });


// dotenv.config(); // 토큰의 secret key를 .env 파일에 환경 변수로 저장하기 위해서 사용
// // 보안적인 이유로 코드에 직접 secret key를 하드코딩하지 않고, 환경 변수로 관리하기 위함
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// const corsOptions = {
//     origin: 'http://localhost:3000', // 클라이언트의 도메인
//     credentials: true, // 쿠키와 같은 자격 증명을 허용
// };

// app.use(cors(corsOptions));
// // 같은 컴퓨터에서 작업 할지라도 port가 다르면 Origin이 다르다.
// // Origin이 다른 접근은 무조건 막기 때문에 허용하는 작업이 필요하다.



// // 로그인 요청 받음
// app.post('/login',async (req,res)=>{
//     // console.log(req.body);
//     console.log(JSON.stringify(req.body, null, 2));

//     const {ID, PW} = req.body;
//     console.log(ID,PW);

//     try{
//         const connection = await pool.getConnection();
//         // 커넥션 풀 비동기 연결
//         console.log('DB 연결 성공');
//         const [result] = await connection.query(`select * from users where email= ? and password_hash= ? and email_verified=1`,
//             [`${ID}`,`${PW}`]
//         )
//         console.log(result[0]);

//         if (!result[0]) res.json(result)
//             else{
//                 // 유저 정보가 있는경우 진행 ...
//                 console.log(`유저 정보 담겨있음 : ${result[0].id}, ${result[0].email}`)
//                 try{
//                     console.log('토큰 만들기 시작')
//                 // access Token 발급
//                 // DB에 들어있는 사용자 정보에 접근하기 위한 토큰
//                     const accessToken = jwt.sign({
//                     // 3가지 인수를 받는다.
//                     // 1. 어떤 유저정보를 담을지
//                         id : result[0].id,
//                         user : result[0].email
//                     }, process.env.ACCESS_SECRET, // 2. 토큰을 생성할 때 만들어지는 비밀키를 담을 환경변수
//                     {
//                     // 3. 토큰의 유효기간 설정
//                         expiresIn: '10m',
//                         issuer : 'About Tech',
//                     })
//                     console.log('토큰 만들기 access')

//                 // refresh Token 발급
//                 // Access Token을 갱신하는 용도의 토큰

//                 const refreshToken = jwt.sign({
                    
//                     // access토큰과 똑같이 3가지 인수를 받는다.
//                     // 1. 어떤 유저정보를 담을지
//                     id : result[0].id,
//                     user : result[0].email
//                 }, process.env.REFRESH_SECRET, // 2. access와 refresh 선택
//                 // secret key를 .env 파일에 환경 변수로 안전하게 저장
//                 {
//                     // 3. 토큰의 유효기간 설정 (access토큰을 갱신하기 때문에 기간을 길게 설정)
//                     expiresIn: '24h',
//                     issuer : 'About Tech',
//                 })
//                 console.log('토큰 만들기 refresh')

//                 // token들을 cookie에 담아서 전송
//                 res.cookie('accessToken',accessToken,{
//                     // 쿠키 속성값
//                     secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
//                     httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
//                     sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
//                 })
//                 console.log('accessToken 쿠키 생성')

//                 res.cookie('refreshToken',refreshToken,{
//                     // 쿠키 속성값
//                     secure: false,
//                     httpOnly: true,
//                     sameSite: 'Lax',
//                 })
//                 console.log('refreshToken 쿠키 생성')
//                 res.json(result); // data 전송

//                 } catch(error){
//                     console.error('토큰 생성 중 오류 발생:', error.message);
//                     res.json(error); // 에러 반환
//                 }
//             }
//             connection.release(); // 커넥션 풀 반환
        

//     } catch(err){
//         console.error("DB 쿼리 에러 : ",err);
//         res.status(500).send('서버에러');
//     }


// })

// // ID 중복 확인 
// app.post('/id_check', async (req,res)=>{
//     console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
//     const {ID} = req.body;

//     try{
//         const connection = await pool.getConnection();
//         // 커넥션 풀 비동기 연결
//         console.log('DB 연결 성공');
//         const [result] = await connection.query(`select * from users where email= ? and email_verified = 1`,
//             [`${ID}`]
//         )
//         console.log(result[0]);
//         res.json(result);

//         connection.release(); // 커넥션 풀 반환
        
//     } catch(error){
//         console.error("DB 쿼리 에러 : ",error);
//         res.status(500).send('서버에러');
//     }
// })

// // // 회원가입 요청
// // app.post('/accession', async (req,res)=>{
// //     console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
// //     const {ID, PW} = req.body;
// //     console.log(ID, PW);

// //     try{
// //         const connection = await pool.getConnection();
// //         // 커넥션 풀 비동기 연결
// //         console.log('회원가입 요청에 대한 DB 연결 성공');
// //         await connection.query(`insert into users (email,password_hash) values (?,?)`,
// //             [`${ID}`,`${PW}`]
// //         )
// //         console.log(ID);
// //         res.json(`${ID} 회원가입 완료 !! `);
// //         // console.log(result[0]);
// //         // res.json(result);
// //         connection.release(); // 커넥션 풀 반환
        
// //     } catch(error){
// //         console.error("DB 쿼리 에러 : ",error);
// //         res.status(500).json(`회원가입 중 에러 발생 : ${error}`);
// //     }
// // })

// // 회원 탈퇴 요청
// app.post('/delete', async (req,res)=>{
//     console.log(JSON.stringify(req.body, null, 2)); // 전달 받은 req 확인
//     const {ID} = req.body;

//     try{
//         const connection = await pool.getConnection();
//         // 커넥션 풀 비동기 연결
//         await connection.query(`delete from users where email=?`,
//             [`${ID}`]
//         )
//         console.log("회원 탈퇴 진행");

//         const [result] = await connection.query(`select * from users where email= ?`,
//             [`${ID}`]
//         )
//         console.log(result[0]);
//         res.json(result);

//         connection.release(); // 커넥션 풀 반환

//     } catch(error){
//         console.error("DB 쿼리 에러 : ",error);
//         res.status(500).send('서버에러');
//     }
// })


// // access Token 사용
// app.get('/accesstoken', (req,res)=>{
//     // 사용자마다 다른 서비스 제공
//     try{
//         // 요청받을 때 담겨있는 쿠키의 accessToken에 할당 된 값을 가져온다.
//         console.log('get 접속')
//         const token = req.cookies.accessToken;

//         // 유저 정보를 특정하기 위한 변수
//         // 인자로는 (쿠키에 저장된 토큰값 , 토큰을 생성할 때 만들어진 비밀 키값)
//         const data = jwt.verify(token, process.env.ACCESS_SECRET);
//         // const connection = await pool.getConnection();        
//         console.log(data)
//         res.json(data);

//         // 쿠키에 담겨있는 accessToken의 정보가 DB에 담겨있는 정보와 같은지 비교


//     } catch(error){
//         console.log("안녕하세요",error.message)
//         // res.json(error);
//     }
// })

// // refresh Token 사용
// app.get('/refreshtoken', (req,res)=>{
//     // accessToken을 갱신하는 목적
//     try{
//         const token = req.cookies.refreshToken;
//         const data = jwt.verify(token, process.env.REFRESH_SECRET);

//         // accessToken 새로 발급
//         const accessToken = jwt.sign({
//                 id : data.user_id,
//                 user : data.ID
//             }, process.env.ACCESS_SECRET,
//             {
//                 expiresIn: '10m',
//                 issuer : 'About Tech',
//             });

//             res.cookie('accessToken',accessToken,{
//                 // 쿠키 속성값
//                 secure: false, // https프로토콜(true) 사용과 http프로토콜(false) 사용 명시
//                 httpOnly: true, // 어디서 접근이 가능할지 지정 (http or javascript)
//                 sameSite: 'Lax', // 쿠키가 요청에 어떻게 포함되는지를 제어
//             });

//     }catch{

//     }

// })

// // 로그인에 성공 할 때 
// app.get('/loginok', (req,res)=>{

// })

// // 로그아웃 할 때
// app.post('/logout', (req,res)=>{
//     // 쿠키에 저장되어있는 토큰을 삭제, 초기화 작업
//     try{
//         res.cookie('accessToken',"");
//         res.cookie('refreshToken',"");
//         res.json('logout !!');
//     }catch(error){
//         res.json(error);
//     }
// })

// app.post('/api/signup', async (req, res) => {
//     const { email, password } = req.body;

//     try {
     
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const hashedPassword = password;
   
//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자 코드
//         const codeCreatedAt = new Date;
//         const codeExpiresAt = new Date(codeCreatedAt.getTime() + 10 * 60 * 1000); // 10분 후

//         // await pool.query(
//         //     'DELETE FROM users WHERE email_verified=0;'
//         // );

//         await pool.query(
//             `INSERT INTO users (email, password_hash, email_verified, verification_code, code_created_at, code_expires_at) VALUES (?, ?, FALSE, ?, ?, ?)`,
//             [email, hashedPassword, verificationCode, codeCreatedAt, codeExpiresAt]
//         );

  
//         let transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         let mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Email Verification',
//             text: `인증코드: ${verificationCode}. 인증을 진행해주세요.`
//         };

        
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Failed to send email:', error);
//                 return res.status(500).json({ success: false, error: '이메일 전송 실패' });
//             }
//             res.json({ success: true, message: '이메일에서 인증코드를 확인해주세요.' });
//         });
//     } catch (error) {
//         console.error('Database error:', error);
//         console.error('Database error:', error.sql);
//         res.status(500).json({ success: false, error: '인증메일을 확인해주세요' });
//     }
// });

// app.post('/api/recode', async (req, res) => {
//     const { email, password } = req.body;
//     await pool.query(
//         `delete from users where email= ? and email_verified = 0`,
//         [email]
//     );

//     try {
     
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const hashedPassword = password;
   
//         const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자 코드
//         const codeCreatedAt = new Date;
//         const codeExpiresAt = new Date(codeCreatedAt.getTime() + 10 * 60 * 1000); // 10분 후

//         // await pool.query(
//         //     'DELETE FROM users WHERE email_verified=0;'
//         // );

//         await pool.query(
//             `INSERT INTO users (email, password_hash, email_verified, verification_code, code_created_at, code_expires_at) VALUES (?, ?, FALSE, ?, ?, ?)`,
//             [email, hashedPassword, verificationCode, codeCreatedAt, codeExpiresAt]
//         );

  
//         let transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         let mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Email Verification',
//             text: `인증코드: ${verificationCode}. 인증을 진행해주세요.`
//         };

        
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Failed to send email:', error);
//                 return res.status(500).json({ success: false, error: '이메일 전송 실패' });
//             }
//             res.json({ success: true, message: '이메일에서 인증코드를 확인해주세요.' });
//         });
//     } catch (error) {
//         console.error('Database error:', error);
//         console.error('Database error:', error.sql);
//         res.status(500).json({ success: false, error: '인증메일을 확인해주세요' });
//     }
// });

// app.post('/api/verify', async (req, res) => {
//     const { email, verificationCode } = req.body;

//     try {
       
//         const [results] = await pool.query(
//             `SELECT * FROM users WHERE email = ? AND verification_code = ? AND code_expires_at > NOW()`,
//             [email, verificationCode]
//         );

//         if (results.length === 0) {
//             return res.status(400).json({ success: false, message: '유효하지 않거나 만료된 코드입니다.' });
//         }


//         const user = results[0];
//         await pool.query(
//             `UPDATE users SET email_verified = TRUE, verification_code = NULL, code_created_at = NULL, code_expires_at = NULL WHERE id = ?`,
//             [user.id]
//         );

//         res.json({ success: true, message: '이메일 인증 성공!' });
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ success: false, error: '데이터베이스 오류' });
//     }
// });


// app.get('/api/noticeboard', async (req, res) => {
//     const connection = await pool.getConnection(); 
//     try {
//         const [result] = await connection.query(`
//            SELECT 
//                 np.post_id,
//                 np.title, 
//                 np.content, 
//                 np.category, 
//                 np.user_id, 
//                 t1.email, 
//                 np.written_datetime, 
//                 np.update_datetime
//             FROM 
//                 noticeboard_post np
//             JOIN 
//                 test1 t1
//             ON 
//                 np.user_id = t1.user_id
            

//         `); 
//         console.log(result);
//         res.json(result); 
//     } catch (err) {
//         console.error('DB 조회 중 오류 발생:', err);
//         res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//     } finally {
//         connection.release(); 
//     }
// });

// app.get('/api/boards/:boardid', async (req, res) => {
//     const connection = await pool.getConnection();
    
//     try {
//         const boardId = req.params.boardid;  // URL 파라미터에서 boardid를 가져옴
//         const [result] = await connection.query(`
//             SELECT * 
//             FROM noticeboard_post 
//             WHERE post_id= ?;
//         `, [boardId]);

//         if (result.length === 0) {
//             return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
//         }

//         res.json(result); 
//     } catch (err) {
//         console.error('DB 조회 중 오류 발생:', err);
//         res.status(500).json({ error: 'DB 조회 중 오류 발생' });
//     } finally {
//         connection.release();
//     }
// });

// // app.post('/api/boards', async (req, res) => {
// //     const connection = await pool.getConnection();
// //     const { TITLE, CONTENTS, CATEGORY } = req.body;

// //     try {
// //         const [result] = await connection.query(`
// //             INSERT INTO noticeboard_post 
// //             (
// //             title, 
// //             category, 
// //             user_id, 
// //             written_datetime, 
// //             update_datetime
// //             )
// //             VALUES 
// //             (
// //             ?, 
// //             ?, 
// //             ?, 
// //             ?, 
// //             DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'), 
// //             DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')
// //             );
// //         `, [TITLE, CONTENTS, CATEGORY, USER_ID]);

// //         // 생성된 레코드의 ID를 클라이언트에 반환합니다.
// //         res.status(201).json({ 
// //             code: "SU",
// //             message: '게시물이 성공적으로 생성되었습니다.' 
            
// //         }); 
// //     } catch (err) {
// //         console.error('DB 처리 중 오류 발생:', err);
// //         res.status(500).json({ 
// //             code: "DE",
// //             message: "Database Error", 
// //         });
// //     } finally {
// //         connection.release();
// //     }
// // });


// app.post('/api/boards', (req, res) => {
//     // 쿠키에서 토큰 가져오기
//     const SECRET_KEY = process.env.REFRESH_SECRET;
//     const token = req.cookies.refreshToken;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     // JWT 디코딩 및 검증
//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden - Invalid token' });
//         }

//         // 디코딩된 페이로드에서 user_id 추출
//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         // 데이터베이스 연결 및 쿼리 실행
//         const connection = await pool.getConnection();
//         const { TITLE, CONTENTS, CATEGORY } = req.body;

//         try {
//             const [result] = await connection.query(`
//                 INSERT INTO noticeboard_post 
//                 (
//                 title, 
//                 content, 
//                 category, 
//                 user_id, 
//                 written_datetime, 
//                 update_datetime
//                 )
//                 VALUES 
//                 (?, ?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'), DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i'));
//             `, [TITLE, CONTENTS, CATEGORY, USER_ID]);

//             res.status(201).json({ 
//                 code: "SU",
//                 message: '게시물이 성공적으로 생성되었습니다.' 
//             }); 
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release();
//         }
//     });
// });

// app.put('/api/boards/:boardid', (req, res) => {
//     const SECRET_KEY = process.env.REFRESH_SECRET;
//     const token = req.cookies.refreshToken;
//     const boardId = req.params.boardid;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden - Invalid token' });
//         }

//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();
//         const { TITLE, CONTENTS, CATEGORY } = req.body;

//         try {
//             // 게시물 작성자 ID 조회
//             const [rows] = await connection.query(`
//                 SELECT user_id
//                 FROM noticeboard_post 
//                 WHERE post_id = ?;
//             `, [boardId]);

//             if (rows.length === 0) {
//                 // 게시물이 존재하지 않음
//                 return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
//             }

//             const boardUser_id = rows[0].user_id;

//             if (boardUser_id !== USER_ID) {
//                 // 권한이 없는 경우
//                 return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
//             }

//             // 게시물 업데이트
//             const [result] = await connection.query(`
//                 UPDATE noticeboard_post 
//                 SET 
//                     title = ?, 
//                     content = ?, 
//                     category = ?, 
//                     update_datetime = DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i')
//                 WHERE post_id = ?;
//             `, [TITLE, CONTENTS, CATEGORY, boardId]);

//             res.status(200).json({ 
//                 code: "SU",
//                 message: '게시물이 성공적으로 업데이트되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release(); // 연결 해제
//         }
//     });
// });



// app.delete('/api/boards/:boardid', (req, res) => {
//     const SECRET_KEY = process.env.REFRESH_SECRET;
//     const token = req.cookies.refreshToken;
//     const boardId = req.params.boardid;

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden - Invalid token' });
//         }

//         const USER_ID = decoded.id;
//         console.log(`User ID: ${USER_ID}`);

//         const connection = await pool.getConnection();
//         const { TITLE, CONTENTS, CATEGORY } = req.body;

//         try {
//             // 게시물 작성자 ID 조회
//             const [rows] = await connection.query(`
//                 SELECT user_id
//                 FROM noticeboard_post 
//                 WHERE post_id = ?;
//             `, [boardId]);

//             if (rows.length === 0) {
//                 // 게시물이 존재하지 않음
//                 return res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
//             }

//             const boardUser_id = rows[0].user_id;

//             if (boardUser_id !== USER_ID) {
//                 // 권한이 없는 경우
//                 return res.status(403).json({ code: "ER", message: '권한이 없습니다.' });
//             }

//             // 게시물 삭제
//             const [result] = await connection.query(`
//                 DELETE FROM noticeboard_post
//                 WHERE post_id = ?;
//             `, [boardId]);

//             res.status(200).json({ 
//                 code: "SU",
//                 message: '게시물이 성공적으로 제거되었습니다.' 
//             });
//         } catch (err) {
//             console.error('DB 처리 중 오류 발생:', err);
//             res.status(500).json({ 
//                 code: "DE",
//                 message: "Database Error", 
//             });
//         } finally {
//             connection.release(); // 연결 해제
//         }
//     });
// });


// // 서버 시작
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
