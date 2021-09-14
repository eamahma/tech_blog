async function deletePostHandler() {
    const url = document.location.href.split('/');
    const id = url[url.length - 1];

    const response = await fetch(
        `/api/posts/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    if (response.ok) {
        document.location.assign('/dashboard');
    } else {
        alert((await response.json()).message);
    }
}

async function editFormHandler(event) {
    event.preventDefault();
    console.log("edit button clicked");
    // const title = document.querySelector('input[name="title"]').value.trim();
    const title = document.getElementById('post-title').value.trim();
    // const body = document.querySelector('input[name="body"]').textContent.trim();
    const body = document.getElementById('post-body').value.trim();
    console.log(title);
    console.log(body);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          title,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

}

document.querySelector('#edit-btn').addEventListener('click', editFormHandler);

document.querySelector('#delete-btn').addEventListener('click', deletePostHandler);