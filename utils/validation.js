
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
