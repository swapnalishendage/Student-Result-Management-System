let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;
displayStudents();

function addStudent() {

    let name = document.getElementById("studentName").value.trim();
    let roll = document.getElementById("rollNo").value.trim();
    let english = Number(document.getElementById("english").value);
    let science = Number(document.getElementById("science").value);
    let maths = Number(document.getElementById("maths").value);

    if (
        name === "" ||
        roll === "" ||
        document.getElementById("english").value === "" ||
        document.getElementById("science").value === "" ||
        document.getElementById("maths").value === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    let total = english + science + maths;

    let percentage = ((total / 300) * 100).toFixed(2);

    let grade = "";

    if (percentage >= 90)
        grade = "A+";
    else if (percentage >= 80)
        grade = "A";
    else if (percentage >= 70)
        grade = "B";
    else if (percentage >= 60)
        grade = "C";
    else if (percentage >= 35)
        grade = "D";
    else
        grade = "F";

    let status =
        (english >= 35 &&
         science >= 35 &&
         maths >= 35)
        ? "Pass"
        : "Fail";

    let student = {

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

    if (editIndex == -1) {

        students.push(student);

    } else {

        students[editIndex] = student;
        editIndex = -1;

    }

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    clearForm();

    displayStudents();

}

function displayStudents() {

    let table = document.getElementById("tableBody");

    table.innerHTML = "";

    students.forEach((student, index) => {

        let gradeClass = "";

        if(student.grade=="A+" || student.grade=="A")
            gradeClass="grade-a";

        else if(student.grade=="B")
            gradeClass="grade-b";

        else if(student.grade=="C")
            gradeClass="grade-c";

        else
            gradeClass="grade-d";

        table.innerHTML += `

<tr class="${student.status=="Fail" ? "fail" : ""}">

<td>${student.name}</td>

<td>${student.roll}</td>

<td>${student.english}</td>

<td>${student.science}</td>

<td>${student.maths}</td>

<td>${student.total}</td>

<td>${student.percentage}%</td>

<td class="${gradeClass}">
${student.grade}
</td>

<td class="${student.status=="Pass"?"pass":"fail-text"}">

${student.status}

</td>

<td>
<button class="btn btn-warning btn-sm"onclick="editStudent(${index})">Edit</button>
</td>

<td>
<button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
</td>

</tr>

`;

    });

}

function editStudent(index){

    let student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("rollNo").value = student.roll;
    document.getElementById("english").value = student.english;
    document.getElementById("science").value = student.science;
    document.getElementById("maths").value = student.maths;

    editIndex = index;

}


function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }

}

document.getElementById("search").addEventListener("keyup",function(){

    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row=>{

        let name = row.cells[0].innerText.toLowerCase();

        if(name.includes(value))
            row.style.display="";

        else
            row.style.display="none";

    });

});

function clearForm(){

    document.getElementById("studentName").value="";
    document.getElementById("rollNo").value="";
    document.getElementById("english").value="";
    document.getElementById("science").value="";
    document.getElementById("maths").value="";

    editIndex=-1;

}