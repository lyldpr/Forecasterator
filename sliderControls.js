var slider = document.getElementById("sliderRange");
var output = document.getElementById("year");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
//   console.log(this.value)
}