const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.json())

const data = {

}


const USERS = [
    {id:1,username:"admin",password:'1234'},
    {id:2,username:"owner",password:'5678'}
]

const MOCK_TOKENS = {
    'mock-token-admin-123': {id:1,username:'admin'},
    'mock-token-owner-456': {id:2, username:'owner'}
}


app.use(cors());

app.post('/api/auth/login',
    (req,res)=>{
        const {username,password } = req.body;
        const user = USERS.find(u => u.username === username && u.password === password)

        if(!user){
            return res.status(401).json({success:false,message:'Invalid credentials'})
        }

        const token = user.id === 1 ? 'mock-token-admin-123' : 'mock-token-owner-456'

        res.json({
            success:true,
            token:token,
            user:{id:user.id,username: user.username}
        })
    }
)

app.get('/api/data',(req,res)=>{
    const auth = req.headers.authorization
    const token = auth && auth.split(' ')[1]

    if(!token || !MOCK_TOKENS[token]){
        return res.status(401).json({message:"Unauthorized: Invalid or missing token"})
    }

    const user = MOCK_TOKENS[token]
    try{
        const data = require('./db.json')        
        res.json(data)
    }catch(error){
        res.status(500).json({error:'Failed to load data'})
    }
})


app.listen(PORT,()=>{
    console.log(`Mock API http://localhost:${PORT}`)
    console.log('POST /login -> mock token')
    console.log('GEt /data -> with headers authorization')
})