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
    socket.on('login',
    {
        'username' : username,
        'password' : password
        });
    });
    socket.on('message', function(data) {
        $("#messages").append('<li>'+data['name']+': '+data['msg']+'</li>');
            });

    $('#sendbutton').on('click', function() {
        socket.send($('#myMessage').val());
        $('#myMessage').val('');
        });
});