// Simple Admin Password
let password = "admin123";

// LOGIN FUNCTION
function login(){
  let p = document.getElementById("pass").value;
  if(p === password){
    document.getElementById("login").style.display="none";
    document.getElementById("app").style.display="block";
    load();
    loadPravachan();
    loadGallery();
  }else{
    alert("Wrong password!");
  }
}

// LOGOUT
function logout(){
  document.getElementById("app").style.display="none";
  document.getElementById("login").style.display="block";
  document.getElementById("pass").value="";
}

// ----------------- ATTENDANCE -----------------
function add(){
  let name=document.getElementById("name").value;
  if(name.trim()==""){ alert("Enter a name"); return;}
  let data=JSON.parse(localStorage.getItem("balaks"))||[];
  data.push(name);
  localStorage.setItem("balaks",JSON.stringify(data));
  document.getElementById("name").value="";
  load();
}

function load(){
  let data=JSON.parse(localStorage.getItem("balaks"))||[];
  let list=document.getElementById("list");
  list.innerHTML="";
  data.forEach((n,i)=>{
    list.innerHTML+=`
      <li>${n}
      <button onclick="del(${i})">Delete</button>
      </li>`;
  });
}

function del(i){
  let data=JSON.parse(localStorage.getItem("balaks"));
  data.splice(i,1);
  localStorage.setItem("balaks",JSON.stringify(data));
  load();
}

// ----------------- PRAVACHAN -----------------
function addPravachan(){
  let name=document.getElementById("pravachan").value;
  let topic=document.getElementById("topic").value;
  if(name.trim()=="" || topic.trim()==""){ alert("Enter name and topic"); return;}
  let data=JSON.parse(localStorage.getItem("pravachan"))||[];
  data.push({name,topic});
  localStorage.setItem("pravachan",JSON.stringify(data));
  document.getElementById("pravachan").value="";
  document.getElementById("topic").value="";
  loadPravachan();
}

function loadPravachan(){
  let data=JSON.parse(localStorage.getItem("pravachan"))||[];
  let list=document.getElementById("pravachanList");
  list.innerHTML="";
  data.forEach((d,i)=>{
    list.innerHTML+=`
      <li>${d.name} → ${d.topic}
      <button onclick="delPravachan(${i})">Delete</button>
      </li>`;
  });
}

function delPravachan(i){
  let data=JSON.parse(localStorage.getItem("pravachan"));
  data.splice(i,1);
  localStorage.setItem("pravachan",JSON.stringify(data));
  loadPravachan();
}

// ----------------- EVENT GALLERY -----------------
function addEventPhotos(){
  let files = document.getElementById("eventPhoto").files;
  if(files.length==0){ alert("Select photo(s)"); return;}
  let gallery = JSON.parse(localStorage.getItem("gallery")) || [];

  Array.from(files).forEach(file => {
    let reader = new FileReader();
    reader.onload = function(){
      gallery.push(reader.result);
      localStorage.setItem("gallery", JSON.stringify(gallery));
      loadGallery();
    }
    reader.readAsDataURL(file);
  });
}

function loadGallery(){
  let gallery = JSON.parse(localStorage.getItem("gallery")) || [];
  let galleryDiv = document.getElementById("gallery");
  galleryDiv.innerHTML = "";
  gallery.forEach((img,i)=>{
    galleryDiv.innerHTML+=`<div style="display:inline-block;position:relative;">
      <img src="${img}">
      <button style="position:absolute;top:5px;right:5px;" onclick="delPhoto(${i})">X</button>
    </div>`;
  });
}

function delPhoto(i){
  let gallery = JSON.parse(localStorage.getItem("gallery"));
  gallery.splice(i,1);
  localStorage.setItem("gallery",JSON.stringify(gallery));
  loadGallery();
}
