const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const Nexmo=require('nexmo');
const socketio=require('socket.io');
const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: '97475356',
    apiSecret: 'ymcX1ASqJXE2wV4U',
    
})
//init nextmo
// const nexmo = new Nexmo({
//     apiKey: '97475356',
//     apiSecret: 'ymcX1ASqJXE2wV4U',
//   },{debug:true});
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
    // res.send(req.body);
    // console.log(req.body);
//     const number=req.body.number;
//     const text=req.body.text;
//     nexmo.message.sendSms(
//         'Vonage APIs',number,text,{type:'unicode'},
//         (err,responseData)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 console.dir(responseData)
//             }
//         }
//     );
// }
const from = 'Vonage APIs';
const to = req.body.number;
const text = req.body.text;

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
            console.dir(responseData);
            const data={
                id:responseData.messages[0]['message-id'],
                number:responseData.messages[0]['to']
            }
            io.emit('smsstatus',data)
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})
}
)

//Define port
const port=3000;

//start server
const server=app.listen(port, () => console.log(`Server started at ${port}`));

//connect to socket io
const io =socketio(server);
io.on('connection',(socket)=>{
console.log("connected");
io.on('disconnect',()=>console.log('disconnected'));
})