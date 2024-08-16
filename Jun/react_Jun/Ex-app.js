const express = require('express');
const app = express();
const mysql = require('mysql2/promise'); 
const cors = require('cors');

app.use(express.json());
app.use(cors());

// let id = 2;
// const todoList = [{
//     id: 1,
//     text: '할일 리스트',
//     done: false
// }];

// app.get('/',(req,res)=>{
//     res.send('Hello World !!')
// });

// app.get('/api/todo',(req,res)=>{
//     res.json(todoList);
//     console.log(todoList);
// })

// app.post('/api/todo',(req,res)=>{
//     const {text , done} = req.body;
//     todoList.push({
//         id: id++,
//         text,
//         done,
//     })
//     return res.send(`success : ${todoList}`);
// })
// 커넥션 풀 설정
const pool = mysql.createPool({
    host: '20.189.76.139',
    user: 'pflow',
    password: '1234',
    database: 'mydb'
});

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
        console.log(result);
        connection.release(); // 풀 반환
        
        res.json(result);

    }catch(err){
        console.error("DB 쿼리 에러 : ",err);
        res.status(500).send('서버에러');
    }

    // const result = {ID,PW}

    // res.json(result)
    // console.log(result);
})

app.listen(4000, ()=>{
    console.log(`Server Start on 4000 Port !!`)
})