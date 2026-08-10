import { Filter } from 'bad-words'

const filter = new Filter()


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
    }else if (filter.isProfane(username)){
        return false
    }

    FormFilter(username).forEach(function (version){
        if (filter.isProfane(version)){
            if (!filter.isProfane(username)){
                filter.addWords(username)
            }
            return false
        }     
    })

    return true

}
