const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const logsContainer = document.getElementById('logs-container');
const logsGrid = document.getElementById('logs-grid');
const logoutBtn = document.getElementById('logout-btn');
const rememberMeCheckbox = document.getElementById('remember-me');
const errorMsg = document.getElementById('error-msg');

const users = { "nmdra": "Xi-JinPingLoL1337", "backup": "$$backup1337$$" };
const API_URL = '/api/get';
const TOKEN = "miTokenSuperSecreto";

window.addEventListener('DOMContentLoaded', () => {
    const rememberedUser = localStorage.getItem('epihxUser');
    if (rememberedUser && users[rememberedUser]) {
        loginContainer.style.display = 'none';
        logsContainer.style.display = 'block';
        fetchLogs();
        setInterval(fetchLogs, 10000);
    }
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(users[username] && users[username] === password){
        if(rememberMeCheckbox.checked) localStorage.setItem('epihxUser', username);
        loginContainer.style.display = 'none';
        logsContainer.style.display = 'block';
        fetchLogs();
        setInterval(fetchLogs, 10000);
    } else {
        errorMsg.textContent = "Incorrect username or password.";
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('epihxUser');
    loginContainer.style.display = 'flex';
    logsContainer.style.display = 'none';
});

async function fetchLogs() {
    try {
        const res = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${TOKEN}` }
        });
        let data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
            console.warn("No hay logs en la API, creando log de prueba...");
            data = [{
                Name: "Test Game",
                Creator: "Test Creator",
                JobId: "test-123",
                Players: 5,
                IsStudio: false,
                Link: "https://www.roblox.com/games/123456",
                JoinLink: "https://www.roblox.com/games/123456/join?placeId=123456&jobId=test-123"
            }];
        }

        data.forEach(log => {
            if (!document.getElementById(log.JobId)) {
                createLogWindow(log);
            }
        });
    } catch(err) {
        console.error("Error al traer logs:", err);
    }
}

function createLogWindow(log) {
    const card = document.createElement("div");
    card.className = "log-card";
    card.id = log.JobId;

    card.innerHTML = `
        <h2>${log.Name}</h2>
        <p><strong>Creador:</strong> ${log.Creator}</p>
        <p><strong>Link:</strong> <a href="${log.Link}" target="_blank">${log.Link}</a></p>
        <p><strong>JobId:</strong> ${log.JobId}</p>
        <p><strong>Join JobID:</strong> <a href="${log.JoinLink}" target="_blank">${log.JoinLink}</a></p>
        <p><strong>Jugadores:</strong> ${log.Players}</p>
        <p><strong>Studio:</strong> ${log.IsStudio ? "Sí" : "No"}</p>
        <button class="delete-btn">Borrar Log</button>
    `;

    const btn = card.querySelector(".delete-btn");
    btn.addEventListener('click', () => {
        const confirmDelete = confirm("¿Seguro que querés borrar este log?");
        if(confirmDelete) {
            card.remove();
        }
    });

    logsGrid.appendChild(card);
}
