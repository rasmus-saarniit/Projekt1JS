document.addEventListener('DOMContentLoaded', () => {
    displayWorkouts();
});

function displayWorkouts() {
    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    const workoutList = document.createElement('div');
    workoutList.className = 'workout-list';

    workouts.forEach((workout, index) => {
        const workoutCard = document.createElement('div');
        workoutCard.className = 'bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-md';
        workoutCard.innerHTML = `
            <h5 class="text-xl font-bold mb-2">${workout.name}</h5>
            <p class="text-gray-700">Tüüp: ${workout.type}</p>
            <p class="text-gray-700">Kestus: ${workout.duration} min</p>
            <p class="text-gray-700">Intensiivsus: ${workout.intensity}</p>
            <p class="text-gray-700">Sagedus: ${workout.frequency} korda nädalas</p>
            <p class="text-gray-700">Kommentaar: ${workout.comments}</p>
            <button class="bg-red-500 text-white py-1 px-3 rounded mt-2" onclick="deleteWorkout(${index})">Kustuta</button>
        `;
        workoutList.appendChild(workoutCard);
    });

    const clearButton = document.createElement('button');
    clearButton.className = 'bg-yellow-500 text-white py-2 px-4 rounded mt-3 mx-auto block';
    clearButton.textContent = 'Kustuta kõik treeningud';
    clearButton.onclick = clearWorkouts;
    workoutList.appendChild(clearButton);

    document.getElementById('workout-list-container').appendChild(workoutList);
}

function deleteWorkout(index) {
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.splice(index, 1);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    document.querySelector('.workout-list').remove();
    displayWorkouts();
}

function clearWorkouts() {
    localStorage.removeItem('workouts');
    document.querySelector('.workout-list').remove();
    displayWorkouts();
}
