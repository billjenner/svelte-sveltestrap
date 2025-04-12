import { mount } from 'svelte';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import 'svelte-toasts/dist/svelte-toasts.css'; // Try this instead of 'svelte-toasts/dist/svelte-toasts.css'

import './app.css'; // Your custom styles
import App from './App.svelte'; // Update the path if App.svelte is in a subfolder like 'components'

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
