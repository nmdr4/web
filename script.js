document.body.addEventListener("click", () => {
  const img = document.getElementById("screamer");
  const audio = document.getElementById("audio");
  const mensaje = document.getElementById("mensaje");

  mensaje.style.display = "none";
  img.style.display = "block";

  // Volumen alto 😈
  audio.volume = 1.0;
  audio.play();

  // Pantalla completa
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  }
});
