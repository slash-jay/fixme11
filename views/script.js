document.getElementById("investorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('/submit-investor-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            alert("Application submitted successfully!");
            // You can redirect the user to a confirmation page or perform other actions here
        } else {
            throw new Error('Failed to submit application');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to submit application. Please try again later.");
    });
});
