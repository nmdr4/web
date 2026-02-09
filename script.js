const traducciones = {
  es: "haz click para continuar",
  en: "click to continue",
  pt: "clique para continuar",
  fr: "cliquez pour continuer",
  de: "klicken um fortzufahren",
  it: "clicca per continuare",
  ru: "нажмите, чтобы продолжить",
  ja: "クリックして続行",
  zh: "点击继续"
}

const idioma = navigator.language.slice(0,2)
const mensaje = document.getElementById("mensaje")

mensaje.textContent = traducciones[idioma] || traducciones["en"]

async function iniciar() {
  const img = document.getElementById("screamer")
  const audio = document.getElementById("audio")

  mensaje.style.display = "none"

  audio.volume = 1
  audio.loop = true
  audio.play()

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  }

  let visible = false

  setInterval(() => {
    visible = !visible
    img.style.display = visible ? "block" : "none"
  }, 80)

  window.addEventListener("beforeunload", e => {
    e.preventDefault()
    e.returnValue = ""
  })

  if ("getScreenDetails" in window) {
    const details = await window.getScreenDetails()
    for (const screen of details.screens) {
      if (screen === details.currentScreen) continue
      window.open(
        location.href,
        "",
        `left=${screen.left},top=${screen.top},width=${screen.width},height=${screen.height}`
      )
    }
  }
}

document.body.addEventListener("click", iniciar, { once: true })
