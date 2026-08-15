import { compare } from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { GetUserbyID, GetUserbyEmail } from "../Models/User.js";

const config = {
    usernameField: 'email_user',
    passwordField: 'password_user'
}

passport.use(new Strategy(config, async(email, password, done) => {
    try{
        const user = await GetUserbyEmail(email)
        if(!user){
            return done(null, false, {error: "Wrong Email"})
        }
        const pswd = compare(password, user.password_user)
        if(!pswd){
            return done(null, false, {error: "Wrong password"})
        }
        return done(null, user)
    }
    catch(error){
        return done(error)
    }
}))

passport.serializeUser((user, done)=>{
    return done(null, user.id_user)
})

passport.deserializeUser(async(Id, done)=>{
    try{
        const user = await GetUserbyID(Id)
        return done(null, user)
    }
    catch(error){
        return done(error)
    }
})



