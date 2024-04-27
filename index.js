const http = require("http")
const url = require(url)
const user = []
const createUser = (req, res)=>{
    let body = ""

    req.on("data", chunk=>{
        body += chunk.toString()
    });
    try{
        const newUser= JSON.parse(body);
        const existingUser = users.find(user=> user.email===newUser.email);
        if(existingUser){
            res.statusCode = 400;
            res.end('{message:"Email already exists}')
            return;
        }
    
        users.push(newUser);
        res.stausCode = 201;
        res.end('{message: "User created sucessfully"}')
    }catch (error){
        res.statusCode = 400
        res.end('{"message":"Invalid user data "}')
    }

}


const authenticateUser = (req, res)=>{
    let body= ""
    req.on("data", chunk=>{
        body += chunk.toString()
    });

    req.on('end', ()=>{
        try{
            const{email, password} = JSON.parse(body)
            const user = users.find(user=>user.email ===email);
            if(!user || user.password != password)
            res.statusCode = 401;
        res.end('{messade: "Invalid credentials"}')
        return;
        }
        res.statusCode = 200;
        res.end ('{"message:"}')
    })
}

