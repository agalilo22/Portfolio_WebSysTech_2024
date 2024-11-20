document.addEventListener('DOMContentLoaded', function() {
    // Attach click event listeners to all service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', function() {
            item.classList.toggle('pinned'); // Toggle the 'pinned' class on click
        });
    });
});


// Scroll behavior for back-to-top button
window.onscroll = function() {
    const backToTop = document.querySelector('.back-to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};
document.addEventListener('DOMContentLoaded', function () {
    const filterIcon = document.querySelector('.filter-label');
    const categoryBox = document.querySelector('.category-box');
    const categories = document.querySelectorAll('.category');
    const projects = document.querySelectorAll('.project');
    const removeFilterBtn = document.getElementById('remove-filter-btn');
    const dateFilter = document.getElementById('date-filter');

    // Show category box when the filter icon is clicked
    filterIcon.addEventListener('click', function () {
        categoryBox.style.display = categoryBox.style.display === 'block' ? 'none' : 'block';
        categoryBox.classList.toggle('floating');
    });

    // Handle category click (pinning and filtering)
    categories.forEach(category => {
        category.addEventListener('click', function () {
            category.classList.toggle('pinned'); // Pin/unpin the clicked category
            filterProjects(); // Apply filtering logic
        });
    });

    // Handle date filter change
    dateFilter.addEventListener('change', function () {
        filterProjects(); // Apply filtering logic
    });

    // Remove filter button - Show all projects
    removeFilterBtn.addEventListener('click', function () {
        categories.forEach(category => category.classList.remove('pinned')); // Unpin all categories
        dateFilter.value = "all"; // Reset date filter
        projects.forEach(project => project.classList.remove('hidden')); // Show all projects
        categoryBox.style.display = 'none'; // Close the category box
    });

    // Filtering logic
    function filterProjects() {
        const pinnedCategories = Array.from(categories)
            .filter(category => category.classList.contains('pinned'))
            .map(category => category.dataset.category);

        const selectedDate = dateFilter.value;

        projects.forEach(project => {
            const projectCategory = Array.from(project.classList).find(cls => cls !== 'project');
            const projectDate = project.dataset.date;

            const matchesCategory = pinnedCategories.length === 0 || pinnedCategories.includes(projectCategory);
            const matchesDate = selectedDate === "all" || projectDate === selectedDate;

            // Show project if it matches both filters
            if (matchesCategory && matchesDate) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    }
});



// JavaScript to add shadow when scrolling past the navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#nav');
    if (window.scrollY > navbar.offsetHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// EMAIL JS API LOGIC

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID (you get this from the EmailJS dashboard)
    emailjs.init("T-BFUCkhC3J3deY6_");  // Replace with your actual EmailJS user ID

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the default way

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create the templateParams object to pass to EmailJS
        const templateParams = {
            name: name,
            email: email,
            message: message
        };
        
        // Notification to the sender
        emailjs.send('service_h6mjf05', 'template_7yo7jmw' , templateParams)

        // Send the email using EmailJS
        emailjs.send('service_h6mjf05', 'template_ot4vzsy' , templateParams)
            .then(function(response) {
                // If successful, show a success message
                alert('Message sent successfully!');
                form.reset(); // Reset the form fields after successful submission
            }, function(error) {
                // If there’s an error, show an error message
                alert('Oops! Something went wrong. Please try again later.');
            });

            
    });

    // template_ot4vzsy

    
});

// Function to handle the sticky and scramble effect on the title
function updateTitle() {
    const title = document.querySelector('#top h1');

    // Check if original text is stored; if not, store it
    if (!title.dataset.original) {
        title.dataset.original = title.innerText;
    }

    const titleText = title.dataset.original;
    const titleArray = titleText.split(''); // Split title text into an array of characters

    const scrollPosition = window.scrollY;
    const maxScramble = 100;
    const scrollPercentage = Math.min((scrollPosition / window.innerHeight) * maxScramble, maxScramble);

    // Parallax effect: adjust the position based on scroll (smaller ratio to slow it down)
    title.style.transform = `translateY(${scrollPosition * 0.5}px)`;

    // Scramble the title based on scroll percentage
    const scrambledTitle = titleArray.map((char) => {
        if (Math.random() * 100 < scrollPercentage) {
            return getRandomLetter();
        }
        return char;
    }).join('');

    title.innerText = scrambledTitle;

    // Reset to original text when at the top
    if (scrollPosition === 0) {
        title.innerText = titleText;
        title.style.transform = 'translateY(0)'; // Reset the position to default
    }
}

// Helper function to generate a random letter
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

// Attach the scroll event listener
window.addEventListener('scroll', updateTitle);




