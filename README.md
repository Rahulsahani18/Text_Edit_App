Overview
The DraggableTextBox is a React component that allows users to drag and drop a text box within a container. It provides customizable text properties such as font, size, bold, italic, underline, and text alignment. Additionally, the component supports undo/redo functionality to manage text styling history and allows users to input and save custom text.

Features
Drag-and-drop functionality for text boxes
Customizable text styles (font family, size, bold, italic, underline)
Align text to the center
Undo/redo functionality to manage text changes
Save and retrieve text styles using localStorage
Add custom text through an input field
Technologies Used
React.js: Frontend framework
JavaScript (ES6+): Core language
CSS: Styling for custom design and layout
Font Awesome: Icons for bold, italic, and other text features
localStorage: Used to persist font settings and text across sessions

Usage
Dragging the Text Box:

Click and drag the text box to move it around the container.
Customizing Text:

Use the dropdown to select a font.
Change the font size by inputting a value in the font size field.
Toggle bold, italic, underline, and center alignment using the respective icons.
Undo/Redo:

Click the undo (⤺) button to revert to the previous text style.
Click the redo (⤼) button to restore the most recent undone style change.
Adding Custom Text:

Click "Add Text" to display an input box.
Type your desired text and click "Save Text" to update the draggable text box.
Local Storage Persistence
The component saves the following attributes in localStorage so that they persist across browser sessions:

Font Family (font)
Font Size (fontSize)
Bold (boldFont)
Italic (italicFont)
Underline (underlineFont)
Center alignment (alignCenter)
Text content (newText)
Dependencies
React.js: ^17.0.2
Font Awesome: ^6.x
 
 
