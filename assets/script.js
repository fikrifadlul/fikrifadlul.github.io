// Animasi untuk skill progress bars
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const level = bar.parentElement.getAttribute('data-level');
                    bar.style.width = `${level}%`;
                });
            }
        });
    });

    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });

    // Project filter functionality
    function initProjectFilters() {
        const filterButtons = document.querySelectorAll('.project-filter-btn');
        const projects = document.querySelectorAll('.project-card');

        // Show all projects initially with animation
        projects.forEach(project => {
            project.classList.add('show');
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projects.forEach(project => {
                    project.classList.remove('show');
                    const projectTags = project.getAttribute('data-tags').split(' ');
                    
                    if (filterValue === 'all' || projectTags.includes(filterValue)) {
                        setTimeout(() => {
                            project.classList.add('show');
                        }, 300);
                    }
                });
            });
        });
    }

    // Skill tags "more" functionality
    function initSkillTags() {
        const tagContainers = document.querySelectorAll('.project-tags');
        
        tagContainers.forEach(container => {
            const tags = Array.from(container.querySelectorAll('span'));
            const initialTags = tags.slice(0, 3);
            const extraTags = tags.slice(3);
            
            if (extraTags.length > 0) {
                // Create tags wrapper
                const tagsWrapper = document.createElement('div');
                tagsWrapper.className = 'tags-wrapper';
                
                // Move all tags to wrapper
                tags.forEach(tag => {
                    container.removeChild(tag);
                    tagsWrapper.appendChild(tag);
                });
                
                // Show initial tags
                initialTags.forEach(tag => tag.style.display = 'inline-flex');
                // Hide extra tags
                extraTags.forEach(tag => tag.style.display = 'none');
                
                // Create more button
                const moreButton = document.createElement('button');
                moreButton.className = 'more-tags-btn';
                moreButton.textContent = `+${extraTags.length} more`;
                
                // Add wrapper and button to container
                container.appendChild(tagsWrapper);
                container.appendChild(moreButton);
                
                let isExpanded = false;
                
                moreButton.addEventListener('click', () => {
                    isExpanded = !isExpanded;
                    
                    extraTags.forEach(tag => {
                        tag.style.display = isExpanded ? 'inline-flex' : 'none';
                        if (isExpanded) {
                            setTimeout(() => {
                                tag.style.opacity = '1';
                                tag.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            tag.style.opacity = '0';
                            tag.style.transform = 'translateY(10px)';
                        }
                    });
                    
                    moreButton.textContent = isExpanded ? 'Show less' : `+${extraTags.length} more`;
                    container.classList.toggle('expanded');
                    moreButton.classList.toggle('expanded');
                });
            }
        });
    }

    // Project slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.project-slide');
    const totalSlides = slides.length;

    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].style.display = 'block';
    }

    document.querySelector('.prev')?.addEventListener('click', () => showSlide(currentSlide - 1));
    document.querySelector('.next')?.addEventListener('click', () => showSlide(currentSlide + 1));

    // Show first slide initially
    if (totalSlides > 0) showSlide(0);

    // Initialize theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // Lazy loading for project images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Initialize all functionalities when DOM is loaded
    initProjectFilters();
    initSkillTags();
});

// Theme functionality
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
}

// Typing animation for hero section
const roles = ['Web Developer', 'UI/UX Designer', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const waitTime = 2000;

function typeRole() {
    const role = roles[roleIndex];
    const typeElement = document.querySelector('.typing-text');
    
    if (!typeElement) return;

    if (isDeleting) {
        typeElement.textContent = role.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeElement.textContent = role.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === role.length) {
        isDeleting = true;
        setTimeout(typeRole, waitTime);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
}

typeRole();
