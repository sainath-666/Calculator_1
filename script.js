let resultDisplay = document.getElementById('result');

// Append value to the display
function appendValue(value) {
  resultDisplay.value += value;
  animateInput(); // Add animation
}

// Clear the display
function clearDisplay() {
  resultDisplay.value = '';
  animateInput(); // Add animation
}

// Calculate the result
function calculateResult() {
  try {
    resultDisplay.value = eval(resultDisplay.value);
  } catch (error) {
    alert('Invalid Expression!');
  }
  animateInput(); // Add animation
}

// Add animation effect on the display
function animateInput() {
  resultDisplay.classList.add('flash');
  setTimeout(() => resultDisplay.classList.remove('flash'), 200);
}
