$(document).ready(function() {
const socket = io("https://"+document.domain+":"+location.port); 
console.log(socket);
    socket.on('connect', function() {
		socket.send('User has connected!');
	});


$('#signin').on('click', function() {
    firstname = $("#firstname").val();
    lastname = $("#lastname").val();
    username = $("#username").val();
    password = $("#password").val();
    socket.emit('signin',{'firstname':firstname,'lastname':lastname,'username':username, 'password':password});
    });

$('#login').click(function() {
username = $('#username').val();
password = $('#password').val();
    $.post('login',
    {
        username : username,
        password : password
        });
    });
    socket.on('message', function(data) {
        $("#messages").append('<li>'+data+'</li>');
            });

    $('#sendbutton').on('click', function() {
        socket.send($('#myMessage').val());
        $('#myMessage').val('');
        });

   

    async function get_Name() {
        var user_name;
        return $.ajax({
            url: "/get_name",
            type: "GET",
            data: {name:user_name},
            crossDomain: true,
            dataType: 'json',
            complete: function(data){
               return data.name;
            }
            });
    }
    

    // async function get_Name(){
    //     const response = await fetch("/get_name");
    //     const text = await response.json();
    //     return text["name"];
    // }
});