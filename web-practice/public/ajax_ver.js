$.ajax ({
    type: 'GET',
    url: '/users',
    dataType: 'json',

    success: function (data) {
        let content = ' ';
        for(let i = 0; i < data.user_info.length; i++) {
            content += `
            <p> name: ${data.user_info[i].user_name} </p>
            <p> age: ${data.user_info[i].user_age} </p>
         `  
        }
        $('#test').html(content);

    },
    error: function (xhr) {
        console.log(`Error : ${xhr.status}`);
    }
});