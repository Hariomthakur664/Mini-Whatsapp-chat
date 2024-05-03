
const mongoose=require("mongoose");
const chat=require("./models/chat.js");

main()
.then((res)=>{
    console.log("connection successful",res);
})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats=[
    {
    from:"hariom",
    to:"shambhu",
    msg:"or kai hal bata",
    created_id:new Date(),
    },
    {
        from:"Aman",
        to:"sumit",
        msg:"send me your exam sheet",
        created_id:new Date(),
    },
    {
        from:"vinayak",
        to:"vaibhav",
        msg:"or kaha h",
        created_id:new Date(),
    },
    {
        from:"ankit",
        to:"kuldeep",
        msg:"to kb le bike",
        created_id:new Date(),
    },
];

chat.deleteMany();

