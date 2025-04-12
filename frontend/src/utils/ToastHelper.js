import { toasts } from 'svelte-toasts';

export const showToast = (type = 'info', description = '', duration = 3000) => {
  const defaultTitles = {
    success: 'Success',
    error: 'Error',
    info: 'Info',
    warning: 'Warning',
  };

  console.log('Triggering toast:', type, description); //

  toasts.add({
    title: defaultTitles[type] || 'Notification',
    description,
    type: 'success', // 'success', 'error', 'info', 'warning'
    theme: 'dark',
    duration: 10000, // 0 or negative to avoid auto-remove
    placement: 'bottom-right',
  });
};
