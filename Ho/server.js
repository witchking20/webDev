const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// 커넥션 풀 설정
const pool = mysql.createPool({
    host: '20.189.76.139',
    user: 'pflow',
    password: '1234',
    database: 'mydb'
});


app.post('/search',async (req,res)=>{
    const { location, skill, title } = req.body;
  
    const data = [
        { title: '개발자', skill: 'JavaScript', location: '서울' },
    ];

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