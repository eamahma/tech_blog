async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.log("logout error 1");
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);