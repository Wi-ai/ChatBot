const chatBody  = document.querySelector(".Chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const closeButton = document.querySelector("#close-chatbot");

const cameroonInsults = [
  "You be big fool!",
  "Your head na coconut!",
  "You no get sense!",
  "See your nyanga, like bush meat.",
  "Your brain dey sleep.",
  "Waka like fowl wey lost.",
  "You sabi nothing!",
  "Na so so mumu you di do.",
  "You no even shame.",
  "You di smell like expired fufu.",
  "See your face like Monday morning.",
  "You dey craze?",
  "Na who born this one?",
  "Comot for road, jor!",
  "You na big mumu.",
  "You don chop witch soup?",
  "Your mouth be like kpuff kpuff.",
  "You no fit reason?",
  "Your eye dey like thief man own.",
  "Your sense dey for village?"
];


// Remove API key for security - we'll use local insults instead
// const API_KEY = "AIzaSyAvz-qYNu9VobEI3_WG-hGh_wlEF5J3fCk";
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null
}


console.log("Insulting Chatbot loaded! 😈")

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
} 

// Generate insulting bot response
const generateInsultingResponse = (userMessage) => {
    // Add some variety to responses
    const responses = [
        // Direct insults
        ...cameroonInsults,
        // Contextual insults based on user input
        `"${userMessage}" - hahaha, you think you're smart? ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 😂`,
        `Listen here, ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🤦‍♂️`,
        `Oh my days, ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 💀`,
        `You really typed "${userMessage}"? ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🤡`,
        `I can't believe you just said that! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🫢`,
        // More creative insults
        `Your message "${userMessage}" is as weak as your brain! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🧠💨`,
        `Typing "${userMessage}" won't save you from being a ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🚫`,
        `Even my grandma types better than "${userMessage}"! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 👵💪`,
        `"${userMessage}"? More like "${userMessage.split('').reverse().join('')}" because you're backwards! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🔄`,
        `Your message "${userMessage}" is shorter than your attention span! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} ⏰`,
        // Hackathon specific insults
        `This is a hackathon and you're still typing "${userMessage}"? ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 💻🤦‍♂️`,
        `Your code probably looks like "${userMessage}" too! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🐛💩`,
        `"${userMessage}" - that's what your debugging skills look like! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🐛🔍`,
        `Typing "${userMessage}" won't fix your broken code! ${cameroonInsults[Math.floor(Math.random() * cameroonInsults.length)]} 🚫🔧`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
};

// Generate bot response using local insults (no API needed)
const generateBotResponse = async (userMessage) => {
    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    // Generate insulting response
    const insult = generateInsultingResponse(userMessage);
    
    return {
        success: true,
        message: insult
    };
};

// Handle outgoing user messages
const handleOutgoingMessage = async (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();
    
    if (!userMessage) return;

    userData.message = userMessage;
    console.log("User message:", userData.message);

    messageInput.value = ""; // Clear input field

    // Create and display user message
    const userMessageContent = `<div class="message-text">${userData.message}</div>`;
    const outgoingMessageDiv = createMessageElement(userMessageContent, "user-message");
    chatBody.appendChild(outgoingMessageDiv);

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show thinking indicator
    const thinkingContent = `<span class="material-symbols-outlined"><img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-large/1f642.png" alt=":slightly_smiling_face:"/></span>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;

    const thinkingMessageDiv = createMessageElement(thinkingContent, "bot-message", "thinking");
    chatBody.appendChild(thinkingMessageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        // Generate bot response
        const response = await generateBotResponse(userData.message);
        
        if (response.success) {
            // Remove thinking indicator
            thinkingMessageDiv.remove();
            
            // Create and display bot response
            const botMessageContent = `<span class="material-symbols-outlined"><img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-large/1f642.png" alt=":slightly_smiling_face:"/></span>
                <div class="message-text">${response.message}</div>`;

            const botMessageDiv = createMessageElement(botMessageContent, "bot-message");
            chatBody.appendChild(botMessageDiv);
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        } else {
            throw new Error("Failed to generate response");
        }
    } catch (error) {
        console.error("Error generating response:", error);
        
        // Remove thinking indicator
        thinkingMessageDiv.remove();
        
        // Show error message
        const errorContent = `<span class="material-symbols-outlined"><img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-large/1f642.png" alt=":slightly_smiling_face:"/></span>
            <div class="message-text">Wahala! Something went wrong. You're still a mumu though! 😂</div>`;

        const errorMessageDiv = createMessageElement(errorContent, "bot-message");
        chatBody.appendChild(errorMessageDiv);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
};



// Handle close/minimize button
const handleCloseChatbot = () => {
    const chatbot = document.querySelector(".Chatbot-popup");
    chatbot.style.transform = "translateY(100vh)";
    chatbot.style.transition = "transform 0.3s ease";
    
    // Show a button to reopen
    setTimeout(() => {
        const reopenButton = document.createElement("button");
        reopenButton.innerHTML = "😈 Open Insulting Chat";
        reopenButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #5350C4;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(83, 80, 196, 0.3);
            z-index: 1000;
        `;
        reopenButton.onclick = () => {
            chatbot.style.transform = "translateY(0)";
            reopenButton.remove();
        };
        document.body.appendChild(reopenButton);
    }, 300);
};

// Handle Enter key press to send message
messageInput.addEventListener("keyup", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage && !e.shiftKey) {
        e.preventDefault();
        handleOutgoingMessage(e);
    }
});

// Event listeners
sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
closeButton.addEventListener("click", handleCloseChatbot);

// Add some initial insults when page loads
window.addEventListener("load", () => {
    setTimeout(() => {
        const welcomeInsults = [
            "Welcome to the most insulting chatbot ever! 😈",
            "You ready to get roasted? Because you're about to! 🔥",
            "Let's see how long you can handle the truth! 💀"
        ];
        
        const randomInsult = welcomeInsults[Math.floor(Math.random() * welcomeInsults.length)];
        const welcomeContent = `<span class="material-symbols-outlined"><img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-large/1f642.png" alt=":slightly_smiling_face:"/></span>
            <div class="message-text">${randomInsult}</div>`;

        const welcomeMessageDiv = createMessageElement(welcomeContent, "bot-message");
        chatBody.appendChild(welcomeMessageDiv);
    }, 1000);
});


