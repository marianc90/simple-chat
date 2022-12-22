let socket = io()
let user = ''
let chatbox = document.getElementById('chatbox')

Swal.fire({
    title:'Authentication',
    input: 'text',
    text: 'Set username',
    inputValidator: value=>{
        return !value.trim() && 'Please. Write a username!'
    },
    allowOutsideClick: false
}).then(result=>{
    user = result.value
    document.getElementById('username').innerHTML = user
})
//enviamos mensajes
chatbox.addEventListener('keyup',event=>{
    if(event.key==='Enter'){
        if(chatbox.value.trim().length>0){
            socket.emit('message',{
                user,
                message: chatbox.value
            })
            chatbox.value = ''
        }
    }
})
//recibir mensajes
socket.on('logs',data=>{
    const divLog = document.getElementById('messageLogs')
    let messages = ''
    data.reverse().forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });
    divLog.innerHTML = messages
})