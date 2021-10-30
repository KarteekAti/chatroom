
const socket = io("http://"+document.domain+":"+location.port); 

console.log(socket); 

socket.on('connect', async function() {
    var usr_name =  await get_Name();
    console.log(usr_name);
    if(usr_name != ''){
        var data = {
            'name': usr_name,
            'msg': 'User has connected!'
        };
        socket.emit('message',data);	
    }

$('#signin').on('click', function() {
    firstname = $("#firstname").val();
    lastname = $("#lastname").val();
    username = $("#username").val();
    password = $("#password").val();
    socket.emit('signin',{'firstname':firstname,'lastname':lastname,'username':username, 'password':password});
    });

$('#login').on('click', function() {
    username = $("#username").val();
    password = $("#password").val();
    socket.emit('signin',{'username':username, 'password':password});
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

$('#sendbutton').on('click', async function() {
    var user_name =  await get_Name();
    var msg = $('#myMessage').val()
    var data = {
        'name': user_name,
        'msg' : msg
    };
    socket.emit('message',data);
    $('#myMessage').val('');
    });

    socket.on('message', async function(data) {
    $("#messages").append('<li>'+data['name']+':'+data['msg']+'</li>');
        });
    });


async function get_Name(){
    return fetch("/get_name")
    .then(function (response) {
        return  response.json();   
       })
       .then(function (text) {  
         return text["name"];
       });
}