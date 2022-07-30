const express= require('express');
const app = express();
const port = 8080;


app.use("/public",express.static('public'))
app.set("views", "./src/Views");
app.set("view engine", "ejs");

// Router Setup
const objetRouter = require("./source/routes/objetRoutes");
const pieceRouter = require("./source/routes/pieceRoutes");
const utilisateurRouter = require("./source/routes/utilisateurRoutes");
const docsRouter = require("./source/routes/docsRoutes");
const authRouter = require("./source/routes/authRoutes");

// ROUTER
app.use("/", docsRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1/object", objectRouter);
app.use("/api/v1/piece", pieceRouter);
app.use("/api/v1/user", userRouter);

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
