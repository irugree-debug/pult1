const madinaInterface = document.getElementById("madina");
const manualButton = document.getElementById("manual"); // Кнопка 1
const lightsButton = document.getElementById("lights"); // Кнопка 2
const airHornButton = document.getElementById("airhorn"); // Кнопка 3
const hotKeyButton = document.getElementById("hotkey"); // Кнопка 4

// Слушатель клавиш
document.addEventListener('keydown', (event) => {
    if (madinaInterface.style.display === "block") {
        let action = 0;
        if (event.key === "1") action = 1;
        if (event.key === "2") action = 2;
        if (event.key === "3") action = 3;
        if (event.key === "4") action = 4;

        if (action > 0) {
            cef.emit("madina-action", action);
        }
    }
});

// Синхронизация подсветки кнопок с сервером
cef.on("update-button", (id, state) => {
    const btnMap = {1: manualButton, 2: lightsButton, 3: airHornButton, 4: hotKeyButton};
    const btn = btnMap[id];
    if (btn) {
        if (state === 1) {
            btn.style.background = "green";
            btn.style.boxShadow = "0px 0px 10px lime";
        } else {
            btn.style.background = "";
            btn.style.boxShadow = "";
        }
    }
});

cef.on("show-madina", () => {
    madinaInterface.style.display = "block";
});

cef.on("hide-madina", () => {
    madinaInterface.style.display = "none";
});
