import { response } from "express"

const form = document.getElementById('sign-in-form')
const email = document.getElementById('email-sign-in')
const pswd = document.getElementById('pswd-sign-in')
const pswd_display = document.getElementById('opt-display')
const err = document.getElementById('sign-in-error-msg')

pswd_display.addEventListener('click', function() {
    const TypeNew = pswd.type === 'password'? 'text': 'password'
    pswd.type = TypeNew
    pswd_display.textContent = TypeNew === 'password'? '👁️':'🙈' 
})

function ValideEmalFormat(user_email){
    const email_value = user_email.trim().toLowerCase()

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_value)
}

function ValideEmail(user_email){
    if (user_email.length()> 6 || user_email.length() < 254){
        return {ok: false, user_email, info: 'invalide length'}
    }
    if(!ValideEmalFormat(user_email)){
        return {ok: false, user_email, info: 'invalide format'}
    }
    return {ok: true, user_email, info: 'valide email'}
}

function Valideform (user_pswd, user_email){
    if(!user_pswd.value && !user_email.value){
        err.innerText = 'Please fill all the fields'
        return false
    }
    if(!user_email.value){
        err.innerText = 'Please enter an email'
        return false
    }
    if(!user_pswd){
        err.innerText = 'Please enter an password'
        return false
    }
    if(!ValideEmail(user_email)){
        err.innerText = 'Please enter a valide email'
        return false
    }

    return true
}

async function connexion (event){
    event.preventDefault();

    if(!Valideform(pswd.value, email.value)){
        return
    }

    const data = {
        email_user: email.value,
        password_user: pswd.value
    };

    const reponse = await fetch ('/api/connexion', {
        method: 'POST',
        headers: { 'content-Type' : 'application/JSON' },
        body: JSON.stringify(data)
    })

    if (response.ok){
        location.replace('/')
    }
    else if (response.status === 401){
        const message = await response.json()
        if (message.error === 'Wrong email'){
            err.innerText = 'There\'s no user under this email'
        }
        if ( message.error === 'Wrong password'){
            err.innerText = 'Wrong password'
        }
    }
}

form.addEventListener( 'submit', connexion)