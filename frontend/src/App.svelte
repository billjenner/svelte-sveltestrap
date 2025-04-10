<script>
  import ToDo from './component/ToDo.svelte';
  import ExerciseType from './component/ExerciseType.svelte';
  import HelloWorld from './pages/HelloWorld.svelte';
  import { Router, Route, Link } from "svelte-routing";
  import { Navbar, NavbarBrand, Button } from '@sveltestrap/sveltestrap';
  import { onMount } from 'svelte';
  export let url = "";
</script>

<main>
  <!-- Navigation Bar -->

<h2 class="text-center">Testing my Nav Links</h2>
<br>
<Router url="{url}">
  <nav class="nav nav-tabs justify-content-center">
    <Link to="/todo" class="nav-link" getProps={({ isCurrent }) => isCurrent ? { class: 'nav-link active bg-primary text-white' } : null}>To-Do</Link>
    <Link to="/exercise-type" class="nav-link" getProps={({ isCurrent }) => isCurrent ? { class: 'nav-link active' } : null}>Exercise Types</Link>
    <Link to="/hello-world" class="nav-link" getProps={({ isCurrent }) => isCurrent ? { class: 'nav-link active' } : null}>Hello World</Link>
  </nav> 
  <!-- Page Content -->
  <div class="container mt-5 text-center">
    <Route path="/todo" component={ToDo}  key="todo"/>
    <Route path="/exercise-type" component={ExerciseType}  key="exercise-type"/>
    <Route path="/hello-world" component={HelloWorld}  key="hello-world"/>
  </div>
</Router>
</main>

<style>
  .nav-tabs .nav-link {
    cursor: pointer;
  }

  .nav-tabs .nav-link.active {
    border-color: #0d6efd; /* Match the border color with the background */
  }

  /* Optional: Add a hover effect */
  .nav-tabs .nav-link:hover {
    background-color: #e9ecef;
    color: #0d6efd;
  }
</style>