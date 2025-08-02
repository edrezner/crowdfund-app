const logoutButton = document.querySelector("#logout");

const logoutHandler = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText || "Failed to log out. Please try again.");
  }
};

if (logoutButton) {
  logoutButton.addEventListener("click", logoutHandler);
}
