var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
    "timeout" : 10000, //before connect_error and connect_timeout are emitted.
    "transports" : ["websocket"]
};


$(document).ready(function() {
const socket = io("http://"+document.domain+":"+location.port,connectionOptions); 

console.log(socket); 

socket.on('connect', async function() {
    var usr_name =  await get_Name();
    console.log(usr_name);
    if(usr_name != ''){
        socket.send('User has connected!');	
    }


$('#signin').on('click', function() {
    firstname = $("#firstname").val();
    lastname = $("#lastname").val();
    username = $("#username").val();
    password = $("#password").val();
    socket.emit('signin',{'firstname':firstname,'lastname':lastname,'username':username, 'password':password});
    console.log('sent');
    });

$('#login').on('click', function() {
    username = $("#username").val();
    password = $("#password").val();
    console.log(password);
    socket.emit('signin',{'username':username, 'password':password});
    console.log('sent');
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

$('#sendbutton').on('click', function() {
    socket.send($('#myMessage').val());
    $('#myMessage').val('');
    });

socket.on('message', async function(msg) {
    let user_name =  await get_Name();
    $("#messages").append('<li>'+user_name+''+msg+'</li>');
    console.log('Received message');
    });
    });


});

async function get_Name(){
    return fetch("/get_name")
    .then(function (response) {
        return  response.json();   
      })
      .then(function (text) {
        console.log(text['name']);
        return text["name"];
      });
}