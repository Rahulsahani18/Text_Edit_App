import React, { useEffect, useState } from 'react';
import './App.css'; // for custom CSS

const DraggableTextBox = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [newFont, setNewFont] = useState(localStorage.getItem('font') || 'Verdana');
  const [newFontSize, setNewFontSize] = useState(localStorage.getItem('fontSize') || '16');
  const [boldFont, setBoldFont] = useState(localStorage.getItem('boldFont') || false);
  const [italicFont, setItalicFont] = useState(localStorage.getItem('italicFont') || false);
  const [underLineFont, setUnderlineFont] = useState(localStorage.getItem('underlineFont') || false);
  const [alignCenter, setAlignCenter] = useState(localStorage.getItem('alignCenter') || false);

  const [history, setHistory] = useState([]); // Stack for undo/redo
  const [redoStack, setRedoStack] = useState([]); // Stack for redo actions

  const [text, setText] = useState(localStorage.getItem('newText') || 'Drag me!'); // State for the draggable text
  const [showInputBox, setShowInputBox] = useState(false); // Control the visibility of the input box
  const [inputValue, setInputValue] = useState(''); // State for the input text

  // Save the current state to the history stack
  const saveStateToHistory = () => {
    const currentState = {
      newFont,
      newFontSize,
      boldFont,
      italicFont,
      underLineFont,
      alignCenter,
      text,
    };
    setHistory([...history, currentState]);
    setRedoStack([]); // Clear redo stack on any new action
  };

  const handleFontChange = (e) => {
    saveStateToHistory();
    const value = e.target.value;
    setNewFont(value);
    localStorage.setItem('font', value);
  };

  const handleFontSize = (e) => {
    saveStateToHistory();
    const value = e.target.value;
    setNewFontSize(value);
    localStorage.setItem('fontSize', value);
  };

  const handleBold = () => {
    saveStateToHistory();
    setBoldFont(!boldFont);
    localStorage.setItem('boldFont', boldFont ? '' : 'bold');
  };

  const handleItalicFont = () => {
    saveStateToHistory();
    setItalicFont(!italicFont);
    localStorage.setItem('italicFont', italicFont ? '' : 'italic');
  };

  const handleUnderLine = () => {
    saveStateToHistory();
    setUnderlineFont(!underLineFont);
    localStorage.setItem('underlineFont', underLineFont ? '' : 'underline');
  };

  const handleAlignCenter = () => {
    saveStateToHistory();
    setAlignCenter(!alignCenter);
    localStorage.setItem('alignCenter', alignCenter ? '' : 'center');
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoStack([{
        newFont,
        newFontSize,
        boldFont,
        italicFont,
        underLineFont,
        alignCenter,
        text,
      }, ...redoStack]); // Push current state to redo stack
      setHistory(history.slice(0, -1)); // Remove the last state from history

      // Restore the last state
      setNewFont(lastState.newFont);
      setNewFontSize(lastState.newFontSize);
      setBoldFont(lastState.boldFont);
      setItalicFont(lastState.italicFont);
      setUnderlineFont(lastState.underLineFont);
      setAlignCenter(lastState.alignCenter);
      setText(lastState.text);

    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setHistory([...history, {
        newFont,
        newFontSize,
        boldFont,
        italicFont,
        underLineFont,
        alignCenter,
        text,
      }]); // Push current state to history
      setRedoStack(redoStack.slice(1)); // Remove the first state from redo stack

      // Restore the next state
      setNewFont(nextState.newFont);
      setNewFontSize(nextState.newFontSize);
      setBoldFont(nextState.boldFont);
      setItalicFont(nextState.italicFont);
      setUnderlineFont(nextState.underLineFont);
      setAlignCenter(nextState.alignCenter);
      setText(nextState.text);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleAddText = () => {
    setShowInputBox(true);
  };

  const handleInputChange = (e) => {

    setInputValue(e.target.value);
  };

  const handleSaveText = () => {
    if(inputValue===''){
      alert('Please enter new text');
      return
    }
      setText(inputValue); // Update the draggable text with input value
      setShowInputBox(false); // Hide input box
      localStorage.setItem('newText',inputValue)
      setInputValue(''); // Clear input value
      saveStateToHistory(); 
   
  };

  return (
    <>
      <div className="container-fluid UndoRedoContainer">
        <div className="text-center">
          <span>
            <i className="fs-4 me-4 mt-3 fa-solid fa-rotate-left undoBtn" onClick={handleUndo}></i>
          </span>
          <span>
            <i className="fs-4 fa-solid fa-rotate-right redoBtn" onClick={handleRedo}></i>
          </span>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div
          style={{ display: "flex", justifyContent: alignCenter ? 'center' : '' }}
          className="box col-md-12"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Stop dragging when leaving the box
        >
          <div
            className="draggable-text"
            onMouseDown={handleMouseDown}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          >
            <p style={{
              fontFamily: newFont,
              fontSize: `${newFontSize}px`,
              fontWeight: boldFont ? "bold" : '',
              fontStyle: italicFont ? "italic" : '',
              textDecoration: underLineFont ? 'underline' : ''
            }}>
              {text} {/* Updated text will be displayed here */}
            </p>
          </div>
        </div>
      </div>

      <div id="controls" className="mt-3 text-center">
        <label htmlFor="fontSelect">Font: </label>
        <select id="fontSelect" className="text-center" onChange={handleFontChange} value={newFont}>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>

        <input
          className="text-center fontSize"
          type="number"
          placeholder="Font Size"
          value={newFontSize}
          onChange={handleFontSize}
        />

        <span>
          <i className="ms-2 fa-solid fa-bold" onClick={handleBold} ></i>
        </span>
        <span>
          <i className="ms-3 fa-solid fa-italic" onClick={handleItalicFont}></i>
        </span>
        <span>
          <i className="ms-3 fa-solid fa-align-center" onClick={handleAlignCenter}></i>
        </span>
        <span>
          <i className="ms-3 fa-solid fa-underline" onClick={handleUnderLine}></i>
        </span>
 
        {showInputBox && (
          <div className="row mt-2">
            <div className="col-md-12 text-center d-flex justify-content-center">

            <input type="text" onChange={handleInputChange}  value={inputValue} className="form-control w-25" placeholder="Enter new text"/>
              <button className="btn btn-primary ms-2" onClick={handleSaveText}>
                Save Text
              </button>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-warning rounded-pill mt-3" onClick={handleAddText}>Add Text</button>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default DraggableTextBox;
