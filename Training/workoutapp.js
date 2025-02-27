import './workoutform.js';
import './workoutlist.js';

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
            color: #bbbbbb;
        }
    `;
    document.head.appendChild(style);

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
