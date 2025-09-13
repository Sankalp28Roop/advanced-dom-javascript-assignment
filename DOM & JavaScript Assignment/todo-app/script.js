// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// DOM elements
const todoText = document.getElementById('todoText');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const searchText = document.getElementById('searchText');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalCountEl = document.getElementById('totalCount');
const completedCountEl = document.getElementById('completedCount');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';
let searchQuery = '';

renderTodos();

// Add todo
addBtn.addEventListener('click', addTodo);
todoText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const text = todoText.value.trim();
  if (!text) return alert('Todo cannot be empty');

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  saveAndRender();
  todoText.value = '';
}

// Save to localStorage
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Render todos
function renderTodos() {
  todoList.innerHTML = '';

  let filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  if (searchQuery) {
    filteredTodos = filteredTodos.filter(todo => todo.text.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = '<li class="empty">No todos found</li>';
  } else {
    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.dataset.id = todo.id;
      li.classList.toggle('completed', todo.completed);
      li.innerHTML = `
        <span>${todo.text}</span>
        <div>
          <input type="checkbox" class="toggle-complete" ${todo.completed ? 'checked' : ''}/>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
    });
  }

  // Update counters
  totalCountEl.textContent = todos.length;
  completedCountEl.textContent = todos.filter(t => t.completed).length;
}

// Event delegation for toggle and delete
todoList.addEventListener('click', function(e) {
  const li = e.target.closest('li');
  if (!li) return;
  const id = parseInt(li.dataset.id);

  if (e.target.classList.contains('delete-btn')) {
    todos = todos.filter(t => t.id !== id);
    saveAndRender();
  }

  if (e.target.classList.contains('toggle-complete')) {
    const todo = todos.find(t => t.id === id);
    todo.completed = e.target.checked;
    saveAndRender();
  }
});

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

// Debounced search
searchText.addEventListener('input', debounce((e) => {
  searchQuery = e.target.value.trim();
  renderTodos();
}, 400));
