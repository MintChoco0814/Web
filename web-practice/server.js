// express 모듈 불러오기
// 웹 서버를 쉽게 만들 수 있게 도와주는 라이브러리
const express = require("express");
// 파일 읽기/쓰기 기능을 사용하기 위함 fs(file system) 모듈
const fs = require("fs");
// 파일 경로를 안전하게 다루기 위한 path 모듈
const path = require("path");


const app = express();

// 클라이언트가 보낸 JSON 데이터를 자동으로 해석해줌
app.use(express.json());

// public 폴더 안의 파일들을 브라우저에서 접근 가능하게 만듬
app.use(express.static("public"));

// data.json 파일의 실제 경로 생성 
// __dirname 은 현재 server.js 파일이 있는 폴더 위치
const dataPath = path.join(__dirname, "data.json");

// POST 요청 처리
// 사용자가 데이터를 저장할 때 실행됨
app.post("/save", (req, res) => {
    // 사용자가 보낸 JSON 데이터 가져오기
    // req.body 안에는 클라이언트가 전송한 데이터가 들어있음
    const newData = req.body;

    // data.json 파일 읽기 
    // utf8은 문자열 형태로 읽겠다는 뜻
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "파일 읽기 실패"
            });
        }
        // 기존 데이터 배열 변환
        let jsonData = JSON.parse(data);
        // ID의 순번을 가짐
        const user_ID = String(jsonData.user_info.length + 1).padStart(3, "0");
        
        // 사용자가 입력한 이름과 나이를 저장
        const user = {
            user_id: user_ID,
            user_name: newData.user_name,
            user_age: newData.user_age
        };
        jsonData.user_info.push(user);

        // 수정된 데이터를 다시 data.json 파일에 저장
        fs.writeFile(
            // 저장할 파일경로 
            dataPath,
            // 객체를 JSON 문자열로 변환
            // null, 4 의미는 들여쓰기 4칸 적용임 
            JSON.stringify(jsonData, null, 4),
            (err) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "파일 저장 실패"
                    });
                }
                res.json({
                    message: "저장 성공"
                });
            }
        );
    });
});
// GET 요청 처리
app.get("/users", (req, res) => {
    //data.json 파일 읽기
    fs.readFile(dataPath, "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: "파일 읽기 실패"
            });
        }

        res.json(JSON.parse(data));

    });

});


// 서버 실행 
// http://localhost:3000
app.listen(3000, () => {
    console.log("서버 실행 완료!");
});