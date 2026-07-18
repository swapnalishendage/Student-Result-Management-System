let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

displayStudents();

function addStudent(){

let name=document.getElementById("studentName").value.trim();

let roll=document.getElementById("rollNo").value.trim();

let english=Number(document.getElementById("english").value);

let science=Number(document.getElementById("science").value);

let maths=Number(document.getElementById("maths").value);

if(name=="" || roll=="" || english=="" || science=="" || maths==""){

alert("Please fill all fields");

return;

}

let total=english+science+maths;

let percentage=((total/300)*100).toFixed(2);

let grade="";

if(percentage>=90)
grade="A+";
else if(percentage>=80)
grade="A";
else if(percentage>=70)
grade="B";
else if(percentage>=60)
grade="C";
else if(percentage>=50)
grade="D";
else
grade="F";

let status=(english>=35 && science>=35 && maths>=35)?"Pass":"Fail";

let student={

name,
roll,
english,
science,
maths,
total,
percentage,
grade,
status

};

if(editIndex==-1){

students.push(student);

}
else{

students[editIndex]=student;

editIndex=-1;

}

localStorage.setItem("students",JSON.stringify(students));

clearForm();

displayStudents();

}

function displayStudents(){

let table=document.getElementById("tableBody");

table.innerHTML="";

students.forEach(function(student,index){

table.innerHTML+=`

<tr class="${student.status=="Fail"?"fail":""}">

<td>${student.name}</td>

<td>${student.roll}</td>

<td>${student.english}</td>

<td>${student.science}</td>

<td>${student.maths}</td>

<td>${student.total}</td>

<td>${student.percentage}%</td>

<td>${student.grade}</td>

<td>${student.status}</td>

<td>

<button onclick="editStudent(${index})">

Edit

</button>

</td>

<td>

<button onclick="deleteStudent(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function editStudent(index){

let student=students[index];

document.getElementById("studentName").value=student.name;

document.getElementById("rollNo").value=student.roll;

document.getElementById("english").value=student.english;

document.getElementById("science").value=student.science;

document.getElementById("maths").value=student.maths;

editIndex=index;

}

function deleteStudent(index){

if(confirm("Delete this record?")){

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

displayStudents();

}

}

function clearForm(){

document.getElementById("studentName").value="";

document.getElementById("rollNo").value="";

document.getElementById("english").value="";

document.getElementById("science").value="";

document.getElementById("maths").value="";

}