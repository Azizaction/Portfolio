 import { ValideUsername } from "./FilterUser.js"

export async function ValidEmail(user_email){
    function ValideEmailFormat(user_email){
        const email_value = user_email.trim().toLowerCase()

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_value)
    }

    if (user_email.length<5 || user_email.length > 254){
        return false
    }
    if(!ValideEmailFormat(user_email)){
        return false
    }
    return {ok: true, user_email, info: 'valide email'}
}

export async function ValidUserName (user_name){

    const username_value = user_name.toLowerCase().trim()
    const rule1 = username_value.length > 3
    const rule2 = /[!%^&*(),*+=|\';:?":{}|<>]/.test(username_value)

    if(!rule1 || rule2 || !ValidUserName){
        return false
    }

    return true
}

export async function ValidPswd(pswd){

    const rule1 = pswd.length >= 8
    const rule2 = /[!@#$%^&*(),.?":{}|<>]/.test(pswd)
    const rule3 = (pswd.match(/\d/g) || []).length >= 2

    if(!rule1 || !rule2 || !rule3){
        return false
    }

    return true
}