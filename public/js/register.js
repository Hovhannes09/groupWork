const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  try {
    const response = await fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    alert('Registration successful');

    window.location.href = '/users/login';
  } catch (error) {
    alert(error.message);
  }
});