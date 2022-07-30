const express= require('express');
const app = express();
const port = 8080;

app.get('/hello',(req,res) => {
  res.send('Hello,World')

});

app.listen(port, () =>
    console.log('Notre application Node est démarrée sur: http://localhost:'+port)
 )

app.use(express.static(__dirname , ''));
app.get('/index',(req,res) =>{
         res.sendFile(__dirname +'/index.html')
 });

app.use(express.static(__dirname ,''));
app.get('/inscrire',(req, res)=>{
    res.sendFile(__dirname + '/inscrire.html')
});

app.use(express.static(__dirname ,''));
app.get('/connecter',(req, res)=>{
    res.sendFile(__dirname + '/connecter.html')
});
