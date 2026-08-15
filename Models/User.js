import {connexion} from "../DB/db.js"
import { hash } from "bcrypt"

export async function GetUserbyID(user_id){
    const User = await connexion.get(`SELECT * FROM users WHERE id_user = ?`, [user_id])
    return User
}

export async function GetUserbyEmail(user_email){
    const User = await connexion.get(`SELECT * FROM users WHERE email_user = ?`, [user_email])
    return User
}

export async function AddUser(user_name, user_email, user_pswd) {
    const pswd = await hash(user_pswd, 10)

    const querie = await connexion.run('INSERT INTO users (name_user, email_user, password_user) VALUES (?, ?, ?)', 
        [user_name, user_email, pswd])

    return querie.lastID
}