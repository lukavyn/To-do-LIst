document.addEventListener("DOMContentLoaded", function () {
	const addButton = document.getElementById("add_task");
	const taskInput = document.getElementById("task_input");
	const taskList = document.getElementById("task_list");
	const taskDisplay = document.getElementById("task_display");

	// Load tasks saved in Local Storage when the page is loaded
	function loadTasks() {
		// Retrieve tasks from Local Storage, or set an empty array if none exist
		const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		// For each saved task, add it to the task list
		tasks.forEach((task) => {
			addTaskToList(task);
		});
	}

	// Save the new task to Local Storage
	function saveTaskToLocalStorage(task) {
		// Get the existing tasks from Local Storage or initialize an empty array
		const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		// Add the new task to the tasks array
		tasks.push(task);
		// Update the tasks in Local Storage
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	// Function to add a task to the task list in the DOM
	function addTaskToList(task) {
		// Create a new list item for the task
		const li = document.createElement("li");

		// Create a "complete" button with an icon to mark tasks as complete
		const completeButton = document.createElement("button");
		completeButton.classList.add("complete-btn");
		completeButton.innerHTML = '<i class="bx bx-circle"></i>';
		// Add an event listener to toggle task completion status
		completeButton.addEventListener("click", function () {
			li.classList.toggle("completed");
			const icon = completeButton.querySelector("i");
			// Toggle between 'complete' and 'incomplete' icons
			if (li.classList.contains("completed")) {
				icon.classList.replace("bx-circle", "bx-check-circle");
			} else {
				icon.classList.replace("bx-check-circle", "bx-circle");
			}
		});

		// Create a span element for the task text
		const taskText = document.createElement("span");
		taskText.textContent = ` ${task}`;
		taskText.style.marginLeft = "10px"; // Adds margin between button and text

		// Create a delete button with an icon to remove tasks
		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-btn");
		deleteButton.innerHTML = '<i class="bx bx-x"></i>';
		// Add an event listener to remove the task from the list and Local Storage
		deleteButton.addEventListener("click", function () {
			taskList.removeChild(li); // Remove task from the DOM
			removeTaskFromLocalStorage(task); // Remove task from Local Storage
		});

		// Append the complete button, task text, and delete button to the list item
		li.appendChild(completeButton);
		li.appendChild(taskText);
		li.appendChild(deleteButton);

		// Add the list item to the task list
		taskList.appendChild(li);
	}

	// Remove a task from Local Storage
	function removeTaskFromLocalStorage(taskToRemove) {
		// Get the current tasks from Local Storage
		let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
		// Filter out the task to be removed
		tasks = tasks.filter((task) => task !== taskToRemove);
		// Update Local Storage with the remaining tasks
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	// Add an event listener to the "Add" button
	addButton.addEventListener("click", function () {
		// Get the value from the input field
		const task = taskInput.value;

		// Check if the input is not empty
		if (task.trim() !== "") {
			// Add the task to the list and save it in Local Storage
			addTaskToList(task);
			saveTaskToLocalStorage(task);

			// Display the last added task
			taskDisplay.textContent = `Last task added: ${task}`;

			// Clear the input field for the next task
			taskInput.value = "";
		} else {
			alert("Please enter a task");
		}
	});

	// Load saved tasks when the page is loaded/reloaded
	loadTasks();
});