# ToDo App

This is a simple To-Do app built with a clean UI using React Native. The app allows users to create, edit, and delete to-do items, with each task having a title, status, and creation date. The app also saves tasks to local storage, so your to-do list is preserved even after closing and reopening the app.

## Features

- **Add To-Dos**: Create a new to-do item with a title.
- **Mark as Completed**: Toggle between "In Progress" and "Done" status for each task.
- **Edit To-Dos**: Modify the title of an existing to-do item.
- **Delete To-Dos**: Remove a to-do item from the list.
- **Local Storage**: Saves the to-do list to local storage (using AsyncStorage), so your tasks persist across app sessions.
- **Fallback**: Displays a message when there are no tasks in the list.


## Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- **Expo CLI** installed globally:
  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:

2. Install dependencies:

   ```bash
   cd todo-app
   npm install
   ```

3. Install **AsyncStorage**:

   ```bash
   npm install @react-native-async-storage/async-storage
   ```

4. Start the app:

   ```bash
   npx expo start
   ```

### Project Structure

- `App.js`: The main entry point of the app.
- `src/screen/ToDoScreen.js`: Contains the main To-Do screen with functionality for adding, editing, and deleting tasks.
- `src/components/Fallback.js`: Displays a fallback message when there are no tasks in the list.

### How to Use

1. **Add a Task**: Enter a task title in the input field and click "Add" to create a new to-do item.
2. **Edit a Task**: Click the pencil icon next to a task to edit its title.
3. **Delete a Task**: Click the trash can icon next to a task to delete it from the list.
4. **Mark Task as Completed**: Click the check icon next to a task to mark it as "Done" or "In Progress."
5. **Persist Data**: Your tasks are saved automatically and will persist even if you close the app.

### Technologies Used

- **React Native**: Framework for building mobile apps.
- **AsyncStorage**: Provides local storage for data persistence.
- **Expo**: Development tool for building and running React Native apps.