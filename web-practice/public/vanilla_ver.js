fetch("/users")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let content = "";
        for(let i = 0; i < data.user_info.length; i++) {
            content += `
            <p> name: ${data.user_info[i].user_name} </p>
            <p> age: ${data.user_info[i].user_age} </p>`
        }
        document.getElementById("test").innerHTML = content;
    })
    .catch((error) => {console.log(`에러 발생 : ${error}`)});
