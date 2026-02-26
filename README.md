In this next assignment, you will design, implement, and deploy a responsive front-end
replica of the Tweeter website using HTML, CSS, and JavaScript. The application must
work correctly across multiple screen sizes and major web browsers, and be publicly
accessible via GitHub Pages.
Your task:
Part 1: HTML Requirements:
Create the page structure with two main components:
1. Top Navigation Bar. Include the Tweeter logo and the text “Tweeter”.
2. Main Content Area. Include:
a) A photo holder (a gray circle) to include profile’s picture.
b) An HTML textarea for entering messages
c) A button labeled “tweeet”.
d) A label that shows the number remaining characters in the messages
e) Provide a sample posted tweet including a photo holder, your name and
@username as well date/time information (boilerplate) and four icons:
comment, retweet, link and upload.
Part 2: CSS Styling Requirements:
• Use light blue tones and white backgrounds to style the application to
resemble Tweeter.
• Top navigation bar must occupy 100% viewport’s width
• Keep it clean with enough air between components. To do so, use proper
padding, margin and alignment
• Button must be rounded with hover and active states
• Make it responsive. Your design must be usable on large TVs, desktop,
tablets, and phones. You can use media queries, flex-box, css-grid or
bootstrap to accomplish this requirement.
Part 3: Dynamic content using JavaScript. Requirements:
• Create a function to validate user’s input. This function should:
o Enforce a 160-character limit per tweet
o If the limit is exceeded, prevent submission by disabling the ‘tweet’ button
CSCI 3342
Project #1
o Use the text in the label to show a clear message about this 160-char limit
• Create another function that is called every time users enter text in the textArea.
This function should:
o Update the label where you display the number of remaining characters.
Part 4: Deployment & Cross-Platform Testing
The application must be well-tested and deployed using GitHub Pages. Your submission
must include access to a public URL and repository, which shows the index.html,
external CSS files and JavaScript files. Test your deployed application using different
common browsers, such as Safari, Chrome, and Fire Fox. Also, to test mobile
responsiveness, you may use the browser developer tools.
Sample Output:
CSCI 3342
Project #1
Grading Criteria:
Part 1: HTML Structure
−5 pts: Top navigation bar missing required text and/or icon
−5 pts: Tweet area missing
−3 pts: Tweet area incomplete
−5 pts: Previous tweet missing
−3 pts: Previous tweet incomplete
Part 2: CSS Styling & Responsiveness
−5 pts: External CSS stylesheet not linked or not used
−5 pts: Color scheme does not resemble Tweeter (light blue/white tones)
−5 pts: Spacing, alignment, or layout issues negatively impact usability
−5 pts: Button hover and/or active states are missing
−5 pts: Responsive design is not implemented or does not function
Part 3: JavaScript Functionality
−5 pts: External JavaScript file not linked or not used
−10 pts: Tweet length validation logic is missing
−5 pts: Tweet length validation is incomplete or contains errors
−10 pts: Character count update functionality is missing
−5 pts: Character count update is incomplete or contains errors
Part 4: Deployment & Cross-Platform Testing
−25 pts: Application is not deployed to GitHub Pages
−5 pts: Responsive design or functionality issues observed across browsers or platforms