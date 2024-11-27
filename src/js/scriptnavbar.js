const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

function loadSavedStates() {
    // Check sidebar state
    const isSidebarClosed = localStorage.getItem('sidebarState') === 'closed';
    if (isSidebarClosed) {
        sidebar.classList.add("close");
    } else {
        sidebar.classList.remove("close");
    }

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add("dark");
        modeText.innerText = "MODO CLARO";
    } else {
        body.classList.remove("dark");
        modeText.innerText = "MODO OSCURO";
    }
}

loadSavedStates();

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    localStorage.setItem('sidebarState', 
        sidebar.classList.contains("close") ? 'closed' : 'open');
});

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
    localStorage.setItem('sidebarState', 'open');
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    if (body.classList.contains("dark")) {
        modeText.innerText = "MODO CLARO";
        localStorage.setItem('darkMode', 'true');
    } else {
        modeText.innerText = "MODO OSCURO";
        localStorage.setItem('darkMode', 'false');
    }
});