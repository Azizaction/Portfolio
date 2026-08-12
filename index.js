import 'dotenv/config'
import express, {json, request, response} from 'express'
import { engine } from "express-handlebars"
import {readFile} from "node:fs/promises"
import helmet from 'helmet'
import cors from'cors'
import session from 'express-session'
import passport from 'passport'
import { RedisStore } from 'connect-redis'
import { createClient } from 'redis'
import { GetUserbyID } from './Models/User.js'
import './auth/authentification.js'
import { ValideUsername } from './utils/FilterUser.js'
import { VerifyUserName, VerifyUserEmail } from './Models/Filter.js'
import { ValidEmail, ValidUserName, ValidPswd} from './utils/validation.js'
import { AddUser } from './Models/User.js'

const app = express();

app.use(helmet())
app.use(cors())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(json())

const RedisClient = createClient({
    url: process.env.REDIS_URL
})

await RedisClient.connect()

const store = new RedisStore ({
    client: RedisClient,
    prefix: "sess:"
})

app.use(session({
    store,
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly:true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'lax'
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('Public'))

function UserConnected(request, response, next){
    if(!request.user){
        response.status(401).end()
        return 
    }
    next()
}

function UserNotConnected(request, response, next){
    if(request.user){
        response.status(401).end()
        return
    }
    next()
}

app.get('/', async (request, response) => {
    response.render('home', {
        title: 'Home',
        style: ['CSS/style.css'], 
        scripts: ['JS/home.js']
    })

})

app.get('/About', async (request, response) => {
    response.render('About',{
        title: 'About Me',
        style: ['CSS/style.css'],
        scripts: ['JS/about.js']
    })
})

app.get('/Signin', UserNotConnected, async(request, response)=>{
    response.render('Signin',{
        title: 'Sign-in',
        style: ['CSS/sign.css'],
        layout: 'sign',
        scripts: ['JS/signin.js']
    })
})

app.get('/Signup', UserNotConnected, async(request, response)=>{
    response.render('Signup',{
        title: 'Sign-up',
        style: ['CSS/Sign.css'],
        layout:'sign',
        scripts: ['JS/signup.js']
    })
})

app.post('/api/valid-username', UserNotConnected, async(request, response)=>{

    const username = request.body.username
    const isValid = await ValideUsername(username)
    const isExist = await VerifyUserName(username)

    if(isValid && isExist){
        response.status(409).json({allowed: true, exist: true})
    }else if (!isValid ){
        response.status(400).json({allowed: false, exiist: false})
    }else if(isValid && !isExist){
        response.status(200).json({allowed: true, exist: false})
    }else{
        response.status(400).end()
    }
})

app.post('/api/valid-email', UserNotConnected, async(request, response)=>{

    const email = request.body.email
    const isValid = await ValidEmail(email)
    const isExist = await VerifyUserEmail(email)

    if(isValid && isExist){
        response.status(409).json({allowed: true, exist: true})
    }else if (!isValid ){
        response.status(400).json({allowed: false, exiist: false})
    }else if(isValid && !isExist){
        response.status(200).json({allowed: true, exist: false})
    }else{
        response.status(400).end()
    }   

})

app.post('/api/signup', UserNotConnected, async(request, response, next)=>{
    const user_name = request.body.user_name
    const user_email = request.body.user_email
    const user_pswd = request.body.user_pswd

    const isValid = await ValidEmail(user_email) && await ValidUserName(user_name) && await ValidPswd(user_pswd)
    const isExist = await VerifyUserEmail(user_email) || await VerifyUserName(user_name)

    if(isExist){
        response.status(409).end()
    }else if(!isValid){
        response.status(400).end()
    }else if(isValid && !isExist){
        try{
            AddUser(user_name, user_email, user_pswd)
            response.status(201).end()
        }catch(err){
            next(err)
        }
    }else{
        response.status(400).end()
    }
})
console.log('Server Ready.');
console.log('http://localhost:' + process.env.PORT);
app.listen(process.env.PORT);