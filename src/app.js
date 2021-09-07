import { http } from "./http"
import { UI } from "./ui"

document.addEventListener("DOMContentLoaded", getPost)
document.getElementById("post_submit").addEventListener("click", submitPost)
document.querySelector(".posts-container").addEventListener("click", deletePost)
document.querySelector(".posts-container").addEventListener("click", updatePost)
document.querySelector(".container").addEventListener("click", cancel_button)

function getPost() {
 http
  .get("http://localhost:3000/posts")
  .then(result => UI.showposts(result))
  .catch(err => console.log(err))
}

function submitPost() {
 let title = document.getElementById("title").value
 let body = document.getElementById("post_field").value
 let id = document.getElementById("id").value
 let data = {
  title,
  body,
 }

 if (title === "" || body === "") {
  UI.addAlert("Please Fill all fields", "warning")
 } else {
  if (id === "") {
   http
    .post("http://localhost:3000/posts", data)
    .then(data => {
     UI.clearFields()
     UI.addAlert("Added Successfully", "success")
     getPost()
    })
    .catch(err => console.log(err))
  } else {
   console.log(id)
   http
    .put(`http://localhost:3000/posts/${id}`, data)
    .then(data => {
     UI.addAlert("Updated Successfully", "success")
     UI.changeTheState("finish_update")
     getPost()
    })
    .catch(err => console.log(err))
  }
 }
}

function deletePost(e) {
 if (e.target.id === "delete") {
  const id = e.target.dataset.id

  if (confirm("Delete -> Are You Sure ")) {
   http.delete(`http://localhost:3000/posts/${id}`).then(data => {
    UI.addAlert("Removed Successfully", "warning")
    getPost()
   })
  }
 }
}

function updatePost(e) {
 if (e.target.id === "edit") {
  const id = e.target.dataset.id
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
  const body = e.target.parentElement.previousElementSibling.textContent
  let data = {
   id,
   title,
   body,
  }
  UI.fillAllForms(data)
 }
}

function cancel_button(e) {
 if (e.target.id === "cancel-button") {
  UI.changeTheState("post")
 }
}
