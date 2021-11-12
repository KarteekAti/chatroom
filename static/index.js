function toggle_visible(){
    var x = document.getElementsByClassName("dropdown");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}


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
    window.location.href = '/login';
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
        if(data.name != null){
        $("#messages").append('<li>'+data['name']+': '+data['msg']+'</li>');}
            });
            
    $('#sendbutton').on('click', function() {
        socket.send($('#myMessage').val());
        $('#myMessage').val('');
        });
});

