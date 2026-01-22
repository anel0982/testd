// Array containing different titles to cycle through
var titles = [
   "@",
  "@H",
  "@Ha",
  "@Har",
  "@Haru",
  "@Harusa",
  "@Harusa/",
  "@Harusa/K",
  "@Harusa/KH",
  "@Harusa/KHAN",
  "@Harusa/KHANG",
  "@Harusa/KHANGBEL",
  "@HARUSA/KHANGBEL"
];

// Function to change the title periodically
function changeTitle() {
  var index = 0; // Initialize index to start from the first title

  // Set interval to change the title every 1000 milliseconds (1 second)
  setInterval(function() {
      // Set the document title to the title at the current index
      document.title = titles[index];
      // Increment the index and use modulo operator to ensure it stays within the bounds of the array
      index = (index + 1) % titles.length;
  }, 700); // Interval set to 1000 milliseconds (1 second)
}

// Call the function to start changing the title
changeTitle();
