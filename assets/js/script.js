document.addEventListener("DOMContentLoaded", () => {
    // ================= ELEMENTS =================
    const terminal = document.getElementById("terminal");
    const terminalText = document.getElementById("terminal-text");
    const video = document.getElementById("Main");
    const audio = document.getElementById("myAudio");
    const blurredBox = document.getElementById("blurred-box");
    const closeBtn = document.getElementById("close-button");

    if (!terminal || !terminalText) return;

    // ================= SETTINGS =================
    const TYPE_SPEED = 40;
    const MAX_VOLUME = 0.1;
    const ASCII_SPEED = 5;     // ASCII art (nhanh hơn)


    let index = 0;
    let finished = false;

    const lines = [
        "User: My love",
        "IP: Loading...",
        "System: Loading...",
        "Bio Loaded",
        "Press Enter To Continue"
    ];

    // ================= INITIAL STATE =================
    video?.pause();
    audio?.pause();
    audio.volume = MAX_VOLUME;
    terminalText.style.textAlign = "center";

    // ================= TYPEWRITER =================
  function typeLine(text, cb, speed = TYPE_SPEED) {
    let i = 0;
    const interval = setInterval(() => {
        terminalText.textContent += text[i++] || "";
        if (i >= text.length) {
            clearInterval(interval);
            terminalText.textContent += "\n";
            cb && cb();
        }
    }, speed);
}


   function startTyping() {
    if (index === 0) {
        typeLine(getAsciiArt(), next, ASCII_SPEED); // ⚡ ASCII nhanh
    } else if (index <= lines.length) {
        typeLine(lines[index - 1], next); // chữ thường
    } else {
        finished = true;
        enableInput();
    }
}

    function next() {
        index++;
        startTyping();
    }

    // ================= INPUT =================
    function handleContinue() {
        if (!finished) return;

        terminal.style.display = "none";
        blurredBox.style.display = "block";

        video?.play().catch(() => {});
        audio?.play().catch(() => {});

        disableInput();
    }

    function onKey(e) {
        if (e.key === "Enter") handleContinue();
    }

    function enableInput() {
        document.addEventListener("keydown", onKey);
        terminal.addEventListener("click", handleContinue);
    }

    function disableInput() {
        document.removeEventListener("keydown", onKey);
        terminal.removeEventListener("click", handleContinue);
    }

    closeBtn?.addEventListener("click", handleContinue);

    // ================= IP FETCH =================
    fetch("https://api.ipify.org?format=json")
        .then(r => r.json())
        .then(d => lines[1] = "IP: " + d.ip)
        .catch(() => lines[1] = "IP: Hidden");

    // ================= SYSTEM INFO =================
    lines[2] = "System: " + getOS();

    // ================= CENTER TERMINAL =================
    function centerTerminal() {
        terminal.style.position = "absolute";
        terminal.style.left = (window.innerWidth - terminal.offsetWidth) / 2 + "px";
        terminal.style.top = (window.innerHeight - terminal.offsetHeight) / 2 + "px";
    }

    centerTerminal();
    window.addEventListener("resize", centerTerminal);

    // ================= START =================
    startTyping();

    // ================= HELPERS =================
    function getOS() {
        const ua = navigator.userAgent;

        if (/Windows NT 10\.0/.test(ua)) return "Windows 10 / 11";
        if (/Windows NT 6\.3/.test(ua)) return "Windows 8.1";
        if (/Windows NT 6\.1/.test(ua)) return "Windows 7";
        if (/Android/.test(ua)) return "Android";
        if (/Mac OS X/.test(ua)) return "macOS";
        if (/iPhone|iPad/.test(ua)) return "iOS";

        return "Unknown";
    }

    function getAsciiArt() {
        return `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⣿⣿⣾⣿⣷⠀⢀⣤⣾⠿⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⡄⠀
⠈⢿⣿⣿⣿⢟⣾⠿⠋⠀⠀⠈⢿⣆⣀⣀⣤⣀⣀⣠⣤⠶⠛⠛⠋⢹⣿⠀
⠀⠀⠙⠛⣵⡿⠁⠀⠀⠀⠀⠜⠉⡙⠉⠩⠋⢛⠛⠁⠀⠀⠀⠀⠀⢸⣿⠀
⠀⠀⠀⣼⠏⠀⠀⠀⠀⠀⠀⠀⡈⠀⠀⡆⠠⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀
⢀⣀⣼⠋⢀⣤⣄⠀⠀⠀⠀⠈⠀⠀⢀⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⣸⡇⠀
⠸⣏⠉⠀⠈⣛⣿⣷⣄⠂⠁⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣄⠀⠀⠀⣿⠁⠀
⢰⡟⠀⠀⣿⡿⠟⠋⠃⠀⠘⠦⠶⢦⡴⠂⠰⣿⣿⣟⡛⠋⠀⠀⠀⠙⣧⠀
⢸⡶⣀⣠⡴⣶⠖⠶⢦⣄⠀⢀⣤⣤⢤⣤⣤⡀⠙⠻⡿⠀⠀⠀⠐⢻⣏⠀
⢸⣇⣸⣫⣈⣠⣴⣶⣾⣿⣿⣿⣿⣿⣷⣯⡱⡝⣦⡀⠀⠀⠀⠀⢄⢀⡿⠃
⠀⢹⡟⠁⠉⢻⣿⠟⣿⣿⣿⣿⣿⣿⠛⠉⠛⠛⢾⣆⠑⠀⠤⠀⠀⢿⡁⠀
⠀⣿⠀⠀⠀⠀⣿⣦⣴⣿⣿⣿⣿⣷⠠⠀⠀⠀⠀⠀⠙⠦⡀⠀⣀⣼⠇⠀
⠀⣿⠁⠀⠀⢀⣿⣿⣿⣿⣿⡟⠻⢿⣇⠐⢄⠀⠀⠀⠀⠀⠄⠙⢿⣇⠀⠀
⠀⠹⣧⣀⣀⣾⣿⣿⣿⣿⣿⣧⣤⣾⣿⣧⡀⠁⠀⠀⠀⠀⠀⠀⠀⠙⢷⡄⠀⠀
        `;
    }
});
