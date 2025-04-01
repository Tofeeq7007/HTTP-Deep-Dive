const express = require('express');
const app = express();

app.use(express.json());
const users = [];
// [
//  { 
        // username:harkirat
        // password:'123421'
//  }
// ]
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
} 
app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    

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
        const token = generateToken();
        found.token = token;
        res.json({
            message : token
        })
    }
    else res.json({
        message:"Invalid username or password"
    })
    console.log(users);

    
});

app.get('/me' , function(req,res){
    const token = req.headers.token;

    const find = users.find(item =>{
        if(item.token == token){
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