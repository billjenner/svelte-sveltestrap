<script>
  let exercises = [];
  let editingExercise = null;

  const saveExercise = () => {
    if (editingExercise) {
      // Update an existing exercise
      exercises = exercises.map(ex =>
        ex.id === editingExercise.id ? editingExercise : ex
      );
      editingExercise = null; // Exit edit mode
    } else {
      // Add a new exercise
      if (newExercise.exercise.trim() && newExercise.description.trim()) {
        exercises = [...exercises, { ...newExercise, id: Date.now() }];
      }
    }

    // Reset form after adding or editing
    newExercise = { exercise: '', description: '', duration: '', intensity: 'low' };
  };

  const startEditing = (exercise) => {
    editingExercise = { ...exercise }; // Copy the exercise data for editing
  };

  const cancelEdit = () => {
    editingExercise = null; // Exit edit mode without saving
    newExercise = { exercise: '', description: '', duration: '', intensity: 'low' }; // Reset form
  };

  const removeExercise = (id) => {
    exercises = exercises.filter(ex => ex.id !== id);
  };

  let newExercise = { exercise: '', description: '', duration: '', intensity: 'low' };
</script>

<div class="container mt-5">
  <h2 class="text-center">Manage Exercise Types</h2>

  <div class="mt-4">
    <h4>{editingExercise ? 'Edit Exercise' : 'Add New Exercise'}</h4>
    <form on:submit|preventDefault={saveExercise}>
      <div class="form-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Exercise Name"
          bind:value={editingExercise ? editingExercise.exercise : newExercise.exercise}
        />
      </div>
      <div class="form-group mb-3">
        <textarea
          class="form-control"
          placeholder="Description"
          bind:value={editingExercise ? editingExercise.description : newExercise.description}
        ></textarea>
      </div>
      <div class="form-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Duration (minutes)"
          bind:value={editingExercise ? editingExercise.duration : newExercise.duration}
        />
      </div>
      <div class="form-group mb-3">
        <select
          class="form-select"
          bind:value={editingExercise ? editingExercise.intensity : newExercise.intensity}
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
          <option value="HIIT">HIIT</option>
          <option value="Circuit">Circuit</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary" on:click={saveExercise}>
        {editingExercise ? 'Save Changes' : 'Add Exercise'}
      </button>
      {#if editingExercise}
        <button type="button" class="btn btn-secondary" on:click={cancelEdit}>
          Cancel
        </button>
      {/if}
    </form>
  </div>

  <div class="mt-4">
    <h4>Exercise List</h4>
    {#if exercises.length > 0}
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Description</th>
            <th>Duration (min)</th>
            <th>Intensity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each exercises as ex (ex.id)}
            <tr>
              <td>{ex.exercise}</td>
              <td>{ex.description}</td>
              <td>{ex.duration}</td>
              <td>{ex.intensity}</td>
              <td>
                <button
                  class="btn btn-warning btn-sm"
                  on:click={() => startEditing(ex)}
                >
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" on:click={() => removeExercise(ex.id)}>
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="text-center mt-3">No exercises added yet.</p>
    {/if}
  </div>
</div>

<style>
  h2 {
    color: #0d6efd; /* Bootstrap Primary */
  }
</style>
