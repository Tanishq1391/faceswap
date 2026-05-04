// ==================== State Management ====================
let todos = [];
let currentFilter = 'all';

const STORAGE_KEY = 'todoList';
const FILTER_KEY = 'currentFilter';

// ==================== DOM Elements ====================
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clearBtn');
const activeCount = document.getElementById('activeCount');

// ==================== Event Listeners ====================
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        localStorage.setItem(FILTER_KEY, currentFilter);
        render();
    });
});

clearBtn.addEventListener('click', clearCompleted);

// ==================== Core Functions ====================

/**
 * Generate unique ID for each todo
 */
function generateId() {
    return Date.now();
}

/**
 * Add a new todo
 */
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const newTodo = {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.unshift(newTodo);
    saveTodos();
    todoInput.value = '';
    todoInput.focus();
    render();
}

/**
 * Toggle todo completion status
 */
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
}

/**
 * Delete a specific todo
 */
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    render();
}

/**
 * Clear all completed todos
 */
function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;

    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        render();
    }
}

/**
 * Get filtered todos based on current filter
 */
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

/**
 * Update active task count
 */
function updateActiveCount() {
    const count = todos.filter(t => !t.completed).length;
    activeCount.textContent = count;
}

/**
 * Render the todo list
 */
function render() {
    const filteredTodos = getFilteredTodos();
    updateActiveCount();

    // Clear the list
    todoList.innerHTML = '';

    // Show empty state if no todos
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state"><p>✨ No tasks yet! Add one to get started.</p></div>';
        return;
    }

    // Render each todo
    filteredTodos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

/**
 * Create a todo item element
 */
function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    div.innerHTML = `
        <input 
            type="checkbox" 
            class="todo-checkbox" 
            ${todo.completed ? 'checked' : ''}
            onchange="toggleTodo(${todo.id})"
        >
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    return div;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== Local Storage Functions ====================

/**
 * Save todos to local storage
 */
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * Load todos from local storage
 */
function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            todos = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading todos from storage:', e);
            todos = [];
        }
    }
}

/**
 * Load filter preference from local storage
 */
function loadFilterPreference() {
    const stored = localStorage.getItem(FILTER_KEY);
    if (stored) {
        currentFilter = stored;
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === currentFilter);
        });
    }
}

// ==================== Initialization ====================

/**
 * Initialize the application
 */
function init() {
    loadTodos();
    loadFilterPreference();
    render();
    todoInput.focus();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
