/* ===== LOGIN ===== */

function login(){
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if(u==="mani" && p==="mani123"){
        window.location.href="dashboard.html";
    }else{
        alert("Wrong login");
    }
}

function logout(){
    window.location.href="index.html";
}


/* ===== ATTENDANCE ===== */

let students = JSON.parse(localStorage.getItem("students")) || [];

function save(){
    localStorage.setItem("students", JSON.stringify(students));
}

function addStudent(){
    let name = document.getElementById("student").value;
    if(!name) return;

    students.push({name,total:0,present:0});
    save();
    display();
}

function addBulk(){
    let lines = document.getElementById("bulk").value.split("\n");

    lines.forEach(l=>{
        if(l.trim()){
            students.push({name:l,total:0,present:0});
        }
    });

    save();
    display();
}

function mark(i,isPresent){
    students[i].total++;
    if(isPresent) students[i].present++;
    save();
    display();
}

function del(i){
    students.splice(i,1);
    save();
    display();
}

function display(){

    let list = document.getElementById("list");
    if(!list) return;

    list.innerHTML="";

    students.forEach((s,i)=>{

        let percent = s.total ? ((s.present/s.total)*100).toFixed(1) : 0;

        list.innerHTML += `
        <div class="card">
            <b>${s.name}</b><br>
            Attendance: ${percent}%

            <button onclick="mark(${i},true)">Present</button>
            <button onclick="mark(${i},false)">Absent</button>
            <button onclick="del(${i})">Delete</button>
        </div>
        `;
    });
}

function printReport(){
    window.print();
}

display();
