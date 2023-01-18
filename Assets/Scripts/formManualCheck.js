
// checkboxes
const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
checkboxes.forEach(e => {
    e.addEventListener("click", (eve) => {
        e.value = e.checked;
    });
})