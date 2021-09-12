async function createPostHandler(event) {
    event.preventDefault();
 
    const title = document.querySelector("#post-title").value.trim();
    const body = document.querySelector("#post-body").value.trim();

    console.log(title);
    console.log(body);
    if (body) {
      //make sure we have comment text
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  

      if (response.ok) {
        document.location.replace("/dashboard"); 
      } else {
        alert(response.statusText); 
      }
    }
  }
  
  document
    .querySelector("#create-post-btn")
    .addEventListener("click", createPostHandler);
  