const express=require('express');

const fs=require('fs');

const app=express();

app.use(express.urlencoded({extended:false}));
//-----login page-------
app.get('/login',(req,res)=>{
    const html=
    `
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">

	<input id="username" type="text" name="username">

	<button type="submit">Login</button>

</form>
    `
    res.send(html);

});

// -------chat page-----
app.post('/',(req,res)=>{
    const user=req.body.username;
    fs.appendFile('./users.txt',`\n${user}`,(err,data)=>{
        res.username=user;
        res.redirect('/');
    })
});

app.get('/', (req,res)=>{
    fs.readFile('./chat.txt','utf-8',(err,result)=>{
    if(err){
        console.log(err);
    }else{
       const html=`<p>${result}</p>
       <form action="/chat" onsubmit="document.getElementById('username').value=localStorage.getItem('username')"
        method="POST">
        <input type="text" name="msg" id="msg" placeHolder="message">
        <input type="hidden" name="username" id="username">

    <button type="submit">send</button></from>`;
    res.send(html);
    }
})
});

app.post('/chat',(req,res)=>{
    fs.appendFile('./chat.txt',`\n${req.body.username}: ${req.body.msg} `,(err,data)=>{
        res.redirect('/');
    })
})

app.listen(8000);