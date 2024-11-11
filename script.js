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

// filtering logic in projects
document.addEventListener('DOMContentLoaded', function () {
    const filterIcon = document.querySelector('.filter-icon');
    const categoryBox = document.querySelector('.category-box');
    const categories = document.querySelectorAll('.category');
    const projects = document.querySelectorAll('.project');
    const removeFilterBtn = document.getElementById('remove-filter-btn');

    // Show category box when the filter icon is clicked
    filterIcon.addEventListener('click', function () {
        categoryBox.style.display = categoryBox.style.display === 'block' ? 'none' : 'block';
        categoryBox.classList.toggle('floating');
    });

    // Handle category click (pinning and filtering)
    categories.forEach(category => {
        category.addEventListener('click', function () {
            // Pin/unpin the clicked category
            category.classList.toggle('pinned');
            
            // Get the category data
            const selectedCategory = category.dataset.category;
            
            // Filter the projects based on pinned categories
            filterProjects();
        });
    });

    // Remove filter button - Show all projects
    removeFilterBtn.addEventListener('click', function () {
        // Unpin all categories
        categories.forEach(category => category.classList.remove('pinned'));

        // Show all projects
        projects.forEach(project => {
            project.classList.remove('hidden');
        });

        // Close the category box
        categoryBox.style.display = 'none';
    });


    function filterProjects() {
        // Hide all projects initially
        projects.forEach(project => {
            project.classList.add('hidden');
        });

        // Get all pinned categories
        const pinnedCategories = Array.from(categories)
            .filter(category => category.classList.contains('pinned'))
            .map(category => category.dataset.category);

        // Show projects that match the pinned categories
        if (pinnedCategories.length === 0) {
            // If no categories are pinned, show all projects
            projects.forEach(project => {
                project.classList.remove('hidden');
            });
        } else {
            projects.forEach(project => {
                if (pinnedCategories.some(category => project.classList.contains(category))) {
                    project.classList.remove('hidden');
                }
            });
        }
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

        // Send the email using EmailJS
        emailjs.send('service_h6mjf05', 'template_ot4vzsy', templateParams)
            .then(function(response) {
                // If successful, show a success message
                alert('Message sent successfully!');
                form.reset(); // Reset the form fields after successful submission
            }, function(error) {
                // If there’s an error, show an error message
                alert('Oops! Something went wrong. Please try again later.');
            });

            
    });

    
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




