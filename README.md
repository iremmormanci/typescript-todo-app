# To-Do List Application

This is a simple TypeScript-based To-Do List application that allows users to add, delete, and list tasks.  
The tasks are stored in a local JSON file (`db.json`) acting as a mock database.

---

## 🚀 Features

- Add a new task  
- Delete an existing task by ID  
- List all tasks  
- Unique IDs generated using ULID  
- Data persistence with JSON file  

---

## 🛠 Technologies

- TypeScript  
- Node.js  
- `ulid` for unique IDs  
- Native `fs` module for JSON file handling  
- AVA for testing  

---

## 📂 Project Structure

src/
├── todo.ts # Core task functions: addTask, deleteTask, listTask
├── type.ts # TypeScript types (e.g. ToDo)
├── db.json # JSON file acting as mock DB
tests/
├── todo.test.ts # Tests for To-Do functions


Author
İrem Ormancı
