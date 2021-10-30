
const socket = io("https://"+document.domain+":"+location.port); 

console.log(socket); 

socket.on('connect', async function() {
    var usr_name =  await get_Name();
    usr_name = usr_name.name;
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
    user_name = user_name.name;
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

    async function get_Name() {
        var user_name;
        return $.ajax({
            url: "/get_name",
            type: "GET",
            data: {name:user_name},
            crossDomain: true,
            dataType: 'json',
            success: function(data){
               return data.name;
            }
            });
    }
    

    // async function get_Name(){
    //     const response = await fetch("/get_name");
    //     const text = await response.json();
    //     return text["name"];
    // }