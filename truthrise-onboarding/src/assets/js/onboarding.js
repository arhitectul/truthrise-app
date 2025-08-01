// This file contains the JavaScript functionality for the onboarding flow, handling user interactions and form submissions for the onboarding process.

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle the Constitution acknowledgment
  const constitutionButton = document.getElementById('acknowledge-constitution');
  if (constitutionButton) {
    constitutionButton.addEventListener('click', () => {
      window.location.href = 'location.html'; // Redirect to location input page
    });
  }

  // Function to handle location form submission
  const locationForm = document.getElementById('location-form');
  if (locationForm) {
    locationForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      const country = document.getElementById('country').value;
      const city = document.getElementById('city').value;

      // Basic validation
      if (country && city) {
        window.location.href = 'register.html'; // Redirect to registration page
      } else {
        alert('Please fill in both country and city fields.'); // Alert user for missing fields
      }
    });
  }

  // Function to handle registration form submission
  const registrationForm = document.getElementById('registration-form');
  if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;
      const referral = document.getElementById('referral').value;

      // Basic validation
      if (email && phone && password && role) {
        // Here you would typically send the data to the server
        console.log('Registration data:', { email, phone, password, role, referral });
        alert('Registration successful!'); // Alert user on successful registration
      } else {
        alert('Please fill in all required fields.'); // Alert user for missing fields
      }
    });
  }
});