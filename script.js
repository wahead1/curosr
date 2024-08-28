function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        document.getElementById(id).innerHTML = id === 'community-stat' ? value.toLocaleString() : value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', (event) => {
    animateValue("visibility-stat", 0, 58, 2000);
    animateValue("trust-stat", 0, 71, 2000);
    animateValue("community-stat", 0, 20000, 2000);

    const modal = document.getElementById("emailModal");
    const btn = document.querySelector(".cta-button");
    const closeButton = document.querySelector(".close-button");
    const submitButton = document.getElementById("submitEmail");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    submitButton.onclick = function() {
        const email = document.getElementById("emailInput").value;
        if (email) {
            fetch('http://localhost:3000/api/save-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                modal.style.display = "none"; // Close the modal
                alert("Thank you for Joining!");
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("There was an error saving your email.");
            });
        } else {
            alert("Please enter a valid email.");
        }
    }
});