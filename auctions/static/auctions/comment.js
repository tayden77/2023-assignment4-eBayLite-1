document.addEventListener('DOMContentLoaded', function () {
    var commentForm = document.getElementById('comment_block');
    var commentDisplay = document.getElementById('comment_display');

    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Serialize the form data into a URL-encoded string
        var formData = new FormData(commentForm);

        // Send the form data to the server using AJAX
        fetch(commentForm.getAttribute('action'), {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response (e.g., display a success message)
            console.log(data.message);

            // Update the comments display without refreshing the page
            fetchComments();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Function to fetch and update comments
    function fetchComments() {
        fetch('get_comments/')
        .then(response => response.json())
        .then(comments => {
            // Clear the existing comments
            commentDisplay.innerHTML = '';

            // Render the new comments
            if (comments.length > 0) {
                comments.forEach(comment => {
                    var commentCard = document.createElement('div');
                    commentCard.className = 'card bg-dark mb-3';

                    commentCard.innerHTML = `
                        <div class="card-header">
                            <strong>${comment.user.username}</strong>
                            <div class="text-muted small">
                                commented on ${comment.cm_date}
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${comment.headline}</h5>
                            <p class="card-text">${comment.message}</p>
                        </div>
                    `;

                    commentDisplay.appendChild(commentCard);
                });
            } else {
                // Display a message when there are no comments
                var noCommentsMessage = document.createElement('p');
                noCommentsMessage.textContent = 'No comments so far.';
                commentDisplay.appendChild(noCommentsMessage);
            }
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
    }
    fetchComments();
});