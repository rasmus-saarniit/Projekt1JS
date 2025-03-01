import './workoutform.js';
import './workoutlist.js';
import { displayWorkouts, deleteWorkout } from './workoutlist.js';

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        body.dark-mode {
            background-color: #121212;
            color: #ffffff;
        }
        .bg-white.dark-mode {
            background-color: #1e1e1e;
        }
        .text-gray-700.dark-mode {
            color: #d3d3d3; 
        }
        .modal-card.dark-mode {
            background: rgba(56, 15, 36, 0.9); /Roosa põhikaart
        }
    `;
    document.head.appendChild(style);

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = 'Hele režiim';
            darkModeToggle.classList.remove('bg-gray-800');
            darkModeToggle.classList.add('bg-gray-500');
        } else {
            darkModeToggle.textContent = 'Tume režiim';
            darkModeToggle.classList.remove('bg-gray-500');
            darkModeToggle.classList.add('bg-gray-800');
        }
    });

    const viewWorkoutsButton = document.getElementById('view-workouts');
    let workoutsVisible = false;
    const workoutListContainer = document.getElementById('workout-list-container');
    workoutListContainer.innerHTML = ''; // Veendu, et treeningute nimekiri on lehe laadimisel tühi

    viewWorkoutsButton.addEventListener('click', () => {
        if (workoutsVisible) {
            workoutListContainer.innerHTML = '';
        } else {
            workoutListContainer.innerHTML = '';
            displayWorkouts();
        }
        workoutsVisible = !workoutsVisible;
    });
});
