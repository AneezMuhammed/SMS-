const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const Nexmo=require('nexmo');
const socketio=require('socket.io');

//init app
const app=express();

// Template engine setup
app.set('view engine','html');
app.engine('html',ejs.renderFile);

//public forlder setup
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//Index route
app.get('/',(req,res)=>{
    res.render('index')
})
//catch from submit
app.post('/',(req,res)=>{
    res.send(req.body);
    console.log(req.body);
})

//Define port
const port=3000;

//start server
const server=app.listen(port, () => console.log(`Server started at ${port}`));
