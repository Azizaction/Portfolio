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

pswd.value = ""
confirm_pswd.value = ""

pswd.addEventListener( 'input', function(){
    const pswd_value = this.value 

    const rule1 = pswd_value.length >= 8
    const rule2 = /[!@#$%^&*(),.?":{}|<>]/.test(pswd_value)
    const rule3 = (pswd_value.match(/\d/g) || []).length >= 2

    document.getElementById('rule-1').classList.toggle('valid', rule1)
    document.getElementById('rule-2').classList.toggle('valid', rule2)
    document.getElementById('rule-3').classList.toggle('valid', rule3)
})
[confirm_pswd, pswd].forEach(function(element) {
    element.addEventListener('input', function(){
    if(this.value === pswd.value){
        confirm_pswd_msg_info.textContent = '✓ Password match'
        confirm_pswd_msg_info.style.color = 'green'
    }else if(this.value === ''){
        confirm_pswd_msg_info.textContent = ''
    }else{
        confirm_pswd_msg_info.textContent = '✕ Password does not match'
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
