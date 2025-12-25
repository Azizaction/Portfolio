import {connexion} from "../DB/db.js"

export async function GetUserbyID(user_id){
    const User = await connexion.get(`SELECT * FROM users WHERE user_id = ?`, [user_id])
    return User
}

export async function GetUserbyEmail(user_email){
    const User = await connexion.get(`SELECT * FROM users WHERE user_email = ?`, [user_email])
    return User
}