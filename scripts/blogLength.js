function blogLength(id) {
  // split on whitespace and newline
  words = id.innerText.split(/\s+/);
  document.getElementById("time").innerHTML =
    Math.ceil(words.length / 200) + " mins read";
}
