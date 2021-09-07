class ui {
  constructor(){
    this.postContainer = document.querySelector('.posts-container');
    this.title_input = document.getElementById('title');
    this.post_field = document.getElementById('post_field');
    this.submit_btn = document.getElementById('post_submit');
    this.id = document.getElementById('id');
  }


  showposts(data){  
   
      let postHtml = '';
      data.forEach(post => {
     
        postHtml += `
        <div class="post">
        <h3>${post.title}</h3>
        <p class="body-post">${post.body}</p>
        <div class="edit-delete">
          <img id="edit" src="./icons/edit.png" alt="" data-id="${post.id}">
          <img id="delete"  src="./icons/delete.png" alt="" data-id="${post.id}">
        </div>
      </div>
        `;
      });

      this.postContainer.innerHTML = postHtml;
  }

  clearFields(){
    this.title_input.value = "";
    this.post_field.value = "";
  }

  addAlert(text , className){
    console.log('ui');
    let div = document.createElement('div');
    div.className = `message ${className}`;
    div.style.display = 'block';
    div.id = 'alert';
    div.textContent = text;
    let body = document.querySelector('body');
    let post = document.querySelector('.posts-container');
    body.insertBefore(div , post);
    this.submit_btn.style.display = "none";
    setTimeout(()=>{
       this.removeAlert();
       this.submit_btn.style.display = "block";
    },2000)
  }
  removeAlert(){
    const alert = document.getElementById('alert');
    if(alert){
      alert.remove();
    }
  }

  fillAllForms(data){
    this.title_input.value = data.title;
    this.post_field.value = data.body;
    this.id.value = data.id;
    this.changeTheState('update');
  }

  changeTheState(type){

    if(type === "update"){
    this.submit_btn.textContent = "update";

    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = "cancel";
    cancelBtn.id = "cancel-button";

    let cancelinsert = document.querySelector('cancel-before');
    let container= document.querySelector('.container');
    container.insertBefore(cancelBtn,cancelinsert);
    }else{
      this.submit_btn.textContent = "submit";
      document.getElementById('cancel-button').remove();

      this.clearIdField();
      this.clearFields()
    }
   
  }
  clearIdField(){
    id.value = "";
  }
}


export const UI = new ui();