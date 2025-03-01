document.addEventListener('DOMContentLoaded', () => {
    displayWorkouts();
});

export function displayWorkouts(filterType = '', filterIntensity = '') {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const workoutListContainer = document.getElementById('workout-list-container');
    workoutListContainer.innerHTML = ''; // Kustuta olemasolevad treeningud

    workouts.forEach((workout, index) => {
        const workoutCard = document.createElement('div');
        workoutCard.className = `bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-md cursor-pointer relative ${workout.done ? 'bg-green-100' : ''}`;
        workoutCard.innerHTML = `
            <h5 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${workout.name}</h5>
            <p class="text-gray-700 dark:text-gray-300">Tüüp: ${workout.type}</p>
        `;

        // Filtreeri treeningud
        if ((filterType && workout.type !== filterType) || (filterIntensity && workout.intensity !== filterIntensity)) {
            workoutCard.style.display = 'none';
        }

        let expanded = false;
        workoutCard.addEventListener('click', () => {
            if (expanded) {
                workoutCard.innerHTML = `
                    <h5 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${workout.name}</h5>
                    <p class="text-gray-700 dark:text-gray-300">Tüüp: ${workout.type}</p>
                `;
            } else {
                workoutCard.innerHTML = `
                    <h5 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${workout.name}</h5>
                    <p class="text-gray-700 dark:text-gray-300">Tüüp: ${workout.type}</p>
                    <p class="text-gray-700 dark:text-gray-300">Kestus: ${workout.duration} min</p>
                    <p class="text-gray-700 dark:text-gray-300">Intensiivsus: ${workout.intensity}</p>
                    <p class="text-gray-700 dark:text-gray-300">Sagedus: ${workout.frequency} korda nädalas</p>
                    <p class="text-gray-700 dark:text-gray-300">Kommentaar: ${workout.comments}</p>
                    <button class="bg-red-500 text-white py-1 px-3 rounded mt-2" onclick="deleteWorkout(${index})">Kustuta</button>
                    <input type="checkbox" class="absolute bottom-2 left-2 w-6 h-6" ${workout.done ? 'checked' : ''} onclick="toggleDone(${index})">
                `;
            }
            expanded = !expanded;
        });

        workoutListContainer.appendChild(workoutCard);
    });

    // Nupp kõigi treeningute kustutamiseks
    const clearButton = document.createElement('button');
    clearButton.className = 'bg-yellow-500 text-white py-2 px-4 rounded mt-3 mx-auto block';
    clearButton.textContent = 'Kustuta kõik treeningud';
    clearButton.onclick = clearWorkouts;
    workoutListContainer.appendChild(clearButton);
}

export function deleteWorkout(index) {
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    displayWorkouts();
}

function clearWorkouts() {
    localStorage.removeItem('workouts');
    displayWorkouts();
}

export function toggleDone(index) {
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts[index].done = !workouts[index].done;
    localStorage.setItem('workouts', JSON.stringify(workouts));
    displayWorkouts();
}

export function clearFilters() {
    displayWorkouts();
}

// Kinnita deleteWorkout, toggleDone ja clearFilters akna objektile
window.deleteWorkout = deleteWorkout;
window.toggleDone = toggleDone;
window.clearFilters = clearFilters;
