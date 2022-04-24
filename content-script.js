var indexExists = document.querySelector('[title="index.html"]');

var secondaryExists = document.querySelector('[title$=".html"]');

if (indexExists) {
  var indexLink = indexExists.getAttribute("href");
  result = { is: true, link: indexLink };
} else if (secondaryExists) {
  var secondaryLink = secondaryExists.getAttribute("href");

  result = { is: true, link: secondaryLink };
} else {
  result = { is: false };
}
