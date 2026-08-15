const form = document.getElementById('sign-up-form')
const username = document.getElementById('username-sign-up')
const email = document.getElementById('email-sign-up')
const pswd = document.getElementById('pswd-sign-up')
const confirm_pswd = document.getElementById('confirm-pswd-sign-up')
const pswd_display = document.getElementById('opt-display')
const confirm_pswd_display = document.getElementById('confirm-opt-display')
const username_msg_info = document.getElementById('username-msg-info')
const email_msg_info = document.getElementById('email-msg-info')
const pswd_msg_info = document.getElementById('pswd-msg-info')
const confirm_pswd_msg_info = document.getElementById('confirm-pswd-msg-info')
const popup =  document.getElementById('user-verify-email')
const popup_text = document.getElementById('popup-email-value')

let UserNameTimer;
let UserEmailTimer;


username.addEventListener('input', function(){
    const username_value = this.value.trim().toLowerCase()
    const rule1 = username_value.length > 3
    const rule2 = /[!%^&*(),*+=|\';:?":{}|<>]/.test(username_value)

    clearTimeout(UserNameTimer)

    UserNameTimer = setTimeout(async function(){

        
    if(!username_value){
        username_msg_info.textContent = ''
        return
    }
    const response = await fetch('/api/valid-username',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username.value})
    })

    const result = await response.json()

    if (result.allowed&& !result.exist && rule1 && !rule2){
        username_msg_info.textContent = '✓ This username is available and valid'
        username_msg_info.style.color = 'green'
    }else if (!result.allowed){
        username_msg_info.textContent = '✕ This username can not be used as username. Please choose another one'
        username_msg_info.style.color = 'red'
    }else if (!rule1){
        username_msg_info.textContent = '✕ The username must be at least 4 characters long'
        username_msg_info.style.color = 'red'
    }else if (rule2){
        username_msg_info.textContent = '✕ The only special characters allowed are: _ - . @ # $'
        username_msg_info.style.color = 'red'
    }else if(result.exist){
        username_msg_info.textContent = '✕ This username is alraedy used by someone else. Please choose another one'
        username_msg_info.style.color = 'red'   
    }
    },500)

})

email.addEventListener('input', function(){

    const user_email = this.value.trim().toLowerCase()
    const rule1 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_email)
    const rule2 = user_email.length>4 && user_email.length<255

    clearTimeout(UserEmailTimer)

    UserEmailTimer = setTimeout(async function(){

        if(!user_email){
            email_msg_info.textContent = ''
            return
        }

        const response = await fetch('/api/valid-email',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email.value})
        })

        const result = await response.json()

        if (result.allowed && !result.exist && rule1 && rule2){
        email_msg_info.textContent = '✓ This email is available and valid'
        email_msg_info.style.color = 'green'
        }else if (!result.allowed && !rule2){
        email_msg_info.textContent = '✕ The email must be at least 5 or 254 characters long'
        email_msg_info.style.color = 'red'
        }else if (!result.allowed && !rule1){
        email_msg_info.textContent = '✕ the email must look like this: example@doamain.com '
        email_msg_info.style.color = 'red'
        }else if(result.exist){
        email_msg_info.textContent = '✕ This email is alraedy used by someone else. Please choose another one'
        email_msg_info.style.color = 'red'}
    }, 500)
})


pswd.addEventListener( 'input', function(){
    const pswd_value = this.value 

    const rule1 = pswd_value.length >= 8
    const rule2 = /[!@#$%^&*(),.?":{}|<>]/.test(pswd_value)
    const rule3 = (pswd_value.match(/\d/g) || []).length >= 2

    document.getElementById('rule-1').classList.toggle('valid', rule1)
    document.getElementById('rule-2').classList.toggle('valid', rule2)
    document.getElementById('rule-3').classList.toggle('valid', rule3)
});

[confirm_pswd, pswd].forEach(function(element) {
    element.addEventListener('input', function(){
    if(confirm_pswd.value === pswd.value){
        confirm_pswd_msg_info.textContent = '✓ The password match'
        confirm_pswd_msg_info.style.color = 'green'
    }else if(confirm_pswd.value === ''){
        confirm_pswd_msg_info.textContent = ''
    }else{
        confirm_pswd_msg_info.textContent = '✕ The password does not match'
        confirm_pswd_msg_info.style.color = 'red'
    }
    })
})  

pswd_display.addEventListener('click', function() {
    const TypeNew = pswd.type === 'password'? 'text': 'password'
    pswd.type = TypeNew
    this.textContent = TypeNew === 'password'? '👁️':'🙈' 
})

confirm_pswd_display.addEventListener('click', function() {
    const TypeNew = confirm_pswd.type === 'password'? 'text': 'password'
    confirm_pswd.type = TypeNew
    this.textContent = TypeNew === 'password'? '👁️':'🙈' 
})

function ValidForm(user_name, user_email, user_pswd, confirm_pswd){

    if(!user_name.value && !user_email.value && !user_pswd.value && !confirm_pswd.value){
        username_msg_info.textContent = '✕ Please enter a username to create your account'
        email_msg_info.textContent = '✕ Please enter a email to create your account'
        pswd_msg_info.textContent = '✕ Please enter a password to create your account'
        confirm_pswd_msg_info.textContent = '✕ Please confirm your password to create your account'
        username_msg_info.style.color = 'red'
        email_msg_info.style.color = 'red'
        pswd_msg_info.style.color = 'red'
        confirm_pswd_msg_info.style.color = 'red'
        return false
    }else if(!user_email.value){
        email_msg_info.textContent = '✕ Please enter a email to create your account'
        email_msg_info.style.color = 'red'
        return false
    }else if(!user_pswd.value){
        pswd_msg_info.textContent = '✕ Please enter a password to create your account'
        pswd_msg_info.style.color = 'red'
        return false
    }else if(!confirm_pswd.value){
        confirm_pswd_msg_info.textContent = '✕ Please confirm your password to create your account'
        confirm_pswd_msg_info.style.color = 'red'
        return false
    }else if(!user_name.value){
        username_msg_info.textContent = '✕ Please enter a username to create your account'
        username_msg_info.style.color = 'red'
        return false
    }

    return true 
}

async function signup(event){
    event.preventDefault()

    if(!ValidForm(username, email, pswd, confirm_pswd)){
        return
    }


    const data = {
        user_name : username.value,
        user_email: email.value,
        user_pswd: pswd.value
    }

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok){
        popup_text.textContent = email.value
        form.reset();
        popup.showModal()
    };

}

form.addEventListener('submit', signup);