function calculateCGPA() {
  const subjects = [
    {
      name: "Math 3",
      marks: parseInt(document.getElementById("math3").value),
      credits: 4,
    },
    {
      name: "DSF",
      marks: parseInt(document.getElementById("dsf").value),
      credits: 4,
    },
    {
      name: "MML",
      marks: parseInt(document.getElementById("mml").value),
      credits: 4,
    },
    {
      name: "AI",
      marks: parseInt(document.getElementById("ai").value),
      credits: 4,
    },
    {
      name: "LD",
      marks: parseInt(document.getElementById("ld").value),
      credits: 3,
    },
    {
      name: "OS",
      marks: parseInt(document.getElementById("os").value),
      credits: 3,
    },
  ];

  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  subjects.forEach((subject) => {
    calculateGradePoints(subject);
  });

  function calculateGradePoints(sub) {
    if (isNaN(sub.marks)) {
      resultsDiv.innerHTML += `<p>Please enter valid marks for ${sub.name}.</p>`;
      return;
    }

    let details = `<h3>${sub.name}</h3>`;
    sub.leastGradePoint = 0;
    sub.highestGradePoint = 0;

    const semEndMarks = 100;
    for (let i = 0; i <= semEndMarks; i += 10) {
      if (i < semEndMarks * 0.4) {
        continue;
      }
      let total = sub.marks + Math.round(i * 0.4);
      let gradePoint = 0;
      let grade = "F";

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

      if (sub.leastGradePoint === 0 || gradePoint < sub.leastGradePoint) {
        sub.leastGradePoint = gradePoint;
      }
      if (sub.highestGradePoint === 0 || gradePoint > sub.highestGradePoint) {
        sub.highestGradePoint = gradePoint;
      }

      details += `<p>If SEE = ${i}, CE+SEE = ${total}, Grade = ${grade}, Grade Point = ${gradePoint}</p>`;
    }

    details += `<p style="font-weight: bold; text-decoration-line: underline;text-decoration-style: solid;">${sub.name} Least Grade Point: ${sub.leastGradePoint}</p>`;
    details += `<p style="font-weight: bold; text-decoration-line: underline;text-decoration-style: solid;" >${sub.name} Highest Grade Point: ${sub.highestGradePoint}</p>`;
    resultsDiv.innerHTML += details;
  }

  calculateFinalCGPA(subjects, resultsDiv);
}

function calculateFinalCGPA(subjects, resultsDiv) {
  let totalCredits = 0;
  let leastGpxCr = 0;
  let highestGpxCr = 0;

  subjects.forEach((sub) => {
    if (!isNaN(sub.marks)) {
      totalCredits += sub.credits;
      leastGpxCr += sub.leastGradePoint * sub.credits;
      highestGpxCr += sub.highestGradePoint * sub.credits;
    }
  });

  let leastCGPA = leastGpxCr / totalCredits;
  let highestCGPA = highestGpxCr / totalCredits;
  let averageCGPA = (leastCGPA + highestCGPA) / 2;

  resultsDiv.innerHTML += `<h2>Final CGPA</h2>
                             <p>Least CGPA: ${leastCGPA.toFixed(1)}</p>
                             <p>Highest CGPA: ${highestCGPA.toFixed(1)}</p>
                             <p>Average CGPA: ${averageCGPA.toFixed(1)}</p>`;
}

// Ensure to attach this script file at the bottom of your HTML or
// use the defer attribute in the script tag to ensure the DOM is fully loaded.
