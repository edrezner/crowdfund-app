const donateProjectHandler = async () => {
  const amount = prompt("Enter your donation amount:");
  if (!amount || isNaN(amount) || amount <= 0) return;

  const projectId = window.location.pathname.split("/").pop();

  const response = await fetch(`/api/projects/${projectId}/donate`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: parseFloat(amount) }),
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText || "Failed to donate to project.");
  }
};

document
  .querySelector("#donate-btn")
  .addEventListener("click", donateProjectHandler);
