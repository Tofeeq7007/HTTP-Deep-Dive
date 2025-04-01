const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomharkiratilovekira";
const app = express();

app.use(express.json());
const users = [];

app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    
    if(users.find(item => item.username == username)){
        return;
    }

    users.push({
        username:username,
        password: password
    })
    res.json({
        message: "You have sign up"
    })
    console.log(users);
});

app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    
    const found = users.find(item =>{
        if(item.username==username && item.password==password){
            return true;
        }
        else return false;
    })
    if(found){
        const token = jwt.sign({
            username:username, // ess encode karna hai
        },JWT_SECRET); // convert username into JWT using JWT_SECRET
        // found.token = token;
        res.json({
            message : token
        })
    }
    else res.status(403).json({
        message:"Invalid username or password"
    })
    console.log(users);

    
});

app.get('/me' , function(req,res){
    const token = req.headers.token;
    // const token = req.headers['token']; // not work
    const decodeInformation = jwt.verify(token,JWT_SECRET);
    const username = decodeInformation.username; // convert jwt  to username {username: "harkirat@gmail.com"}  

    const find = users.find(item =>{
        if(item.username == username){
            return true;
        }
    })
    if(find){
        res.json({
            username:find.username,
            password:find.password
        })

    } 
    else {
        res.json({
            message: "Invalid token"
        })
    }

})

app.listen(3000,()=>{
    console.log("Server Running");
    
});