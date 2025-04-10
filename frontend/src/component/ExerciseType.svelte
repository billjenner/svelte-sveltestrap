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
    editingExercise = { ...exercise }; // Copy the exercise data for editing
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
              {#if editingExercise && editingExercise.id === ex.id}
                <td>
                  <input
                    type="text"
                    class="form-control"
                    bind:value={editingExercise.exercise}
                  />
                </td>
                <td>
                  <textarea
                    class="form-control"
                    bind:value={editingExercise.description}
                  ></textarea>
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    bind:value={editingExercise.duration}
                  />
                </td>
                <td>
                  <select
                    class="form-select"
                    bind:value={editingExercise.intensity}
                  >
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Circuit">Circuit</option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-success btn-sm" on:click={saveEdit}>
                    Save
                  </button>
                  <button class="btn btn-secondary btn-sm" on:click={cancelEdit}>
                    Cancel
                  </button>
                </td>
              {:else}
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
              {/if}
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
