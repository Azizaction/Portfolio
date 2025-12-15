import 'dotenv/config'
import express, {json, request, response} from 'express'
import { engine } from "express-handlebars"
import {readFile} from "node:fs/promises"


const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(json())
app.use(express.static('Public'))
app.get('/', async (request, response) => {
    response.render('home', {
        title: 'Home',
        style: ['CSS/style.css'], 
        scripts: ['JS/home.js']
    })

})


console.log('Server Ready.');
console.log('http://localhost:' + process.env.PORT);
app.listen(process.env.PORT);