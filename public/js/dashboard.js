/*********************************************************************************
 * /public/js/dashboard.js
 * 
 * Create Post Event Handler
 * Purpose: Create a new post
 * 
 * Caller: Dashboard.handlebar    (New form submit button clicked)
 * Calls: POST /api/posts/        (postRoutes.js)
 * Args: Post title, description
 * 
 * Redirects to dashboard.handlebar by invoking GET /dashboard  (homeRoutes.js)
 * 
 *********************************************************************************/
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  // Debug logs
  console.log('---> Inside newFormHandler in (public/dashboard.js)');
  console.log('---> title: ' + title);
  console.log('---> description: ' + description);

  if (title && description) {
    console.log('---> Calling POST /api/posts in (postRoutes) to create the post');
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard-1');
    } else {
      console.log('---> Inside newFormHandler in (public/dashboard.js): Failed to create post');
      alert('Failed to create post');
    }
  }
};

/*********************************************************************************
 * /public/js/dashboard.js
 * 
 * Delete Post Event Handler
 * Purpose: Delete a post
 * 
 * Caller: Dashboard.handlebar    (Delete button clicked)
 * Calls: DELETE /api/posts/:id   (postRoutes.js)
 * Args: Post id
 * 
 * Redirects to dashboard.handlebar by invoking GET /dashboard  (homeRoutes.js)
 * 
 *********************************************************************************/

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log('---> Inside delButtonHandler in (public/dashboard.js): post id = ' + id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard-1');
    } else {
      console.log('---> Inside delButtonHandler in (public/dashboard.js): Failed to delete post');
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
