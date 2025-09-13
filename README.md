# advanced-dom-javascript-assignment

# 📌 Assignment: Vanilla JavaScript DOM Projects

This assignment demonstrates your ability to handle **form submissions, validation, event delegation, localStorage persistence, debouncing, and DOM manipulation** without using external libraries or frameworks.

---

## 🎯 Learning Objectives
By completing this assignment, you will:

- Handle **form submissions and validation** using vanilla DOM  
- Implement **event delegation** for dynamic content  
- Use **localStorage** for data persistence  
- Apply **debouncing techniques** for performance optimization  
- Create **interactive web applications** using DOM manipulation  
- Understand the **challenges of vanilla DOM development**  

---

## 📝 Question 1: Smart Contact Form

Create a **contact form** with real-time validation and a persistent **message history**.

### 📂 File Structure
contact-form/
├── index.html
├── style.css
└── script.js

### ✅ Features
1. **Contact Form**
   - Name (required, min 2 characters)  
   - Email (required, valid format)  
   - Message (required, min 10 characters)  
   - Real-time + debounced validation (300ms delay)  
   - Prevent page reload on submit + show success message  

2. **Message History**
   - Display all submitted messages  
   - Persist messages in `localStorage` (JSON)  
   - Delete individual messages using **event delegation**  
   - Show *"No messages yet"* when empty  

### 📌 Example Output
📧 Contact Form
[Name: John Doe]
[Email: john@email.com
]
[Message: Hello, this is a test message...]
[Submit Button]

📋 Message History (3 messages)
──────────────────────────────
From: John Doe (john@email.com
)
Message: Hello, this is a test message...
Sent: Jan 15, 2024 at 2:30 PM
[Delete]








---

## 📝 Question 2: Dynamic Todo List with Search

Build a **todo list application** with search and filtering options.

### 📂 File Structure
todo-app/
├── index.html
├── style.css
└── script.js


### ✅ Features
1. **Todo Management**
   - Add todos with input + button  
   - Display todos with checkboxes  
   - Mark todos as completed / active  
   - Delete individual todos  
   - Todo counter: *total & completed*  
   - Persist todos in `localStorage`  

2. **Search & Filter**
   - Debounced search (400ms delay)  
   - Filter: **All | Active | Completed**  
   - Live results update as user types  
   - Show *"No results found"* if no matches  

### 📌 Example Output
✅ My Todo App

[Add new todo...] [Add Button]

🔍 [Search todos...]

Filter: [All] [Active] [Completed]

📝 Todo List (3 total, 1 completed)
──────────────────────────────
☐ Learn JavaScript DOM
☑ Complete HTML/CSS project
☐ Practice event delegation


---

## 💾 Data Structures

### 📩 Message Object (Contact Form)
```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "message": "Hello, this is a test message...",
  "sentAt": "2024-01-15T14:30:00.000Z"
}










