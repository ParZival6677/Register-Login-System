// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);

            window.location.href = "http://localhost:8000/index.html";
            event.target.reset();
        } else {
            const errorData = await response.json();
            alert(errorData.error);
            console.error('Error:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: formData
        });

        if (response.status === 201) {
            const data = await response.json();
            alert(data.message);
            console.log('Success:', data);
            document.getElementById('registerForm').reset();
        } else {
            const errorData = await response.json();
            alert(errorData.error);
            console.error('Error:', errorData);
        }

        
    } catch (error) {
        console.error('Error:', error);
    }
});
