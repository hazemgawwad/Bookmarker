//! HTML elements
const siteName = document.querySelector("#siteName")
const siteUrl = document.querySelector("#siteUrl")
const submitBtn = document.querySelector("#submitBtn")
const bookmarksTableBody = document.querySelector("#bookmarksTableBody")

//! App Variables
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
siteNameRegex = /^[a-zA-Z0-9\s]{3,}$/
siteUrlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/
displayBookmarks()
//! Functions
function addBookmark() {
    if (siteNameRegex.test(siteName.value) && siteUrlRegex.test(siteUrl.value)) {
        const bookmark = {
            name: siteName.value,
            url: siteUrl.value
        }
        bookmarks.push(bookmark)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        displayBookmarks()
        clearForm()
    } else {
        alert("Please enter a valid site name and URL.")
    }
}
function normalizeURL(url) {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}

function displayBookmarks() {
    bookmarksTableBody.innerHTML = ""
    bookmarks.forEach((bookmark, index) => {
        bookmarksTableBody.innerHTML += `
            <tr>
                <td class="text-center text-white">${index + 1}</td>
                <td class="text-white">${bookmark.name}</td>
                <td><a href="${normalizeURL(bookmark.url)}" target="_blank" class="btn btn-primary w-100">Visit</a></td>
                <td class="text-center"><button class="btn btn-danger w-100" onclick="deleteBookmark(${index})">Delete</button></td>
            </tr>
        `
    })
}
function validate(regex, element) {
  const errorMessage = element.nextElementSibling;
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.style.display = "none";
    }
    return true;
  }
  element.classList.add("is-invalid");
  element.classList.remove("is-valid");
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.style.display = "block";
  }
  return false;
}
function deleteBookmark(index) {
    bookmarks.splice(index, 1)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    displayBookmarks()
}
function clearForm() {
    siteName.value = ""
    siteUrl.value = ""
    siteName.classList.remove("is-valid", "is-invalid")
    siteUrl.classList.remove("is-valid", "is-invalid")
}
//! Events
submitBtn.addEventListener("click", addBookmark)
siteName.addEventListener("input", () => validate(siteNameRegex, siteName))
siteUrl.addEventListener("input", () => validate(siteUrlRegex, siteUrl))
