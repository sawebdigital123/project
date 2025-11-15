document.addEventListener('DOMContentLoaded', function() {
    // Project data - you can add more projects here
    const projects = {
        'project1': {
            title: 'Metal Industry',
            description: 'A modern and responsive website design built with the latest web technologies. This project showcases clean UI/UX principles and responsive design techniques to ensure optimal viewing on all devices.',
            image: 'assets/img/Project/Project - 01.png',
            details: {
                'Client': 'Fine Metal',
                'Category': 'Web Design',
                'Date': 'September 2025',
                'Technologies': 'HTML, CSS, JavaScript, Bootstrap'
            },
            liveUrl: '#',
            codeUrl: '#'
        },
        'project2': {
            title: 'Inventory Management System',
            description: 'A full-stack web application with modern features and clean code architecture. This project demonstrates proficiency in both front-end and back-end development.',
            image: 'assets/img/Project/Project - 02.png',
            details: {
                'Client': 'Fine Metal',
                'Category': 'Web Development',
                'Date': 'August 2025',
                'Technologies': 'HTML, CSS, JavaScript, Bootstrap, laravel, MySQL'
            },
            liveUrl: '#',
            codeUrl: '#'
        }
    };

    // Initialize modal
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    
    // Function to open project modal
    function openProjectModal(projectId) {
        const project = projects[projectId];
        if (!project) return;

        // Set project details in modal
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectDescription').textContent = project.description;
        document.getElementById('modalProjectImage').src = project.image;
        document.getElementById('modalProjectImage').alt = project.title;
        
        // Set project details list
        const detailsList = document.getElementById('projectDetailsList');
        detailsList.innerHTML = ''; // Clear previous details
        
        for (const [key, value] of Object.entries(project.details)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> <span>${value}</span>`;
            detailsList.appendChild(li);
        }
        
        // Set project links
        document.getElementById('projectLiveLink').href = project.liveUrl;
        document.getElementById('projectCodeLink').href = project.codeUrl;
        
        // Show the modal
        projectModal.show();
    }

    // Add click event listeners to project items
    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const projectId = `project${index + 1}`;
            openProjectModal(projectId);
        });
    });

    // Also make the view buttons work
    document.querySelectorAll('.rounded-btn.modal-popup').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the parent click event
            const projectId = `project${index + 1}`;
            openProjectModal(projectId);
        });
    });
});
