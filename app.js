const express=require('express');
const app=express();
const users=require('./MOCK_DATA.json');
const fs=require('fs')

const port=8000

app.use(express.urlencoded({extended:false}));

app.get('/api/user', function(req,res){
    return res.json(users)
})
app.get('/user', function(req,res){
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html)
})
app.route("/api/user/:id").get(function(req,res){
    const id = Number(req.params.id);
    const user = users.find((users)=> users.id == id)
    return res.json(user)  
}).patch((req,res) =>{
    res.join({status:'panding'})
})
.delete((req,res) => {})

app.post("/api/user",function(req,res){
    const body = req.body;
    users.push({...body, id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),function(err,data){
        return res.json({status:"success",id:users.length})
    })
})

app.listen(8000)