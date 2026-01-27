document.body.addEventListener("click", () => {
  const img = document.getElementById("screamer");
  const audio = document.getElementById("audio");
  const mensaje = document.getElementById("mensaje");

  mensaje.style.display = "none";

  // Pantalla completa
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }

  audio.volume = 0.2;
  audio.play();

  let visible = false;

  // Parpadeo INFINITO 😈
  setInterval(() => {
    visible = !visible;
    img.style.display = visible ? "block" : "none";
  }, 80); // 👈 baja el número si quieres más locura
});
