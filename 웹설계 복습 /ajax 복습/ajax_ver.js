$.ajax ({
    type: 'GET',
    url: 'data.json',
    dataType: 'json',

    success: function (data) {
        let content = ' ';
        for(let i = 0; i < data.users_information.length; i++) {
            content += `
            <h1> ${data.users_information[i].user_name} </h1>
            <h2> ${data.users_location[i].live_location} </h2>
            <h3> ${data.users_information[i].user_email} </h3>`
        }
        $('#test').html(content);
        // (
        //     `<h3> ${data.users_information[0].user_name} </h3>
        //     <p> ${data.users_location[0].live_location} </p>`);
        // }
    },
    error: function (xhr) {
        console.log(`Error : ${xhr.status}`);
    }
});