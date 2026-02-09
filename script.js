<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>continuar</title>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
  cursor: pointer;
}

#screamer {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

#mensaje {
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-top: 40vh;
  font-family: arial, sans-serif;
}

#creditos {
  position: fixed;
  bottom: 6px;
  left: 6px;
  font-size: 9px;
  color: white;
  font-family: arial, sans-serif;
  opacity: 0.8;
}
</style>
</head>

<body>

<div id="mensaje"></div>
<div id="creditos">made by nmd4</div>

<img id="screamer" src="screamer.jpg">
<audio id="audio" src="screamer.mp3"></audio>

<script>
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
</script>

</body>
</html>
