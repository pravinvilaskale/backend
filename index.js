const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const app = express()
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

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));