const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "CSE 121b", name: "JavaScript Language", credits: 3, completed: false },
    // add other courses here
  ];
  
  function renderCourses(filteredCourses) {
    const container = document.getElementById("courses");
    container.innerHTML = "";
    let totalCredits = 0;
  
    filteredCourses.forEach(course => {
      const card = document.createElement("div");
      card.className = course.completed ? "course completed" : "course";
      card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} credits</p>`;
      container.appendChild(card);
      totalCredits += course.credits;
    });
  
    document.getElementById("totalCredits").textContent = totalCredits;
  }
  
  document.getElementById("allBtn").addEventListener("click", () => renderCourses(courses));
  document.getElementById("wddBtn").addEventListener("click", () =>
    renderCourses(courses.filter(c => c.code.startsWith("WDD")))
  );
  document.getElementById("cseBtn").addEventListener("click", () =>
    renderCourses(courses.filter(c => c.code.startsWith("CSE")))
  );
  
  renderCourses(courses); 
  