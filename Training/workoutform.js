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
        const workout = {
            name: form.name.value,
            type: form.type.value,
            duration: form.duration.value,
            intensity: form.intensity.value,
            frequency: form.frequency.value,
            comments: form.comments.value
        };
        saveWorkout(workout);
        form.reset();
        typeImages.forEach(i => i.classList.remove('selected'));
    });
});

function saveWorkout(workout) {
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
}
