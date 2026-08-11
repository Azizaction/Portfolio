import { GetBannedWords, AddBannedWords } from "../Models/Filter.js"

const banned_words = await GetBannedWords()
const bw_list = banned_words.map(bw => bw.bw_word)
function FormFilter(username){

    const n_version = username.toLowerCase().replace(/[_.#@$-]/g, '').trim()
    const s_version = username.toLowerCase().replace(/[$]/, 's').replace(/[@]/, 'a').replace(/[#]/,'h').replace(/[_\.-]/g, '').trim()
    const nb_n_version = n_version.replace(/[0]/g, 'o').replace(/[1]/g, 'i').replace(/[3]/g, 'e').replace(/[4]/g, 'a')
    .replace(/[5]/g, 's').replace(/[7]/g, 't').replace(/[8]/g, 'b').replace(/[9]/g, 'g')
    const nb_s_version = s_version.replace(/[0]/g, 'o').replace(/[1]/g, 'i').replace(/[3]/g, 'e').replace(/[4]/g, 'a')
    .replace(/[5]/g, 's').replace(/[7]/g, 't').replace(/[8]/g, 'b').replace(/[9]/g, 'g')
    const no_nb_n_version = n_version.replace(/[0-9]/g, '')
    const no_nb_s_version = s_version.replace(/[0-9]/g, '')

    return [n_version, s_version, nb_n_version, nb_s_version, no_nb_n_version, no_nb_s_version];

}

export async function ValideUsername(username){
    if (!username){
        return false
    }else if (bw_list.includes(username)){
        return false
    }

    const versions = FormFilter(username)

    const invalid = versions.some(function(version){
        return bw_list.includes(version)
    })

    if(invalid){
        bw_list.push(username)
        AddBannedWords(username)
        return false
    }
    return true

}
