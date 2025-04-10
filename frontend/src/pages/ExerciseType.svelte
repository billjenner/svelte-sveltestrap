<script>
  import { InputGroup, Input, Button, ListGroup, ListGroupItem, Collapse } from '@sveltestrap/sveltestrap';

  let exercises = []; // Exercise list
  let currentExercise = { exercise: '', description: '', duration: '', intensity: 'low' }; // Default input
  let editingExercise = null; // Keeps track of the exercise being edited

  const saveExercise = () => {
    if (editingExercise) {
      // Update an existing exercise
      exercises = exercises.map(ex =>
        ex.id === editingExercise.id ? currentExercise : ex
      );
      editingExercise = null; // Exit edit mode
    } else {
      // Add a new exercise
      if (currentExercise.exercise.trim() && currentExercise.description.trim()) {
        exercises = [...exercises, { ...currentExercise, id: Date.now() }];
      }
    }
    // Reset form
    currentExercise = { exercise: '', description: '', duration: '', intensity: 'low' };
  };

  const startEditing = (exercise) => {
    editingExercise = exercise;
    currentExercise = { ...exercise };
  };

  const cancelEdit = () => {
    editingExercise = null;
    currentExercise = { exercise: '', description: '', duration: '', intensity: 'low' };
  };

  const removeExercise = (id) => {
    exercises = exercises.filter(ex => ex.id !== id);
  };

  //Footer ---------------------------------------------------------------
  let isFooterExpanded = false; // Tracks whether the footer is expanded

  const toggleFooter = () => {
    isFooterExpanded = !isFooterExpanded;
  };
</script>

<div class="container mt-5">
  <h2 class="text-center text-primary">Manage Exercises</h2>

  <!-- Add/Edit Exercise Form -->
  <div class="mt-4">
    <InputGroup class="mb-3">
      <Input
        placeholder="Exercise Name"
        bind:value={currentExercise.exercise}
        class="form-control"
      />
    </InputGroup>
    <InputGroup class="mb-3">
      <Input
        placeholder="Description"
        bind:value={currentExercise.description}
        class="form-control"
      />
    </InputGroup>
    <InputGroup class="mb-3">
      <Input
        type="number"
        placeholder="Duration (minutes)"
        bind:value={currentExercise.duration}
        class="form-control"
      />
    </InputGroup>
    <InputGroup class="mb-3">
      <Input
        placeholder="Intensity (e.g., low, moderate, high, HIIT, Circuit)"
        bind:value={currentExercise.intensity}
        class="form-control"
      />
    </InputGroup>
    <div class="d-flex gap-2">
      <Button color="primary" on:click={saveExercise}>
        {editingExercise ? 'Save Changes' : 'Add Exercise'}
      </Button>
      {#if editingExercise}
        <Button color="secondary" on:click={cancelEdit}>
          Cancel
        </Button>
      {/if}
    </div>
  </div>

  <!-- Exercise List -->
  <div class="mt-4">
    <h4 class="text-secondary">Exercise List</h4>
    <ListGroup>
      {#if exercises.length > 0}
        {#each exercises as ex (ex.id)}


        <ListGroupItem class="d-flex justify-content-between align-items-center">
          <div>
            <strong>{ex.exercise}</strong> - {ex.description} | <em>{ex.duration} min</em> | <span>{ex.intensity}</span>
          </div>
          <div class="d-flex gap-2 ms-auto">
            <Button color="warning" size="sm" on:click={() => startEditing(ex)}>
              Edit
            </Button>
            <Button color="danger" size="sm" on:click={() => removeExercise(ex.id)}>
              Delete
            </Button>
          </div>
        </ListGroupItem>
        


          {/each}
      {:else}
        <ListGroupItem>No exercises added yet.</ListGroupItem>
      {/if}
    </ListGroup>
  </div>
</div>


<!-- Footer Section -->
<div class="footer border-top mt-5 p-3">
  <div class="d-flex justify-content-between align-items-center">
    <span class="text-secondary">Expandable Footer</span>
    <Button color="link" class="p-0" on:click={toggleFooter}>
      <span class="d-flex align-items-center">
        {#if isFooterExpanded}
          <i class="bi bi-chevron-down"></i> <!-- Bootstrap chevron down -->
        {:else}
          <i class="bi bi-chevron-right"></i> <!-- Bootstrap chevron right -->
        {/if}
      </span>
    </Button>
  </div>
  <Collapse isOpen={isFooterExpanded}>
    <div class="mt-3">
      <p class="text-muted">
        Here is the additional content inside the expandable footer. You can use this space for links, descriptions, or anything you want to display when the footer is expanded.
      </p>
    </div>
  </Collapse>
</div>

<style>
  .footer {
    background-color: #f8f9fa; /* Light gray background */
  }

  .footer i {
    font-size: 1.5rem; /* Make chevron icons larger */
  }

  .footer .text-secondary {
    font-weight: 600; /* Bold footer title */
  }
</style>