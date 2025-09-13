// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }
}

// Select elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMsg = document.getElementById('successMsg');
const messageList = document.getElementById('messageList');

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('messages')) || [];
renderMessages();

// Validation functions
function validateName() {
  const name = nameInput.value.trim();
  const error = nameInput.nextElementSibling;
  if (name.length < 2) {
    error.textContent = 'Name must be at least 2 characters';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const error = emailInput.nextElementSibling;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    error.textContent = 'Invalid email format';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

function validateMessage() {
  const message = messageInput.value.trim();
  const error = messageInput.nextElementSibling;
  if (message.length < 10) {
    error.textContent = 'Message must be at least 10 characters';
    return false;
  } else {
    error.textContent = '';
    return true;
  }
}

// Real-time validation with debounce
nameInput.addEventListener('input', debounce(validateName, 300));
emailInput.addEventListener('input', debounce(validateEmail, 300));
messageInput.addEventListener('input', debounce(validateMessage, 300));

// Form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (!isNameValid || !isEmailValid || !isMessageValid) return;

  const newMessage = {
    id: Date.now(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
    time: new Date().toLocaleString()
  };

  messages.push(newMessage);

  // Save to localStorage
  try {
    localStorage.setItem('messages', JSON.stringify(messages));
  } catch (error) {
    console.error('localStorage error:', error);
  }

  renderMessages();
  form.reset();
  successMsg.textContent = 'Message sent successfully!';
  setTimeout(() => successMsg.textContent = '', 3000);
});

// Render messages
function renderMessages() {
  messageList.innerHTML = '';
  if (messages.length === 0) {
    messageList.innerHTML = '<li class="empty">No messages yet</li>';
    return;
  }

  messages.forEach(msg => {
    const li = document.createElement('li');
    li.dataset.id = msg.id;
    li.innerHTML = `
      <strong>From:</strong> ${msg.name} (${msg.email})<br>
      <strong>Message:</strong> ${msg.message}<br>
      <small>Sent: ${msg.time}</small>
      <button class="delete-btn">Delete</button>
    `;
    messageList.appendChild(li);
  });
}

// Event delegation for delete
messageList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.parentElement.dataset.id;
    messages = messages.filter(msg => msg.id != id);
    localStorage.setItem('messages', JSON.stringify(messages));
    renderMessages();
  }
});
