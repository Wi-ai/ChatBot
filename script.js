const chatBody  = document.querySelector(".Chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageBotten = document.querySelector("#send-message");

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


const API_KEY = "AIzaSyAvz-qYNu9VobEI3_WG-hGh_wlEF5J3fCk"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null
}


console.log("hey here ")

// Create message element with dynamic classes and reeturn it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
} 

// Generate bot response using the API
const generateBotResponse = async(prom) => {
    const requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: [{
                parts: [{text: prom}],
            }]
        })
    };
    try {
        //Fetch bot response from the API
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);
            // Handle error response
            console.error("API response not ok");

            console.log(data);
            return data
    }   catch (error) {
        console.error(error);
        return null
    }
}

// Handle outgoing user messages
const handleOutgoingMessage = async(e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();

    console.log(userData.message)


    messageInput.value = ""; // Clear input field

    // Create and display user message
    const messageContent = `<div class="message-text"></div>`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);

    const data = await generateBotResponse(userData.message)
    console.log(data)
    // Simulate bot response after a delay
   setTimeout(() => {
    const messageContent = `<span class="material-symbols-outlined"><img src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-large/1f642.png" alt=":slightly_smiling_face:"/></span>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;

    const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
    chatBody.appendChild(incomingMessageDiv);
    generateBotResponse();
   }, 600);
}



// Handle Enter key press to send message
messageInput.addEventListener("keyup", (e) => {
    const userMessage = e.target.value.trim();
    if(e.key === "Enter" && userMessage) {  
     handleOutgoingMessage(e);
    }
});

sendMessageBotten.addEventListener("click", (e) => handleOutgoingMessage(e))


