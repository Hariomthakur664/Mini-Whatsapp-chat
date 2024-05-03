const express=require("express");
let ejs=require("ejs");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const chat=require("./models/chat.js");
app.use(express.json());
const methodOverride = require('method-override')


main()
.then(()=>{
    console.log("connection successful");
}).catch((err)=>console.log(err));



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


//index routw
app.get("/chats", async (req,res)=>{
    let chats= await chat.find();
    res.render("index.ejs",{chats});
});

//New chat
app.get("/chats/new",  (req,res)=>{
    res.render("new.ejs");
});

//Creat Router
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    newChat.save()
    .then((res)=>{
        console.log("Chat was created");
    }).catch((err)=>{console.log(err)});
    res.redirect("/chats")
})

//Edit Router
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let Chat=await chat.findOne({_id:id});
    res.render("edit.ejs",{Chat});
})

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg: newMsg}=req.body;
    let updatChate=await chat.findOneAndUpdate({_id:id},{msg:newMsg},{runValidators:true});
    res.redirect("/chats");
})


//Distroy Route
app.delete("/chats/:id",async (req,res)=>{
     res.send(prompt("do you want to delet your chat "));
    let {id}=req.params;
    let deletedChate=await chat.findByIdAndDelete(id);
    
    res.redirect("/chats");
})

app.get("/",  (req,res)=>{
    res.send("working root");
})

app.listen(8080,()=>{
    console.log("app is listennig port 8080");
});