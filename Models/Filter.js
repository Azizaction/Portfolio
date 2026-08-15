import { connexion } from "../DB/db.js";

export async function GetBannedWords(){
    const querie = connexion.all('SELECT bw_word FROM banned_words;')
    return querie
}

export async function AddBannedWords(bw_word){
    const querie = await connexion.run('INSERT INTO banned_words (bw_word) VALUES (?)', [bw_word])
}

export async function VerifyUserName(username){
    const querie = await connexion.get('SELECT * FROM users WHERE name_user = ?', [username])
    return querie
}

export async function VerifyUserEmail(user_email){
    const querie = await connexion.get('SELECT * FROM users WHERE email_user = ?', [user_email])
    return querie    
}