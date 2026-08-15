
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
    if (user_email.length<6 || user_email.length > 254){
        return {ok: false,  info: 'invalide length'}
    }
    if(!ValideEmalFormat(user_email)){
        return {ok: false, info: 'invalide format'}
    }
    return {ok: true, user_email, info: 'valide email'}
}

function Valideform (user_pswd, user_email){
    if(!user_pswd && !user_email){
        err.innerText = 'Please fill all the fields'
        return false
    }
    if(!user_email){
        err.innerText = 'Please enter an email'
        return false
    }
    if(!user_pswd){
        err.innerText = 'Please enter an password'
        return false
    }
    if(ValideEmail(user_email).ok === false){
        err.textContent = 'Please enter a valide email'
        return false
    }

    return true
}

async function signin (event){
    event.preventDefault();

    
    if(!Valideform(pswd.value, email.value)){
        return;
    }
    
    const data = {
        email_user: email.value,
        password_user: pswd.value
    };

    const response = await fetch ('/api/signin', {
        method: 'POST',
        headers: { 'content-Type' : 'application/JSON' },
        body: JSON.stringify(data)
    })

    

    if (response.ok){
        location.href = '/'
    }
    else if (response.status === 401){
            err.innerText = 'The email address or the password are not valid, please try again'
    }
}

form.addEventListener( 'submit', signin)