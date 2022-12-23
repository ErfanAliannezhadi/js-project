//  constants
const form = document.getElementById("post-form");
const post_list = document.getElementById("post-list");
// post class
class Post {
  constructor(title, auther, body) {
    this.title = title;
    this.auther = auther;
    this.body = body;
  }

  add_to_list() {
    const list = document.getElementById("post-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <th>${this.title}</th>
    <td>${this.auther}</td>
    <td>${this.body}</td>
    <td><i class="fas fa-times mx-auto text-danger delete"></i></td>
    `;
    list.appendChild(row);
  }

  static get_posts_from_LS() {
    let posts;
    if (localStorage.getItem("posts") == null) {
      posts = [];
    } else {
      posts = JSON.parse(localStorage.getItem("posts"));
    }
    return posts;
  }
  save_to_LS() {
    let posts = Post.get_posts_from_LS();
    posts.push(this);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  remove_from_ls(){
    let posts = Post.get_posts_from_LS()
    for(let post of posts){
        if(post.title == this.title && post.auther == this.auther && post.body == this.body){
            posts.splice(post,1)
        }
        localStorage.setItem('posts', JSON.stringify(posts))
    }
  }

  static clear_fields() {
    document.getElementById("title").value = "";
    document.getElementById("auther").value = "";
    document.getElementById("body").value = "";
  }

  static show_alert(message, classname) {
    const alert = document.createElement("div");
    const col = document.querySelector(".col-sm-8");
    alert.className = `alert alert-${classname}`;
    alert.appendChild(document.createTextNode(message));
    col.insertBefore(alert, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 5000);
  }

  static display_posts() {
    const posts = Post.get_posts_from_LS();
    for(let post of posts){
      const post_instance = new Post(post.title, post.auther, post.body);
      post_instance.add_to_list();
    };
  }
}
// main functions
function submit_post(e) {
  const title = document.getElementById("title").value;
  const auther = document.getElementById("auther").value;
  const body = document.getElementById("body").value;
  if (title == "" || auther == "" || body == "") {
    Post.show_alert("تمام فیلد ها الزامی است", "danger");
  } else {
    const post = new Post(title, auther, body);
    post.add_to_list();
    post.save_to_LS();
    Post.clear_fields();
    Post.show_alert("پست با موفقیت ایجاد شد", "success");
  }
  e.preventDefault();
}

function delete_post(e) {
  if (e.target.classList.contains("delete")) {
    element = e.target.parentElement.parentElement.children
    const post = new Post(
        title = element[0].textContent,
        auther = element[1].textContent,
        body = element[2].textContent
    )
    post.remove_from_ls()
    e.target.parentElement.parentElement.remove();
    Post.show_alert("پست با موفقیت حذف شد", "warning");
  }
}
// the main programme
document.addEventListener("DOMContentLoaded", Post.display_posts);
form.addEventListener("submit", submit_post);
post_list.addEventListener("click", delete_post);
