<script>
  import ToDo from './component/ToDo.svelte';
  import ExerciseType from './pages/ExerciseType.svelte';
  import HelloWorld from './pages/HelloWorld.svelte';
  import { Button } from '@sveltestrap/sveltestrap';


  let activeScreen = 'HelloWorld';
</script>

<main>
  <nav class="nav">
    <div class="nav-title">My-App</div>
    <div class="nav-buttons">
      <Button
        on:click={() => activeScreen = 'ToDo'}
        class="nav-button {activeScreen === 'ToDo' ? 'active' : ''}"
      >
        ToDo
      </Button>
      <Button
        on:click={() => activeScreen = 'ExerciseType'}
        class="nav-button {activeScreen === 'ExerciseType' ? 'active' : ''}"
      >
        Exercise Type
      </Button>
      <Button
        on:click={() => activeScreen = 'HelloWorld'}
        class="nav-button {activeScreen === 'HelloWorld' ? 'active' : ''}"
      >
        Hello World
      </Button>
    </div>
  </nav>

  {#if activeScreen === 'ToDo'}
    <ToDo />
  {:else if activeScreen === 'ExerciseType'}
    <ExerciseType />
  {:else}
    <HelloWorld />
  {/if}
</main>

<style>

</style>