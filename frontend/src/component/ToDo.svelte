<script>
  import { InputGroup, Input, Button, ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';

let tasks = []; // Task list
let newTask = '';

const addTask = () => {
  if (newTask.trim()) {
    tasks = [...tasks, { text: newTask, id: Date.now() }];
    newTask = '';
  }
};

const removeTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
};
</script>

<div class="mt-3">
  <InputGroup>
    <Input placeholder="Enter a new task" bind:value={newTask} />
    <Button color="primary" on:click={addTask}>Add Task</Button>
  </InputGroup>

  <ListGroup class="mt-4">
    {#each tasks as task (task.id)}
      <ListGroupItem>
        {task.text}
        <Button close on:click={() => removeTask(task.id)} />
      </ListGroupItem>
    {/each}
  </ListGroup>
</div>
