document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workout-form');
    const typeImages = document.querySelectorAll('.type-img');

    typeImages.forEach(img => {
        img.addEventListener('click', () => {
            typeImages.forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            img.previousElementSibling.checked = true;
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const duration = form.duration.value;
        const frequency = form.frequency.value;
        const typeSelected = form.type.value;

        if (!typeSelected) {
            alert('Vali üks treeningu tüüp');
            return;
        }

        if (duration < 0 || frequency < 0) {
            alert('Kestus ja sagedus ei saa olla väiksem kui 0.');
            return;
        }

        const workout = {
            name: form.name.value,
            type: form.type.value,
            duration: duration,
            intensity: form.intensity.value,
            frequency: frequency,
            comments: form.comments.value
        };
        saveWorkout(workout);
        form.reset();
        typeImages.forEach(i => i.classList.remove('selected'));
        showLatestWorkout(workout);
    });
});

function saveWorkout(workout) {
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

function showLatestWorkout(workout) {
    const workoutListContainer = document.getElementById('workout-list-container');
    workoutListContainer.innerHTML = ''; // Clear existing workouts

    const workoutCard = document.createElement('div');
    workoutCard.className = 'bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-md';
    workoutCard.innerHTML = `
        <h5 class="text-xl font-bold mb-2">${workout.name}</h5>
        <p class="text-gray-700">Tüüp: ${workout.type}</p>
        <p class="text-gray-700">Kestus: ${workout.duration} min</p>
        <p class="text-gray-700">Intensiivsus: ${workout.intensity}</p>
        <p class="text-gray-700">Sagedus: ${workout.frequency} korda nädalas</p>
        <p class="text-gray-700">Kommentaar: ${workout.comments}</p>
    `;
    workoutListContainer.appendChild(workoutCard);
}
