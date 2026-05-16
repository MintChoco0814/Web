// data.json 파일을 서버(또는 현재 폴더) 에서 가져옴
fetch("data.json")
    // fetch()가 성공하면 response 객체를 받음
    .then((response) => {
        /*
            response 안의 JSON 데이터를 JavaScript 객체로 변환 
            여기서 response.json()은 Promise를 반환함 
            비동기 처리 방식 
        */ 
        return response.json();
    })
    // JSON 변환이 끝난 실제 데이터를 data로 받음
    .then((data) => {
        // HTML 태그들을 저장할 빈 문자열 생성
        let contentStr = "";
        // users_information 배열 길이만큼 반복함 
        for(let i = 0; i < data.users_information.length; i++) {
        //    console.log(`${data.users_information[i].user_name}` + ` ${data.users_location[i].live_location}`)
            contentStr += `
                <h3>${data.users_information[i].user_name}은 현재</h3>
                <p>${data.users_location[i].live_location}에 있습니다.</p>
            `;
        }
        /*
            id가 test인 HTML 요소를 선택 
            innerHTML을 사용해서 contentStr 안의 HTML 태그들을 화면에 출력 
        */
        document.getElementById("test").innerHTML = contentStr;
    })
    // fetch 실패 또는 JSON 변환 실패 시 실행 
    .catch((error) => {
        console.log("에러 발생 : ", error);
    });
