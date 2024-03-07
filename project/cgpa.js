function calculateCGPA() {
  const subjects = [
    {
      marks: parseInt(document.getElementById("math3").value || "0"),
      credits: 4,
      name: "math 3",
    },
    {
      marks: parseInt(document.getElementById("dsf").value || "0"),
      credits: 3,
      name: "dsf",
    },
    {
      marks: parseInt(document.getElementById("mml").value || "0"),
      credits: 4,
      name: "mml",
    },
    {
      marks: parseInt(document.getElementById("ai").value || "0"),
      credits: 3,
      name: "ai",
    },
    {
      marks: parseInt(document.getElementById("ld").value || "0"),
      credits: 3,
      name: "ld",
    },
    {
      marks: parseInt(document.getElementById("os").value || "0"),
      credits: 3,
      name: "os",
    },
  ];

  subjects.forEach((sub) => calculateGradePoints(sub));

  displayResults(subjects);
}

function calculateGradePoints(sub) {
  let leastGradePoint = 10;
  let highestGradePoint = 0;
  const semEndMaxMarks = 100;
  let details = "";

  for (let i = 0; i <= semEndMaxMarks; i += 10) {
    if (i < semEndMaxMarks * 0.4) {
      // Fail condition, skip
      continue;
    }
    const total = sub.marks + Math.round(i * 0.4);
    let gradePoint = 0;
    let grade = "Z";
    if (total >= 40 && total <= 44) {
      gradePoint = 4;
      grade = "P";
    } else if (total > 44 && total < 50) {
      gradePoint = 5;
      grade = "C";
    } else if (total >= 50 && total < 55) {
      gradePoint = 6;
      grade = "B";
    } else if (total >= 55 && total <= 60) {
      gradePoint = 7;
      grade = "B+";
    } else if (total > 60 && total <= 74) {
      gradePoint = 8;
      grade = "A";
    } else if (total > 74 && total <= 90) {
      gradePoint = 9;
      grade = "A+";
    } else if (total > 90) {
      gradePoint = 10;
      grade = "O";
    }

    details += `if SEE = ${i}, CE+SEE = ${total}, Grade - ${grade}, Grade Point - ${gradePoint}<br/>`;

    if (leastGradePoint > gradePoint) {
      leastGradePoint = gradePoint;
    }
    if (highestGradePoint < gradePoint) {
      highestGradePoint = gradePoint;
    }
  }

  // Append the detailed calculations to the webpage
  document.getElementById("results").innerHTML += `
        <h3>${sub.name}</h3>
        <p>${details}</p>
        <p>----------------------------------------------------------------</p>
        <p>${sub.name} least Grade Point - ${leastGradePoint}</p>
        <p>${sub.name} highest Grade Point - ${highestGradePoint}</p>
        <p>----------------------------------------------------------------</p>
    `;

  // Assigning calculated grade points to the subject
  sub.leastGradePoint = leastGradePoint;
  sub.highestGradePoint = highestGradePoint;
}

function displayResults(subjects) {
  let totalCredits = 0,
    leastGpxCr = 0,
    highestGpxCr = 0;
  subjects.forEach((sub) => {
    totalCredits += sub.credits;
    leastGpxCr += sub.leastGradePoint * sub.credits;
    highestGpxCr += sub.highestGradePoint * sub.credits;
  });

  const leastCGPA = leastGpxCr / totalCredits;
  const highestCGPA = highestGpxCr / totalCredits;
  const averageCGPA = (leastCGPA + highestCGPA) / 2;

  document.getElementById("results").innerHTML = `
        <p>Least CGPA: ${leastCGPA.toFixed(1)}</p>
        <p>Average CGPA: ${averageCGPA.toFixed(1)}</p>
        <p>Highest CGPA: ${highestCGPA.toFixed(1)}</p>
    `;
}

// Note: For simplicity, the full grade point calculation logic isn't implemented here.
// You'd need to translate the grade calculation logic from the Python script into JavaScript.
