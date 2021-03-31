// Pop-Up Modal after page loads if option was not selected before
if (sessionStorage.getItem("orderOption") === null) {
    showModal();
}
else{
    closeModal();
}

// Function to show Modal
function showModal() {
    // Code block taken from: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
    $("#myModal").modal('show');
}

// Modal closes when 'X' is clicked by using DOM Level two event listener
document.querySelector(".close").addEventListener("click", closeModal);

// Function to closeModal
function closeModal() {
    document.querySelector(".bg-modal").style.visibility = "hidden";
    document.body.style.overflow = "auto";
}

// Store option into sessionStorage using HTML event handler attributes
function storeOption(val) {
    // Declare variable to store option
    let x = val;
    closeModal();
    sessionStorage.setItem("orderOption", x)
}

// Trigger randomSlide function when page loads
randomSlide();

// Random slide function
function randomSlide() {
    // Get random number
    let rand =  Math.floor((Math.random() * 3));
    // Set randomSlide and carousel indicators according to the random number and add active class
    document.querySelectorAll(".carousel-item")[rand].classList.add("active");
    document.querySelectorAll(".carousel-indicators li")[rand].setAttribute("class", "active");

}
