// INTENTIONALLY VULNERABLE LAB — do not reuse in production.

// 1) Client-side authentication bypass:
// The credential check is performed entirely in JavaScript.
const users = {
  admin: "Admin123!",
  student: "Student123!"
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if (users[u] === p) {
    // 2) Sensitive state stored client-side.
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", u === "admin" ? "admin" : "student");
    location.href = "dashboard.html";
  } else {
    document.getElementById("message").textContent = "Login gagal.";
  }
});
