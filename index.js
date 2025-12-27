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
import './authentification.js'


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
        response.status(401)>end()
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
        layout: 'body',
        scripts: ['JS/about.js']
    })
})

app.get('/Signin', UserNotConnected, async(request, response)=>{
    response.render('Signin',{
        title: 'Sign-in',
        style: ['CSS/sign.css'],
        layout: 'sign',
        scripts: ['JS/home.js']
    })
})

console.log('Server Ready.');
console.log('http://localhost:' + process.env.PORT);
app.listen(process.env.PORT);