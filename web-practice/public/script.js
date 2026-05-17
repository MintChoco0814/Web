
// HTML에서 버튼 요소들 가져옴
const saveBtn = document.getElementById("saveBtn");
const AjaxBtn = document.getElementById("AjaxBtn");
const VanillaBtn = document.getElementById("VanillaBtn");

// AJAX 방식으로 만든 페이지로 이동하는 버튼 이벤트 처리 코드
AjaxBtn.addEventListener("click", function(){
    window.location.href = "read_json_ajax.html";
});
// Vanilla 방식으로 만든 페이지로 이동하는 버튼 이벤트 처리 코드
VanillaBtn.addEventListener("click", function(){
    window.location.href = "read_json_vanilla.html";
});
// 저장 버튼 이벤트
saveBtn.addEventListener("click", function() {
    // 입력창의 입력한 값을 가져옴
    const userName = document.getElementById("user_name").value;
    const userAge = document.getElementById("user_age").value;
   
    // 서버로 보낼 사용자 데이터 객체 생성 
    const userData = {
        user_name: userName,
        user_age: userAge
        // name: userName,
        // age: userAge
    };

    console.log("보내는 데이터: ", userData);
    
    // fetch()로 서버에 데이터 전송 
    fetch("/save", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("서버 응답: ",data);
        alert("저장 완료");
    })
    .catch((error) => {
        console.log(error);
    });
});