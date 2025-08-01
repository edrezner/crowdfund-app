const createProjectHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#project-name").value.trim();
  const desc = document.querySelector("#project-desc").value.trim();
  const funding = document.querySelector("#project-fund").value.trim();

  if (name && desc && funding) {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: desc, funding_goal: funding }),
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(
        response.statusText ||
          "Failed to create project. Please check all fields."
      );
    }
  }
};

const deleteProjectHandler = async (event) => {
  const id = event.target.dataset.id;
  const name = event.target.dataset.name;

  if (id) {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText || "Failed to delete project.");
      }
    }
  }
};

document
  .querySelector("#new-project-form")
  .addEventListener("submit", createProjectHandler);

document
  .querySelectorAll(".btn-danger")
  .forEach((btn) => btn.addEventListener("click", deleteProjectHandler));
