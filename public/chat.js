const socket = io();

const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesDiv = document.getElementById('messages');
let currentUsername = localStorage.getItem('username') || 'Guest';

// Display current username
if (document.getElementById('currentUsername')) {
  document.getElementById('currentUsername').textContent = currentUsername;
}

// Send message on button click
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    // Display own message on the right
    displayMessage(message, true, currentUsername);
    
    socket.emit('sendMessage', {
      text: message,
      username: currentUsername,
      timestamp: new Date().toLocaleTimeString()
    });

    messageInput.value = "";   // 👈 CLEAR INPUT AFTER SEND
  }
});


// Send message on Enter key
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

// Receive message from others
socket.on('receiveMessage', (data) => {
  displayMessage(data.text, false, data.username);
});

function displayMessage(text, isOwn, username = 'Guest') {
  const messageContainer = document.createElement('div');
  messageContainer.className = `message-container ${isOwn ? 'own-container' : 'other-container'}`;
  
  const usernameEl = document.createElement('div');
  usernameEl.className = 'message-username';
  usernameEl.textContent = username;
  
  const messageEl = document.createElement('div');
  messageEl.className = `message ${isOwn ? 'own' : 'other'}`;
  messageEl.textContent = text;
  
  messageContainer.appendChild(usernameEl);
  messageContainer.appendChild(messageEl);
  messagesDiv.appendChild(messageContainer);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

console.log('Chat app loaded');
