document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workout-form');
    const typeImages = document.querySelectorAll('.type-img');

    // Tüüpide piltide valimine
    typeImages.forEach(img => {
        img.addEventListener('click', () => {
            typeImages.forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            img.previousElementSibling.checked = true;
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.name.value.trim();
        const duration = form.duration.value;
        const frequency = form.frequency.value;
        const typeSelected = form.querySelector('input[name="type"]:checked');
        const intensitySelected = form.querySelector('input[name="intensity"]:checked');

        let hasError = false;

        // Väljade valideerimine
        if (!name) {
            document.getElementById('name-error').classList.remove('hidden');
            hasError = true;
        } else {
            document.getElementById('name-error').classList.add('hidden');
        }

        if (!typeSelected) {
            document.getElementById('type-error').classList.remove('hidden');
            hasError = true;
        } else {
            document.getElementById('type-error').classList.add('hidden');
        }

        if (!intensitySelected) {
            document.getElementById('intensity-error').classList.remove('hidden');
            hasError = true;
        } else {
            document.getElementById('intensity-error').classList.add('hidden');
        }

        if (!duration) {
            document.getElementById('duration-error').classList.remove('hidden');
            hasError = true;
        } else {
            document.getElementById('duration-error').classList.add('hidden');
        }

        if (!frequency) {
            document.getElementById('frequency-error').classList.remove('hidden');
            hasError = true;
        } else {
            document.getElementById('frequency-error').classList.add('hidden');
        }

        if (hasError) {
            return;
        }

        // Treeningu objekti loomine
        const workout = {
            name: name,
            type: typeSelected.value,
            duration: duration,
            intensity: intensitySelected.value,
            frequency: frequency,
            comments: form.comments.value,
            done: false // Algväärtus: mitte tehtud
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
    workoutListContainer.innerHTML = ''; // Kustuta olemasolevad treeningud

    const workoutCard = document.createElement('div');
    workoutCard.className = `bg-white shadow-md rounded-lg p-4 mb-4 mx-auto max-w-md ${workout.done ? 'bg-green-100' : ''}`;
    workoutCard.innerHTML = `
        <h5 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${workout.name}</h5>
        <p class="text-gray-700">Tüüp: ${workout.type}</p>
        <p class="text-gray-700">Kestus: ${workout.duration} min</p>
        <p class="text-gray-700">Intensiivsus: ${workout.intensity}</p>
        <p class="text-gray-700">Sagedus: ${workout.frequency} korda nädalas</p>
        <p class="text-gray-700">Kommentaar: ${workout.comments}</p>
        <input type="checkbox" class="absolute bottom-2 left-2 w-6 h-6" ${workout.done ? 'checked' : ''} onclick="toggleDone(${index})">
    `;
    workoutListContainer.appendChild(workoutCard);

    // Veendu, et pealkirja värv muutub tume režiimis
    if (document.body.classList.contains('dark-mode')) {
        workoutCard.querySelector('h5').classList.add('dark:text-white');
    }
}
