# To-Do List Application

A simple, elegant, and fully functional to-do list web application with local storage functionality.

## Features

✨ **Core Features:**
- ✅ Add, complete, and delete tasks
- 💾 Automatic saving to browser local storage
- 🔄 Persistent data across browser sessions
- 🎯 Filter tasks (All, Active, Completed)
- 🗑️ Clear all completed tasks at once
- 📊 Task counter showing active tasks

🎨 **User Experience:**
- Beautiful gradient design with smooth animations
- Responsive design for mobile and desktop
- Keyboard support (Enter to add task)
- Visual feedback for interactions
- Empty state messages
- Custom scrollbar styling

## How to Use

1. **Open the App:** Open `index.html` in your web browser
2. **Add a Task:** Type in the input field and click "Add" or press Enter
3. **Complete a Task:** Check the checkbox next to a task to mark it as completed
4. **Delete a Task:** Click the "Delete" button on any task
5. **Filter Tasks:** Use the filter buttons to view All, Active, or Completed tasks
6. **Clear Completed:** Click "Clear Completed" to remove all finished tasks

## File Structure

```
todo-app/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── script.js       # JavaScript functionality and local storage
└── README.md       # This file
```

## Local Storage

The application uses the browser's local storage to persist data:

- **todoList**: Stores all tasks as a JSON array
- **currentFilter**: Stores the last selected filter preference

Data is automatically saved when you:
- Add a new task
- Mark a task as completed/incomplete
- Delete a task
- Clear completed tasks

## Browser Compatibility

- ✅ Chrome/Edge (v4+)
- ✅ Firefox (v3.5+)
- ✅ Safari (v4+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

**Technologies Used:**
- HTML5
- CSS3 (Flexbox, Grid, Animations, Gradients)
- Vanilla JavaScript (ES6+)
- LocalStorage API

**Key Functions:**
- `addTodo()`: Creates a new task
- `toggleTodo(id)`: Marks task as complete/incomplete
- `deleteTodo(id)`: Removes a task
- `clearCompleted()`: Removes all completed tasks
- `saveTodos()`: Persists todos to localStorage
- `loadTodos()`: Retrieves todos from localStorage
- `render()`: Updates the DOM

## Tips

- Your tasks are saved automatically, so you won't lose data if you close the browser
- Click on a task to view it better (hover effect)
- Use the filter buttons to organize your workflow
- Clear your browser's local storage to reset the app

## Future Enhancements

- [ ] Add due dates to tasks
- [ ] Add priority levels
- [ ] Add task categories/tags
- [ ] Dark mode toggle
- [ ] Export/Import tasks
- [ ] Task editing functionality
- [ ] Drag and drop to reorder
- [ ] Add reminders/notifications

Enjoy organizing your tasks! 📝
