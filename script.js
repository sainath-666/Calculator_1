let resultDisplay = document.getElementById('result');

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
  // Add keyboard support
  document.addEventListener('keydown', handleKeyPress);
});

// Handle keyboard input
function handleKeyPress(event) {
  const key = event.key;
  
  // Numbers and operators
  if (/[0-9+\-*/.=]/.test(key)) {
    event.preventDefault();
    if (key === '=') {
      calculateResult();
    } else {
      appendValue(key);
    }
  }
  
  // Enter key for calculation
  if (key === 'Enter') {
    event.preventDefault();
    calculateResult();
  }
  
  // Backspace for delete
  if (key === 'Backspace') {
    event.preventDefault();
    deleteLastChar();
  }
  
  // Escape for clear
  if (key === 'Escape') {
    event.preventDefault();
    clearDisplay();
  }
}

// Append value to the display
function appendValue(value) {
  // Prevent multiple operators in a row
  const lastChar = resultDisplay.value.slice(-1);
  if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
    resultDisplay.value = resultDisplay.value.slice(0, -1) + value;
  } else {
    resultDisplay.value += value;
  }
  animateInput();
}

// Delete the last character
function deleteLastChar() {
  resultDisplay.value = resultDisplay.value.slice(0, -1);
  animateInput();
}

// Clear the display
function clearDisplay() {
  resultDisplay.value = '';
  animateInput();
}

// Calculate the result
function calculateResult() {
  try {
    // Validate the expression
    const expression = resultDisplay.value;
    if (!expression) return;
    
    // Check for invalid expressions
    if (/[+\-*/]{2,}/.test(expression)) {
      throw new Error('Invalid operators sequence');
    }
    
    // Calculate and format the result
    const result = eval(expression);
    
    // Handle division by zero and other errors
    if (!isFinite(result)) {
      throw new Error('Math error');
    }
    
    // Format the result to avoid long decimals
    resultDisplay.value = parseFloat(result.toFixed(8));
  } catch (error) {
    // Show error with animation
    resultDisplay.value = '';
    resultDisplay.placeholder = 'Error';
    resultDisplay.classList.add('error');
    
    setTimeout(() => {
      resultDisplay.placeholder = '0';
      resultDisplay.classList.remove('error');
    }, 1500);
  }
  animateInput();
}

// Add animation effect on the display
function animateInput() {
  resultDisplay.classList.add('flash');
  setTimeout(() => resultDisplay.classList.remove('flash'), 200);
}
