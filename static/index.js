
const socket = io("https://"+document.domain+":"+location.port+'/home'); 

console.log(socket); 

socket.on('connect', function() {
    socket.emit('connected', {
        data: 'User Connected'
      })	
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
        $("#messages").append('<li>'+data['name']+': '+data['msg']+'</li>');
        
            });

    $('#sendbutton').on('click', function() {
        socket.emit('message',{
            data: $('#myMessage').val()
        })
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