const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const app = express()
const port = 3000
const {mogoUrl} = require('./keys')


require('./models/User')
const routes = require('./routes/routes')
const auth = require('./middleware/auth')

app.use([bodyParser.json(),express.json()])
app.use(routes)

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})



mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo Yeah!")
})

mongoose.connection.on('error', (err) => {
    console.log("this is error",err)
})


app.post('/', (req,res) => {
    console.log(req.body)
    res.send('Hello world')
})

app.get('/',auth,(req,res)=>{
    res.send("Your email is "+req.user.email)
})

app.listen(port, () => {
    console.log("server running" + port);
})
