/* Original comments section in post-detail.handlebars:
{{#if comments.length}}
    <div class="col-md-6 post-list">
      <h3>Current comments:</h3>

      {{#each comments as |comment|}}
      <div class="row mb-2">
        <div class="col-md-8">
          <p>{{comment.content}}</p>
          <p>Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p>
        </div>
        <br><br>
      </div>
      {{/each}}
    </div>
  {{/if}}
*/

/* To center the comments section on the screen, you need to apply the correct Bootstrap or 
custom CSS to the comments container. The issue arises because the 
<div class="col-md-6 post-list"> class sets a width of 50% (half of the screen width), 
but it doesn't apply any centering rules by default.

Here’s how you can fix it:

Approach 1: Using Bootstrap's Grid System
Wrap the comments section in a Bootstrap row and use the mx-auto class to center it horizontally.
*/


{{#if comments.length}}
  <div class="row justify-content-center">
    <div class="col-md-6 post-list">
      <h3>Current comments:</h3>

      {{#each comments as |comment|}}
      <div class="row mb-2">
        <div class="col-md-8">
          <p>{{comment.content}}</p>
          <p>Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p>
        </div>
        <br><br>
      </div>
      {{/each}}
    </div>
  </div>
{{/if}}

Explanation:
I wrapped the comments section in a new row div with the justify-content-center class. This class 
uses Flexbox to horizontally center its contents within the parent container.
The col-md-6 class still limits the width of the comments to 50% of the screen, but the row 
justify-content-center ensures that it's centered.

Approach 2: Using Custom CSS
If you want more control, you can also use custom CSS to center the post-list div.

Add the following custom CSS to your stylesheet:
.post-list {
  margin-left: auto;
  margin-right: auto;
  float: none;
}

And update the Handlebars template:
{{#if comments.length}}
  <div class="col-md-6 post-list">
    <h3>Current comments:</h3>

    {{#each comments as |comment|}}
    <div class="row mb-2">
      <div class="col-md-8">
        <p>{{comment.content}}</p>
        <p>Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p>
      </div>
      <br><br>
    </div>
    {{/each}}
  </div>
{{/if}}

Explanation:
The margin-left: auto and margin-right: auto properties ensure that the post-list div is 
centered within its parent container.
This method is helpful if you want to center the content but do not want to alter the 
structure using Bootstrap classes.

Either approach will center your comments section while keeping the rest of your layout intact. 

// ------------------------------------------
The second approach using CSS worked partially. 
The <h3>Current comments:</h3> is centered on the page perfectly.

The following however:
 <p>{{comment.content}}</p>
 <p>Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p> 

Seem to have moved toward the center but are not exactly centered in reference to the 
title <h3>Current comments:</h3></div></div>

The issue you're describing happens because the paragraphs (<p>) inside the comment 
block are being aligned relative to their containing col-md-8 div, which is smaller 
than the full width of the container.

To fix this and align the contents exactly under the centered title, you can use 
Flexbox or adjust the Bootstrap column structure. Here's how to fix this using 
Flexbox for centering both the title and the comment content:

Updated Handlebar Template with Flexbox:

{{#if comments.length}}
  <div class="col-md-6 post-list">
    <h3>Current comments:</h3>

    {{#each comments as |comment|}}
    <div class="row justify-content-center mb-2">
      <div class="d-flex flex-column align-items-center col-md-8">
        <p>{{comment.content}}</p>
        <p>Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p>
      </div>
      <br><br>
    </div>
    {{/each}}
  </div>
{{/if}}

Explanation:
The d-flex flex-column align-items-center classes on the col-md-8 div make it a Flexbox 
container. This allows the paragraph content inside to be aligned vertically in the center.

align-items-center ensures that the content is centered horizontally within its column.

If you don't want to use Flexbox or you prefer a simpler approach, you can apply text alignment directly to the <p> tags by adding this CSS to your stylesheet:

CSS for Paragraph Centering:

.post-list p {
  text-align: center;
}

This will ensure that all paragraphs inside .post-list are centered horizontally.

Final Handlebar Template:

{{#if comments.length}}
  <div class="col-md-6 post-list">
    <h3>Current comments:</h3>

    {{#each comments as |comment|}}
    <div class="row mb-2">
      <div class="col-md-8">
        <p>{{comment.content}}</p>
        <p>Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p>
      </div>
      <br><br>
    </div>
    {{/each}}
  </div>
{{/if}}

----------------------------------------
Q's recommendation:
----------------------------------------
I can see the issue you're experiencing with the alignment of the comments. Let's 
analyze the problem and provide a solution.

The issue:
The main problem is that you're using Bootstrap's grid system ( col-md-6, col-md-8) 
inside the comment list, which is interfering with the centering effect you're trying 
to achieve with your custom CSS.

Here's how we can fix it:

1. Remove the Bootstrap column classes from the comment list structure.

2. Adjust the CSS to center the content properly.

Here's the modified Handlebars template for the comments section:
{{#if comments.length}}
  <div class="comment-list">
    <h3>Current comments:</h3>

    {{#each comments as |comment|}}
    <div class="comment-item">
      <p class="comment-content">{{comment.content}}</p>
      <p class="comment-meta">Posted by {{comment.user.name}} on {{format_date comment.date_created}}</p>
    </div>
    {{/each}}
  </div>
{{/if}}

Now, let's update the CSS to properly center the comments:

.comment-list {
  width: 100%;
  max-width: 600px; /* Adjust this value as needed */
  margin-left: auto;
  margin-right: auto;
}

.comment-list h3 {
  text-align: center;
}

.comment-item {
  text-align: center;
  margin-bottom: 20px;
}

.comment-content {
  margin-bottom: 5px;
}

.comment-meta {
  font-size: 0.9em;
  color: #666;
}

These changes will:

1. Remove the Bootstrap grid classes that were causing alignment issues.

2. Center the entire comment list with a maximum width.

3. Center the text for the comment content and metadata.

4. Add some spacing between comments for better readability.

With these modifications, your comments should be properly centered and aligned 
with the "Current comments" heading. The max-width property on .comment-list ensures 
that the comments don't stretch too wide on larger screens, but you can adjust this 
value as needed for your design.

Remember to remove or comment out the previous CSS rules for .comment-list that you 
shared earlier, as they will be replaced by these new rules.

This solution should resolve the alignment issues you were experiencing with your 
comments section.

-----------------------------------------------------
OK. Just removing the bootstrap's ( col-md-6, col-md-8) and keeping my original CSS 
without any changes, fixed the problem. 
I am still keeping the original CSS as:

.comment-list {
margin-left: auto;
margin-right: auto;
float: none;
}

.comment-list p {
text-align: center;
}

I'm glad to hear that removing the Bootstrap grid classes resolved the alignment issue. 
Your solution is correct and efficient. Let's review the changes and why they work: 

[1] Removing Bootstrap classes: By removing col-md-6 and col-md-8, you've eliminated the grid system 
constraints that were causing the misalignment. 

[2] Using comment-list class: The comment-list class is now directly applied to the container div for 
comments, which allows your CSS to work as intended.

Simplified structure: The new structure with comment-item, comment-content, and comment-meta classes 
provides a cleaner, more semantic markup.

Your current CSS is working well.  

This CSS does the following:

1. Centers the entire comment list block using margin-left: auto; margin-right: auto;
2. Removes any floating effects with float: none;
3. Centers the text of all paragraphs within the comment list

The simplicity of this solution is its strength. It achieves the desired centering effect 
without introducing unnecessary complexity.

If you want to fine-tune the appearance further, you could consider adding some spacing 
between comments:

.comment-item {
  margin-bottom: 20px;
}

This would add some vertical space between each comment for better readability.

Your updated Handlebars template looks good, maintaining the overall structure with the title, 
description, and creation info at the top, followed by the centered comments list. 

This approach ensures consistency in the layout and improves the overall user experience.

