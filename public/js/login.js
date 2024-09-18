const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log(`---> Inside loginFormHandler: Login: name: ${name}, password: ${password}`);

  if (name && password) {
    // Send a POST request to the API endpoint
    console.log('---> Sending POST request to /api/users/login: in userRoutes.js');
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      console.log('---> Successful login, redirecting to /dashboard-1');
      document.location.replace('/dashboard-1');
    } else {
      alert(response.statusText);
      alert('Failed to log in');
      console.log('---> Failed to log in');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  console.log(`---> Inside signupFormHandler: signup: name: ${name}, password: ${password}`);
 
  if (name && password) {
    console.log('---> Sending POST request to /api/users: in userRoutes.js');
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('---> Successful signup, redirecting to /dashboard-1');
      document.location.replace('/dashboard-1');
    } else {
      alert(response.statusText);
      alert('Failed to sign up');
      console.log('---> Failed to sign up');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
