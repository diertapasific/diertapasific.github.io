// Function to handle user input
async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let chatBox = document.getElementById("chat-box");
    let userMessage = inputField.value.trim();

    if (!userMessage) return;

    // Create User Message Bubble
    let userBubble = document.createElement("div");
    userBubble.classList.add("chat-message", "user-message");
    userBubble.textContent = userMessage;
    chatBox.appendChild(userBubble);

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    inputField.value = "";

    // Simulate bot response
    let response = await getResponse(userMessage);

    // Create Bot Message Bubble
    let botBubble = document.createElement("div");
    botBubble.classList.add("chat-message", "bot-message");
    botBubble.textContent = response;
    chatBox.appendChild(botBubble);

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle Enter key press
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

    // Load default page (Chat)
    loadPage("chat");

    // Attach event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
        });
    });
});



