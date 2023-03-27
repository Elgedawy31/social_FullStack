const express  = require('express');
const env = require('dotenv')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const path= require('path')
const morgan = require( 'morgan')
const userRouter = require('./routes/users.routes.js')
const authRouter = require('./routes/auth.routes.js')
const postrouter = require('./routes/post.routes.js')
const conversationRouter = require('./routes/conversation.routes.js')
const messageRouter = require('./routes/message.routes.js')
const app = express()
env.config()

app.use(cors())


app.use('/uploads'   , express.static(path.join(__dirname , './uploads')))

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('Successfully connected to MongoDB'));
db.on('error', (e) => console.log(e));


app.use(express.json())
// app.use(helmet())
// app.use(morgan('common'))


app.use('/api/users' ,userRouter )
app.use('/api/auth' ,authRouter )
app.use('/api/post' ,postrouter )
app.use('/api/conversation' ,conversationRouter )
app.use('/api/message' ,messageRouter )



app.get('/' , (req , res) => {

    res.send('aha')
})






app.listen(process.env.PORT , () => {

    console.log(`app listening in http://localhost:${process.env.PORT}`)

})