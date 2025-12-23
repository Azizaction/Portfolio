import { existsSync } from 'fs'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const IS_NEW = !existsSync(process.env.DB_FILE)

async function CreateDataBase(connexion) {
    await connexion.exec(`
        
        CREATE TABLE users(
            id_user INTEGER PRIMARY KEY,
            name-user TEXT PRIMARY KEY,
            email_user TEXT NOT NULL,
            password_user TEXT NOT NULL
        );
            
        CREATE TABLE projects(
            id_project INTEGER PRIMARY KEY,
            name_project TEXT NOT NULL,
            dsc_project TEXT NOT NULL,
            state_project TEXT NOT NULL,
            update_project TEXT NOT NULL,
            score_project INTEGER NOT NULL
        );
                
                
        CREATE TABLE reviews(
            id_review INTEGER PRIMARY KEY,
            id_user INTEGER,
            id_project INTEGER,
            text_review TEXT NOT NULL,
            nb_review INEGER NOT NULL,
            FOREIGN KEY(id_project) REFERENCES projects(id_project),
            FOREIGN KEY(id_user) RFERENCES users(id_user)
        );
                    
        CREATE TABLE comments(
            id_comment INTEGER PRIMARY KEY,
            id_user INTEGER,
            id_review INTEGER,
            text_comment TEXT NOT NULL,
            FOREIGN KEY (id_user) REFERENCES users (id_user),
            FOREIGN KEY (id_review) REFERENCES reviews (id_review)
        );

        CREATE TABLE pictures_project(
            id_picture INTEGER PRIMARY KEY,
            id_project INTEGER,
            name_picture TEXT NOT NULL,
            FOREIGN KEY(id_project) REFERENCES projects(id_project)
        );

        CREATE TABLE likes_review(
            id_like INTEGER PRIMARY KEY,
            id_user INTEGER,
            id_review INTEGER,
            like_state INEGER,
            FOREIGN KEY (id_user) REFERENCES users (id_user),
            FOREIGN KEY (id_review) REFERENCES reviews (id_review)            
        );
        
    `)

    return connexion                
}

let connexion = await open ({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
})

if (IS_NEW){
    connexion = await CreateDataBase(connexion)
}

export {connexion}