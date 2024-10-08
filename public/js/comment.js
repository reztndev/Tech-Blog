const addCommentHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  if (event.target.hasAttribute('data-id')) {

    const postId = event.target.getAttribute('data-id'); 
    const comment = document.querySelector('#comment-text').value.trim();

    // Debug logs
    console.log('---> Inside addCommentHandler in (public/js/comment.js): postId = ' + postId);
    console.log('---> Inside addCommentHandler in (public/js/comment.js): comment = ' + comment); 

    if (comment) {
      //const response = await fetch(`/api/comments/post/${postId}`, {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ content: comment }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/post/${postId}`);
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