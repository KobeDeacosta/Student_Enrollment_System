const apiUrlStudents  = "http://localhost:8080/Student_Enrollment_System/api/students.php";
const apiUrlPrograms  = "http://localhost:8080/Student_Enrollment_System/api/programs.php";
const apiUrlYears     = "http://localhost:8080/Student_Enrollment_System/api/years.php";
const apiUrlSemesters = "http://localhost:8080/Student_Enrollment_System/api/semesters.php";
const apiUrlSubjects  = "http://localhost:8080/Student_Enrollment_System/api/subjects.php";
const apiUrlEnrollments = "http://localhost:8080/Student_Enrollment_System/api/enrollments.php";


// === STUDENTS ===
async function loadStudents() {
  const res = await fetch(apiUrlStudents);
  const students = await res.json();

  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach(st => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${st.studentId}</td>
      <td>${st.studentName}</td>
      <td>${st.programName}</td>
      <td>${st.semName}</td>   <!-- Semester muna -->
      <td>${st.yearName}</td>  <!-- Year sunod -->
      <td>${st.allowance}</td>
      <td>
        <button type="button" onclick="editStudent(${st.studentId}, '${st.studentName}', ${st.programId}, ${st.yearId}, ${st.semId}, ${st.allowance})">Edit</button>
        <button type="button" onclick="deleteStudent(${st.studentId})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function addStudent(event) {
  event.preventDefault();
  const data = {
    studentId: document.getElementById("studentId").value || null,
    studentName: document.getElementById("studentName").value,
    programId: document.getElementById("programId").value,
    yearId: document.getElementById("yearId").value,
    semId: document.getElementById("semesterId").value,
    allowance: document.getElementById("allowance").value,
  };

  document.getElementById("studentId").value = ""; // reset hidden id

  await fetch(apiUrlStudents, {
    method: data.studentId ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  event.target.reset();
  document.getElementById("studentId").value = "";
  loadStudents();
}

async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  const res = await fetch(`${apiUrlStudents}?id=${id}`, { method: "DELETE" });
  const data = await res.json();

  alert(data.message || data.error || "No response from server");
  loadStudents();
}

function editStudent(id, name, programId, yearId, semId, allowance) {
  document.getElementById("studentId").value = id;
  document.getElementById("studentName").value = name;
  document.getElementById("programId").value = programId;
  document.getElementById("yearId").value = yearId;
  document.getElementById("semesterId").value = semId;
  document.getElementById("allowance").value = allowance;
}

// === PROGRAMS ===
async function loadPrograms() {
  const res = await fetch(apiUrlPrograms);
  const programs = await res.json();

  // Populate dropdown (student form)
  const select = document.getElementById("programId");
  if (select) {
    select.innerHTML = "<option value=''>Select Program</option>";
    programs.forEach(p => {
      let opt = document.createElement("option");
      opt.value = p.programId;
      opt.textContent = p.programName;
      select.appendChild(opt);
    });
  }

  // Populate Programs Table
  const tbody = document.querySelector("#programsTable tbody");
  if (tbody) {
    tbody.innerHTML = "";
    programs.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.programId}</td>
        <td>${p.programName}</td>
        <td>
          <button type="button" onclick="editProgram(${p.programId}, '${p.programName}')">Edit</button>
          <button type="button" onclick="deleteProgram(${p.programId})">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// === PROGRAM ACTIONS ===
document.getElementById("programForm").onsubmit = async function (e) {
  e.preventDefault();
  const data = {
    programId: document.getElementById("editProgramId").value || null,
    programName: document.getElementById("programName").value
  };

  await fetch(apiUrlPrograms, {
    method: data.programId ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  e.target.reset();
  document.getElementById("editProgramId").value = "";
  loadPrograms();
};

function editProgram(id, name) {
  document.getElementById("editProgramId").value = id;
  document.getElementById("programName").value = name;
}

async function deleteProgram(id) {
  if (!confirm("Are you sure you want to delete this program?")) return;

  const res = await fetch(`${apiUrlPrograms}?id=${id}`, { method: "DELETE" });
  const data = await res.json();
  alert(data.message || data.error || "No response from server");
  loadPrograms();
}

// === YEARS ===
// === YEARS ===
async function loadYears() {
  const res = await fetch(apiUrlYears);
  const years = await res.json();

  // Populate dropdown (student form)
  const select = document.getElementById("yearId");
  if (select) {
    select.innerHTML = "<option value=''>Select Year</option>";
    years.forEach(y => {
      let opt = document.createElement("option");
      opt.value = y.yearId;
      opt.textContent = y.yearName;
      select.appendChild(opt);
    });
  }

  // Populate Years Table
  const tbody = document.querySelector("#yearsTable tbody");
  if (tbody) {
    tbody.innerHTML = "";
    years.forEach(y => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${y.yearId}</td>
        <td>${y.yearName}</td>
        <td>
          <button type="button" onclick="editYear(${y.yearId}, '${y.yearName}')">Edit</button>
          <button type="button" onclick="deleteYear(${y.yearId})">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// === YEAR ACTIONS ===
document.getElementById("yearForm").onsubmit = async function (e) {
  e.preventDefault();
  const data = {
    yearId: document.getElementById("editYearId").value || null,
    yearName: document.getElementById("yearName").value
  };

  await fetch(apiUrlYears, {
    method: data.yearId ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  e.target.reset();
  document.getElementById("editYearId").value = "";
  loadYears();
};

function editYear(id, name) {
  document.getElementById("editYearId").value = id;
  document.getElementById("yearName").value = name;
}

async function deleteYear(id) {
  if (!confirm("Are you sure you want to delete this year?")) return;

  const res = await fetch(`${apiUrlYears}?id=${id}`, { method: "DELETE" });
  const data = await res.json();
  alert(data.message || data.error || "No response from server");
  loadYears();
}

// === SEMESTERS ===
async function loadSemesters() {
  const res = await fetch(apiUrlSemesters);
  const sems = await res.json();
  const tbody = document.getElementById("semestersTable");
  tbody.innerHTML = "";

  sems.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.semId}</td>
      <td>${s.semName}</td>
      <td>
        <button onclick="editSemester(${s.semId}, '${s.semName}')">Edit</button>
        <button onclick="deleteSemester(${s.semId})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// === ADD / UPDATE SEMESTER ===
document.getElementById("semForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const semName = document.getElementById("semName").value.trim();
  const editId = document.getElementById("semForm").dataset.editId;

  if (!semName) return alert("Please enter a semester name");

  let method = editId ? "PUT" : "POST";
  let body = editId
    ? { semId: editId, semName: semName }
    : { semName: semName };

  await fetch(apiUrlSemesters, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  document.getElementById("semForm").reset();
  delete document.getElementById("semForm").dataset.editId;
  loadSemesters();
});

// === EDIT SEMESTER ===
function editSemester(id, name) {
  document.getElementById("semName").value = name;
  document.getElementById("semForm").dataset.editId = id;
}

// === DELETE SEMESTER ===
async function deleteSemester(id) {
  if (!confirm("Are you sure you want to delete this semester?")) return;

  await fetch(apiUrlSemesters, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ semId: id })
  });

  loadSemesters();
}

// === SUBJECTS (for enrollment) ===
async function loadSubjects() {
  const res = await fetch(apiUrlSubjects);
  const subjects = await res.json();
  const tbody = document.getElementById("subjectsTable");
  tbody.innerHTML = "";

  subjects.forEach(sub => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sub.subjId}</td>
      <td>${sub.subjName}</td>
      <td>${sub.subjUnits}</td>
      <td>${sub.room}</td>
      <td>${sub.startTime} - ${sub.endTime}</td>
      <td>${sub.day}</td>
      <td>
        <button onclick="editSubject(${sub.subjId}, '${sub.subjName}', ${sub.subjUnits}, '${sub.room}', '${sub.startTime}', '${sub.endTime}', '${sub.day}')">Edit</button>
        <button onclick="deleteSubject(${sub.subjId})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Also populate dropdown for enrollment
  const select = document.getElementById("enrollSubjId");
  if (select) {
    select.innerHTML = "<option value=''>Select Subject</option>";
    subjects.forEach(sub => {
      let opt = document.createElement("option");
      opt.value = sub.subjId;
      opt.textContent = sub.subjName;
      select.appendChild(opt);
    });
  }
}

// === ADD / UPDATE SUBJECT ===
document.getElementById("subjForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const subjName = document.getElementById("subjName").value.trim();
  const subjUnits = document.getElementById("subjUnits").value;
  const subjRoom = document.getElementById("subjRoom").value.trim();
  const subjStartTime = document.getElementById("subjStartTime").value;
  const subjEndTime = document.getElementById("subjEndTime").value;
  const subjDay = document.getElementById("subjDay").value;
  const editId = document.getElementById("subjForm").dataset.editId;

  if (!subjName || !subjUnits || !subjRoom || !subjStartTime || !subjEndTime || !subjDay)
    return alert("Please fill out all fields");

  const method = editId ? "PUT" : "POST";
  const body = editId
    ? { subjId: editId, subjName, subjUnits, room: subjRoom, startTime: subjStartTime, endTime: subjEndTime, day: subjDay }
    : { subjName, subjUnits, room: subjRoom, startTime: subjStartTime, endTime: subjEndTime, day: subjDay };

  await fetch(apiUrlSubjects, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  document.getElementById("subjForm").reset();
  delete document.getElementById("subjForm").dataset.editId;
  loadSubjects();
});

// === EDIT SUBJECT ===
function editSubject(id, name, units, room, start, end, day) {
  document.getElementById("subjName").value = name;
  document.getElementById("subjUnits").value = units;
  document.getElementById("subjRoom").value = room;
  document.getElementById("subjStartTime").value = convertTo24Hour(start);
  document.getElementById("subjEndTime").value = convertTo24Hour(end);
  document.getElementById("subjDay").value = day;
  document.getElementById("subjForm").dataset.editId = id;
}

// === DELETE SUBJECT ===
async function deleteSubject(id) {
  if (!confirm("Are you sure you want to delete this subject?")) return;

  await fetch(apiUrlSubjects, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subjId: id })
  });

  loadSubjects();
}

// === Convert 12-hour time (from DB) to 24-hour for <input type="time"> ===
function convertTo24Hour(time) {
  if (!time) return "";
  let [t, period] = time.split(" ");
  let [h, m] = t.split(":").map(Number);
  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// Load subjects on page start
loadSubjects();

// === ENROLL STUDENT ===
async function enrollStudent() {
  const studentId = document.getElementById("enrollStudId").value;
  const subjectId = document.getElementById("enrollSubjId").value;

  if (!studentId || !subjectId) {
    alert("Please select both student and subject before enrolling.");
    return;
  }

  try {
    const res = await fetch(apiUrlEnrollment, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, subj_id: subjectId })
    });

    const data = await res.json();
    if (data.success) {
      alert("Enrollment successful!");
      loadEnrollments();
    } else {
      alert("Enrollment failed: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Error enrolling student:", err);
  }
}

// === LOAD ENROLLMENTS ===
async function loadEnrollments() {
  try {
    const res = await fetch(apiUrlEnrollment);
    const enrollments = await res.json();

    const tableBody = document.querySelector("#enrollmentTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    enrollments.forEach(enroll => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${enroll.enroll_id}</td>
        <td>${enroll.student_name}</td>
        <td>${enroll.subj_name}</td>
        <td>${enroll.units}</td>
        <td>${enroll.room}</td>
        <td>${enroll.schedule}</td>
        <td>${enroll.day}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteEnrollment(${enroll.enroll_id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error loading enrollments:", err);
  }
}

// === DELETE ENROLLMENT ===
async function deleteEnrollment(id) {
  if (!confirm("Are you sure you want to delete this enrollment?")) return;

  try {
    const res = await fetch(`${apiUrlEnrollment}?id=${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      alert("Enrollment deleted successfully!");
      loadEnrollments();
    } else {
      alert("Failed to delete enrollment.");
    }
  } catch (err) {
    console.error("Error deleting enrollment:", err);
  }
}

// === INIT ===
document.getElementById("studentForm").onsubmit = addStudent;
loadStudents();
loadPrograms();
loadYears();
loadSemesters();
loadSubjects();
loadEnrollStudents();
loadEnrollments();