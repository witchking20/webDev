const express = require('express');
const mysql = require('mysql2/promise'); // mysql 비동기 지원 ..
const path = require('path');

const app = express();
const port = 4000;

// 커넥션 풀 설정
const pool = mysql.createPool({
    host: '20.189.76.139',
    user: 'pflow',
    password: '1234',
    database: 'mydb'
});
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'HTML','search.html'))
})

app.post('/search',async (req,res)=>{
    // req.body 객체의 구조를 확인하고 싶을때
    console.log(JSON.stringify(req.body, null, 2));
    // console.log(req.body.skill[1]);
    const {location, skill, title} = req.body;
    console.log(`location : ${location}`);
    console.log(`skill : ${skill}`);
    console.log(`title : ${title}`);

    //DB 연결
    try {
        console.log('mydb 연결 성공')
        const connection = await pool.getConnection();
        // const [result] = await  connection.query(`select * from search where location like '%${location}%' and skill like '%${skill}%' and title like '%${title}%'`);
        // SQL 인젝션을 방지하기 위해 다시 수정해야 함
        const [result] = await  connection.query(`SELECT * FROM search WHERE location LIKE ? AND skill LIKE ? AND title LIKE ?`,
        [`%${location}%`, `%${skill}%`, `%${title}%`]);
        console.log(result);
        
        connection.release();
    
        res.json(result);
    
    } catch (err) {
        console.error('쿼리 실행 에러:', err);
        res.status(500).send('서버 에러');
    }
})

app.listen(port,()=>{
    console.log(`Server Start on ${port} port`);
})