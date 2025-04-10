<script>
  let exercises = [];
  let newExercise = {
    exercise: '',
    description: '',
    duration: '',
    intensity: 'low' // Default value
  };
  let editingExercise = null;

  const addExercise = () => {
    if (newExercise.exercise.trim() && newExercise.description.trim()) {
      exercises = [...exercises, { ...newExercise, id: Date.now() }];
      newExercise = { exercise: '', description: '', duration: '', intensity: 'low' };
    }
  };

  const removeExercise = (id) => {
    exercises = exercises.filter(ex => ex.id !== id);
  };

  const startEditing = (exercise) => {
    editingExercise = { ...exercise };
  };

  const saveEdit = () => {
    exercises = exercises.map(ex =>
      ex.id === editingExercise.id ? editingExercise : ex
    );
    editingExercise = null; // Exit edit mode
  };

  const cancelEdit = () => {
    editingExercise = null; // Exit edit mode without saving
  };
</script>

<div class="container mt-5">
  <h2 class="text-center">Manage Exercise Types</h2>

  <div class="mt-4">
    <h4>Add New Exercise</h4>
    <form on:submit|preventDefault={addExercise}>
      <div class="form-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Exercise Name"
          bind:value={newExercise.exercise}
        />
      </div>
      <div class="form-group mb-3">
        <textarea
          class="form-control"
          placeholder="Description"
          bind:value={newExercise.description}
        ></textarea>
      </div>
      <div class="form-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Duration (minutes)"
          bind:value={newExercise.duration}
        />
      </div>
      <div class="form-group mb-3">
        <select class="form-select" bind:value={newExercise.intensity}>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
          <option value="HIIT">HIIT</option>
          <option value="Circuit">Circuit</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary" on:click={addExercise}>
        Add Exercise
      </button>
    </form>
  </div>

  <div class="mt-4">
    <h4>Exercise List</h4>
    <div class="d-flex flex-wrap gap-3">
      {#if exercises.length > 0}
        {#each exercises as ex (ex.id)}
          <div class="card" style="width: 18rem;">
            {#if editingExercise && editingExercise.id === ex.id}
              <div class="card-body">
                <input
                  type="text"
                  class="form-control mb-2"
                  bind:value={editingExercise.exercise}
                  placeholder="Exercise Name"
                />
                <textarea
                  class="form-control mb-2"
                  bind:value={editingExercise.description}
                  placeholder="Description"
                ></textarea>
                <input
                  type="number"
                  class="form-control mb-2"
                  bind:value={editingExercise.duration}
                  placeholder="Duration (minutes)"
                />
                <select
                  class="form-select mb-2"
                  bind:value={editingExercise.intensity}
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Circuit">Circuit</option>
                </select>
                <button class="btn btn-success btn-sm me-2" on:click={saveEdit}>
                  Save
                </button>
                <button class="btn btn-secondary btn-sm" on:click={cancelEdit}>
                  Cancel
                </button>
              </div>
            {:else}
              <div class="card-body">
                <h5 class="card-title">{ex.exercise}</h5>
                <p class="card-text">{ex.description}</p>
                <p class="card-text"><strong>Duration:</strong> {ex.duration} min</p>
                <p class="card-text"><strong>Intensity:</strong> {ex.intensity}</p>
                <button class="btn btn-warning btn-sm me-2" on:click={() => startEditing(ex)}>
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" on:click={() => removeExercise(ex.id)}>
                  Delete
                </button>
              </div>
            {/if}
          </div>
        {/each}
      {:else}
        <p class="text-center mt-3">No exercises added yet.</p>
      {/if}
    </div>
  </div>
</div>

<style>
  h2 {
    color: #0d6efd; /* Bootstrap Primary */
  }
</style>
