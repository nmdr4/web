async function iniciar() {
  const img = document.getElementById("screamer")
  const audio = document.getElementById("audio")
  const mensaje = document.getElementById("mensaje")

  mensaje.style.display = "none"

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  }

  audio.volume = 1
  audio.play()

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
