async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let userMessage = inputField.value.trim();

    if (!userMessage) return;

    let userBubble = document.createElement("p");
    userBubble.classList.add("user-message");
    userBubble.textContent = userMessage;
    chatBox.appendChild(userBubble);

    inputField.value = "";

    setTimeout(async () => {
        let response = await getResponse(userMessage);

        let botBubble = document.createElement("p");
        botBubble.classList.add("bot-message");
        botBubble.textContent = response;
        chatBox.appendChild(botBubble);
    }, 500);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

document.getElementById("toggle-sidebar").addEventListener("click", function() {
    document.querySelector(".sidebar").classList.toggle("collapsed");
});

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => document.getElementById('main-content').innerHTML = data)
        .catch(error => console.log("Error loading page:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-list a");
    const chatContainer = document.querySelector(".chat-container");

    function loadPage(page) {
        let filePath = `pages/${page}.html`;

        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${filePath}`);
                return response.text();
            })
            .then(data => {
                chatContainer.innerHTML = data;
            })
            .catch(error => {
                chatContainer.innerHTML = "<h2>Page not found</h2>";
                console.error(error);
            });
    }

    loadPage("chat");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.getElementById("toggle-sidebar");
    const menuLinks = document.querySelectorAll(".nav-list a");

    if (!sidebar || !toggleButton) {
        console.error("Sidebar or Toggle Button not found!");
        return;
    }

    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 768) {
                sidebar.classList.add("collapsed");
            }
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("collapsed");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.getElementById("toggle-sidebar");

    if (!sidebar || !toggleButton) {
        console.error("Sidebar or Toggle Button not found!");
        return;
    }

    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });
});