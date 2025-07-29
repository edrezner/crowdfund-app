const loginHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(
        response.statusText ||
          "Failed to log in. Please check your email and password."
      );
    }
  }
};

const signupHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText || "Failed to sign up. Please try again.");
    }
  }
};

document.querySelector(".login-form").addEventListener("submit", loginHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupHandler);
