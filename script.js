document.body.addEventListener("click", () => {
  const img = document.getElementById("screamer");
  const audio = document.getElementById("audio");
  const mensaje = document.getElementById("mensaje");

  mensaje.style.display = "none";

  // Pantalla completa
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }

  audio.volume = 1.0;
  audio.play();

  let visible = false;

  // Parpadeo 😈
  const parpadeo = setInterval(() => {
    visible = !visible;
    img.style.display = visible ? "block" : "none";
  }, 100); // 👈 parpadea rápido (ms)

  // Después de un rato, deja la imagen fija
  setTimeout(() => {
    clearInterval(parpadeo);
    img.style.display = "block";
  }, 1500); // 1.5 segundos
});
