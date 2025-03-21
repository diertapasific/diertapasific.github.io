async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let userMessage = inputField.value.trim();

    if (!userMessage) return;

    let userBubble = document.createElement("p");
    userBubble.classList.add("user-message");
    userBubble.textContent = userMessage;
    chatBox.appendChild(userBubble);

    scrollToLatestMessage();

    inputField.value = "";

    setTimeout(async () => {
        let response = await getResponse(userMessage);

        let botBubble = document.createElement("p");
        botBubble.classList.add("bot-message");
        botBubble.textContent = response;
        chatBox.appendChild(botBubble);

        scrollToLatestMessage();
    }, 300);
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

document.addEventListener("DOMContentLoaded", function () {
    // Detect if the user is on a mobile device
    if (window.innerWidth <= 768) {
        document.querySelector(".sidebar").classList.add("collapsed");
    }
});

function scrollToLatestMessage() {
    let chatBox = document.getElementById("chat-box");
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth"
    });
}

// Detect when the keyboard is opened and adjust the input field
window.addEventListener("resize", () => {
    let inputContainer = document.querySelector(".input-container");
    if (window.innerHeight < 500) {  // Adjust this threshold if needed
        inputContainer.style.position = "absolute";
        inputContainer.style.bottom = "50px"; // Push it up
    } else {
        inputContainer.style.position = "sticky";
        inputContainer.style.bottom = "0";
    }
});

// add this amte
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

                // ✅ Re-run chatbot scripts when chat page loads
                if (page === "chat") {
                    checkDeviceAndSendMessage(); // Check device & send message
                    attachEventListeners(); // Reattach event listeners
                }
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

// ✅ Check if the user is on mobile and disable input
function checkDeviceAndSendMessage() {
    let inputField = document.getElementById("user-input");

    setTimeout(() => {
        if (window.innerWidth < 768) {  
            sendBotMessage("⚠️ My chatbot is currently only available on desktop. In the meantime, feel free to explore this website to learn more about Dierta—his background, experiences, and more! ");
            if (inputField) inputField.disabled = true;  // Disable input field
        } else {
            sendBotMessage("👋 Hello there! I'm ChatDP, Dierta's AI assistant. You can ask me anything about him in a full sentence, like 'What is your name?' and I'll do my best to help!");
            if (inputField) inputField.disabled = false;  // Enable input field
        }
    }, 300);
}

// ✅ Reattach event listeners for input field
function attachEventListeners() {
    const inputField = document.getElementById("user-input");
    if (inputField) {
        inputField.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
}

function adjustViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Adjust viewport height on load & resize
window.addEventListener("resize", adjustViewportHeight);
window.addEventListener("load", adjustViewportHeight);

// Detect keyboard opening on mobile & adjust input field
window.addEventListener("resize", () => {
    let inputContainer = document.querySelector(".input-container");
    let socials = document.querySelector(".socials");

    if (window.innerHeight < 600) {
        inputContainer.style.bottom = "50px"; // Moves input up
        socials.style.bottom = "120px"; // Moves socials up
    } else {
        inputContainer.style.bottom = "0"; // Reset position
        socials.style.bottom = "60px"; // Reset socials
    }
});