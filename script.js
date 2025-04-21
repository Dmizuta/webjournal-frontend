document.addEventListener("DOMContentLoaded", () => {
    const categories = ["learned", "fuzzy", "challenge", "goal"];
  
    categories.forEach((category) => {
      const addBtn = document.getElementById(`${category}-add-btn`);
      const inputContainer = document.getElementById(`${category}-input-container`);
      const saveBtn = document.getElementById(`${category}-save-btn`);
      const input = document.getElementById(`${category}-input`);
      const recordsList = document.getElementById(`${category}-records`);
  
      if (addBtn && inputContainer && saveBtn && input && recordsList) {
        // Show the textarea
        addBtn.addEventListener("click", () => {
          inputContainer.classList.remove("d-none");
          input.focus();
        });
  
        // Save the record
        saveBtn.addEventListener("click", () => {
          const value = input.value.trim();
          if (value !== "") {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = value;
            recordsList.appendChild(li);
            input.value = "";
            inputContainer.classList.add("d-none");
          }
        });
      }
    });
  });
  