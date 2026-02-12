const socket = io();

const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesDiv = document.getElementById('messages');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const closeEmojiPicker = document.getElementById('closeEmojiPicker');
const emojiItems = document.querySelectorAll('.emoji-item');

let currentUsername = localStorage.getItem('username') || 'Guest';

// Display current username
if (document.getElementById('currentUsername')) {
  document.getElementById('currentUsername').textContent = currentUsername;
}

// Toggle emoji picker
emojiBtn.addEventListener('click', () => {
  emojiPicker.classList.toggle('hidden');
});

// Close emoji picker
closeEmojiPicker.addEventListener('click', () => {
  emojiPicker.classList.add('hidden');
});

// Add emoji to input
emojiItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const emoji = e.target.textContent;
    messageInput.value += emoji;
    messageInput.focus();
    emojiPicker.classList.add('hidden');
  });
});

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.emoji-picker') && !e.target.closest('.emoji-btn')) {
    emojiPicker.classList.add('hidden');
  }
});

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
