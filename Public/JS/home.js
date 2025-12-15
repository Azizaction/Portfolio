const text = document.getElementById('Text-lang');
const lang_index = 0
const chars = "abcdefghijklmnopkrstuvwxyz?!/";
const p = ""

const text_lang = {
  en: `Good Morning or Good Evening.<br>
It all depends on the time at which you are reading this message. In any case, I welcome you to my portfolio.<br>
So, what is a digital portfolio?<br>
To put it simply, it's an online space where developers like me share their work, even art, for some people.
On this site, you will discover what I’ve thought, imagined, coded, designed, and sometimes struggled to make work. 
(It’s no coincidence that most developers have no hair left or have become addicted to caffeine.) <br>
Of course, you won’t see raw lines of code here, but rather projects presented in a clear and simple way, with explanations of their conception step by step.
The purpose of this site is to show what I’m capable of. Whether you’re a recruiter, potential client, colleague, or just lost on the internet: you are welcome in my world.<br>
Of course, the rest of the site will be in English, for the sake of clarity and universality. Enjoy your visit :)`,
  fr: ` Bien le Bonjour ou bien le Bonsoir. <br>
Tout dépend de l'heure à laquelle vous lisez ce message. Quoi qu'il en soit, je vous souhaite la bienvenue sur mon portfolio. <br>
 Alors, un portfolio numérique, c’est quoi? <br>
Pour faire simple, il s’agit d’un espace en ligne où les développeurs comme moi partagent leur travail voir même de l’art, pour certains.
Sur ce site, vous allez découvrir ce que j’ai pensé, imaginé, codé, conçu et parfois galéré à faire fonctionner.
(C’est pas pour rien que la majorité des développeurs n’ont plus de cheveux ou sont devenus accros a la caféine)<br>
Bien sûr, vous ne verrez pas ici des lignes de code brutes, mais plutôt des projets présentés de manière claire et simple, avec l'explication de leur conception 
étapes par étapes. Le but de ce site est de montrer ce dont je suis capable. Que vous soyez recruteur, client potentiel, collègue, ou juste perdu sur 
internet : vous êtes le/la bienvenu(e) dans mon univers.<br>
Bien évidemment la suite du site sera en anglais, pour des raisons de clarté et d’universalité. Bonne visite :)`,
  ar: "Test3",
  es: "Test4",
  al: "Test5"
};


 async function SetLang(lang) {
    const LengthText = lang.length
    text.innerHTML = ""
    const text_cursor = document.createElement("span")
    text_cursor.id = "text-cursor"
    text.appendChild(text_cursor)
    let i = 0

  function SpaceChar(){
    console.log(LengthText)
    console.log(i)
        setTimeout(()=> {
          if (lang.slice(i, i+4) === "<br>") {
            const br = document.createElement("br")
            text.appendChild(br)
            br.parentNode.insertBefore(br, text_cursor)
            i+= 4
          }else{
            const span = document.createElement("span")
            text.appendChild(span)
            span.parentNode.insertBefore(span, text_cursor)
            span.textContent = lang[i] || "";
            i+=1     
          }
          if ( i == LengthText ) {
            text_cursor.style.animation = "none"
            text_cursor.style.opacity = "0"
            console.log("top")
            i = 0
            return 
          }
          
          if (i < LengthText) SpaceChar()
          },8)
        
        }
    SpaceChar()
}

document.addEventListener("DOMContentLoaded", () => {

  const langs = document.querySelectorAll(".lang-text li")
  const cursor = document.querySelector(".lang-cursor")
  const first_lang = langs[0]

  const left = first_lang.offsetLeft
  const width = first_lang.offsetWidth

  cursor.style.left = left + "px"
  cursor.style.width = width + "px"

  SetLang(text_lang["en"])

  langs.forEach((lang) => {
    lang.addEventListener("mouseover", () => {
      const left_lang = lang.offsetLeft
      const width_lang  = lang.offsetWidth
      const index = lang.dataset.index

      
      cursor.style.left = left_lang + "px"
      cursor.style.width = width_lang + "px"
      
      const left_cursor = cursor.offsetLeft
      const width_cursor = cursor.offsetWidth

      if ( left_lang == left_cursor && width_lang == width_cursor) {
        // no action
      } else{
        SetLang(text_lang[index])
      }

    })
  })
})
