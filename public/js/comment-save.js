/*********************************************************************************
 * /public/js/comment.js
 * 
 * Create Add Comment Handler
 * Purpose: Create a new comment
 * 
 * Caller: post-detail.handlebar        (New form submit button clicked)
 * Calls: POST /api/comment/post/:id    (postRoutes.js)
 * Args: Comment text, Post id
 * 
 * Redirects to post-detail.handlebar by invoking GET /post-detail (homeRoutes.js)
 * 
 *********************************************************************************/
const addCommentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {

    const postId = event.target.getAttribute('data-id'); 
    const comment = document.querySelector('#comment-text').value.trim();

    // Debug logs
    console.log('---> Inside addCommentHandler in (public/js/comment.js): postId = ' + postId);
    console.log('---> Inside addCommentHandler in (public/js/comment.js): comment = ' + comment); 

    if (comment) {
      const response = await fetch(`/api/comments/post/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/post-detail');
      } else {
        console.log('---> Inside addCommentHandler in (public/js/comment.js): Failed to create comment');
        alert(response.statusText);
      }
    }
    else {
      alert('Please enter a comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', addCommentHandler);