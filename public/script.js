document.getElementById("contactForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    alert(data.message);
});
