const express = require('express');
const mysql = require('mysql2'); // mysql2 사용 (Promise API 지원)
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const cors = require('cors'); // CORS 모듈 가져오기
const path = require('path'); // path 모듈 가져오기

// CORS 설정
app.use(cors());

// JSON 요청 본문 파서
app.use(bodyParser.json());

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, '../build'))); // React 앱의 build 폴더를 정적 파일로 제공

// MySQL 데이터베이스 연결
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'study_memo'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// 통합된 API 엔드포인트
app.post('/api/saveStudyMemo', async (req, res) => {
  const {
    school_name,
    major,
    completion,
    graduation_year,
    name,
    email,
    age,
    contact,
    address1,
    address2,
    skill,
    careers // 경력 정보 배열
  } = req.body;

  try {
    let studyMemoIndex;

    // 기본 정보가 있는 경우 저장
    if (school_name || major || completion || graduation_year || name || email) {
      const saveStudyMemoQuery = `INSERT INTO study_memo 
                                  (school_name, major, completion, graduation_year, name, e_mail, age, telephone, address1, address2, skill_tag)
                                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const [result] = await db.promise().query(saveStudyMemoQuery, [
        school_name, major, completion, graduation_year, 
        name, email, age, contact, address1, address2, skill
      ]);

      studyMemoIndex = result.insertId; // 새로 삽입된 기본 정보의 ID
    }

    // 경력 정보가 있는 경우 저장
    if (careers || careers.length > 0 || studyMemoIndex) {
      const saveCareerQuery = 'INSERT INTO career(`index`, company_name, job_title, start_date, end_date) VALUES (?,?,?,?,?)';

      const careerPromises = careers.map(career => {
        return db.promise().query(saveCareerQuery, [
          studyMemoIndex, career.company_name, career.job_title, 
          career.start_date, career.end_date
        ]);
      });

      await Promise.all(careerPromises);
    }

    // 모든 정보가 성공적으로 저장된 후 응답
    res.status(200).json({ message: 'Data saved successfully', studyMemoIndex });
  } catch (err) {
    // 오류 발생 시 500 응답 전송
    res.status(500).json({ error: 'Failed to save data', details: err.message });
  }
});

// 모든 다른 요청을 React 앱으로 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





