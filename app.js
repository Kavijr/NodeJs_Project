const fs = require('fs');
const readline = require('readline-sync');

const tasksFile = 'tasks.json';

// Load tasks from file
const loadTasks = () => {
    if (!fs.existsSync(tasksFile)) {
        fs.writeFileSync(tasksFile, JSON.stringify([]));
    }
    const data = fs.readFileSync(tasksFile);
    return JSON.parse(data);
};

// Save tasks to file
const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

// Add a new task
const addTask = () => {
    const taskName = readline.question('Enter the task: ');
    const tasks = loadTasks();
    const newTask = { id: Date.now(), name: taskName };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log('Task added successfully!');
};

// List all tasks
const listTasks = () => {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        console.log('Your tasks:');
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. [${task.id}] ${task.name}`);
        });
    }
};

// Delete a task
const deleteTask = () => {
    listTasks();
    const taskId = readline.question('Enter the ID of the task to delete: ');
    let tasks = loadTasks();
    tasks = tasks.filter((task) => task.id.toString() !== taskId);
    saveTasks(tasks);
    console.log('Task deleted successfully!');
};

// Main Menu
const main = () => {
    while (true) {
        console.log('\nTask Tracker');
        console.log('1. Add Task');
        console.log('2. List Tasks');
        console.log('3. Delete Task');
        console.log('4. Exit');
        const choice = readline.question('Choose an option: ');

        switch (choice) {
            case '1':
                addTask();
                break;
            case '2':
                listTasks();
                break;
            case '3':
                deleteTask();
                break;
            case '4':
                console.log('Goodbye!');
                return;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
};

main();
