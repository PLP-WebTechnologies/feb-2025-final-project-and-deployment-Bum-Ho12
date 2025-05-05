// This function makes all blog post cards clickable and navigates to blog-details.html
function setupBlogCardNavigation() {
    // Target all blog post cards on any page (home, blog listing, etc.)
    const allPostCards = document.querySelectorAll('.post-card');

    allPostCards.forEach(card => {
        // Make the entire card clickable
        card.style.cursor = 'pointer';

        // Add click event to the card
        card.addEventListener('click', function(event) {
            // Don't trigger navigation if clicking on the Read More link (it has its own href)
            if (!event.target.classList.contains('read-more') &&
                !event.target.closest('.read-more')) {

                // Get post title and create a slug
                const title = card.querySelector('h3').textContent;
                const slug = createSlug(title);

                // Navigate to blog details page with the post slug as parameter
                window.location.href = `blog-details.html?post=${slug}`;
            }
        });

        // Update the "Read More" link to point to the blog details page
        const readMoreLink = card.querySelector('.read-more');
        if (readMoreLink) {
            const title = card.querySelector('h3').textContent;
            const slug = createSlug(title);
            readMoreLink.href = `blog-details.html?post=${slug}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    setupMobileMenu();

    // Newsletter subscription form
    setupNewsletterForm();

    // Contact form handling
    setupContactForm();

    // FAQ toggles
    setupFaqToggles();

    // Blog posts generation
    if (document.getElementById('blog-posts')) {
        generateBlogPosts();
        setupBlogFilters();
    }

    // Make featured post cards on home page clickable
    setupFeaturedPostsNavigation();
    // Make all blog post cards clickable
    setupBlogCardNavigation();
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = menuIcon.contains(event.target) || navLinks.contains(event.target);
            if (!isClickInsideMenu && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Newsletter Form Handling
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const subscriptionMessage = document.getElementById('subscription-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                // In a real application, this would be an API call
                // For now, we'll simulate a successful subscription
                subscriptionMessage.textContent = 'Thank you for subscribing!';
                subscriptionMessage.style.color = 'var(--success-color)';
                subscriptionMessage.style.display = 'block';

                // Reset the form
                newsletterForm.reset();

                // Hide the success message after 3 seconds
                setTimeout(function() {
                    subscriptionMessage.style.display = 'none';
                }, 3000);
            } else {
                subscriptionMessage.textContent = 'Please enter a valid email address.';
                subscriptionMessage.style.color = 'var(--accent-color)';
                subscriptionMessage.style.display = 'block';
            }
        });
    }
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && validateEmail(email) && subject && message) {
                // In a real application, this would be an API call
                // For now, we'll simulate a successful form submission
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.style.color = 'var(--success-color)';
                formStatus.style.display = 'block';

                // Reset the form
                contactForm.reset();

                // Hide the success message after 3 seconds
                setTimeout(function() {
                    formStatus.style.display = 'none';
                }, 3000);
            } else {
                formStatus.textContent = 'Please fill out all fields correctly.';
                formStatus.style.color = 'var(--accent-color)';
                formStatus.style.display = 'block';
            }
        });
    }
}

// FAQ Toggle Functionality
function setupFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const icon = otherItem.querySelector('.toggle-icon i');
                        if (icon) {
                            icon.className = 'fas fa-plus';
                        }
                    }
                });

                // Toggle the current FAQ
                item.classList.toggle('active');

                // Update the icon
                const icon = item.querySelector('.toggle-icon i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.className = 'fas fa-minus';
                    } else {
                        icon.className = 'fas fa-plus';
                    }
                }
            });
        }
    });
}

// Make the featured post cards on home page clickable
function setupFeaturedPostsNavigation() {
    const featuredPosts = document.querySelectorAll('.featured-posts .post-card');
    
    featuredPosts.forEach(post => {
        // Make the entire card clickable
        post.style.cursor = 'pointer';
        post.addEventListener('click', function(event) {
            // Prevent triggering if clicking on the Read More button (it has its own link)
            if (!event.target.classList.contains('read-more')) {
                // Get post title and create a URL-friendly slug
                const title = post.querySelector('h3').textContent;
                const slug = createSlug(title);
                
                // Navigate to the blog details page with the post slug as a parameter
                window.location.href = `blog-details.html?post=${slug}`;
            }
        });
        
        // Update the "Read More" link to point to the blog details page
        const readMoreLink = post.querySelector('.read-more');
        if (readMoreLink) {
            const title = post.querySelector('h3').textContent;
            const slug = createSlug(title);
            readMoreLink.href = `blog-details.html?post=${slug}`;
        }
    });
}

// Blog Posts Generation
function generateBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    const postTemplate = document.getElementById('post-template');

    if (blogPostsContainer && postTemplate) {
        // Sample blog post data
        const blogPosts = [
            {
                image: 'images/image-5.jpg',
                imageAlt: 'JavaScript Development',
                category: 'Web Development',
                categorySlug: 'web-development',
                title: '10 JavaScript Tips Every Developer Should Know',
                excerpt: 'Improve your JavaScript skills with these essential tips that will make your code more efficient and maintainable.',
                date: 'May 3, 2025',
                author: 'Jane Smith',
                slug: '10-javascript-tips'
            },
            {
                image: 'images/image-7.jpg',
                imageAlt: 'Machine Learning',
                category: 'Artificial Intelligence',
                categorySlug: 'artificial-intelligence',
                title: 'Introduction to Machine Learning: A Beginner\'s Guide',
                excerpt: 'Learn the basics of machine learning and how it can be applied to solve real-world problems.',
                date: 'May 2, 2025',
                author: 'Robert Chen',
                slug: 'intro-to-machine-learning'
            },
            {
                image: 'images/image-8.jpg',
                imageAlt: 'Network Security',
                category: 'Cybersecurity',
                categorySlug: 'cybersecurity',
                title: 'Protecting Your Network from Common Security Threats',
                excerpt: 'Discover the most effective strategies for safeguarding your network against modern security threats.',
                date: 'April 29, 2025',
                author: 'Michael Johnson',
                slug: 'network-security-threats'
            },
            {
                image: 'images/image-2.jpg',
                imageAlt: 'Data Visualization',
                category: 'Data Science',
                categorySlug: 'data-science',
                title: 'Data Visualization Techniques for Better Insights',
                excerpt: 'Explore powerful data visualization methods that can help you extract meaningful insights from complex datasets.',
                date: 'April 27, 2025',
                author: 'Sarah Williams',
                slug: 'data-visualization-techniques'
            },
            {
                image: 'images/image-3.jpg',
                imageAlt: 'CSS Grid',
                category: 'Web Development',
                categorySlug: 'web-development',
                title: 'Mastering CSS Grid Layout for Modern Websites',
                excerpt: 'A comprehensive guide to using CSS Grid to create complex and responsive website layouts.',
                date: 'April 25, 2025',
                author: 'Jane Smith',
                slug: 'mastering-css-grid'
            },
            {
                image: 'images/image-4.jpg',
                imageAlt: 'Cloud Computing',
                category: 'Web Development',
                categorySlug: 'web-development',
                title: 'The Rise of Cloud Computing: Benefits and Challenges',
                excerpt: 'An overview of how cloud computing is transforming businesses and the challenges that come with adoption.',
                date: 'April 23, 2025',
                author: 'David Lee',
                slug: 'cloud-computing-benefits'
            }
        ];

        // Generate blog posts
        renderBlogPosts(blogPosts, blogPostsContainer, postTemplate);

        // Set up load more button
        const loadMoreButton = document.getElementById('load-more');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', function() {
                // In a real application, this would load more posts from an API
                // For now, we'll just duplicate the existing posts
                renderBlogPosts(blogPosts, blogPostsContainer, postTemplate);

                // After loading a few batches, disable the button
                if (blogPostsContainer.children.length > 12) {
                    loadMoreButton.disabled = true;
                    loadMoreButton.textContent = 'No More Posts';
                }
            });
        }
    }
}

// Render blog posts
function renderBlogPosts(posts, container, template) {
    posts.forEach(post => {
        // Clone the template
        const postElement = document.importNode(template.content, true);

        // Set the content
        const img = postElement.querySelector('.post-image img');
        img.src = post.image;
        img.alt = post.imageAlt;

        const category = postElement.querySelector('.post-category');
        category.textContent = post.category;
        category.dataset.category = post.categorySlug;

        const titleElement = postElement.querySelector('h3');
        titleElement.textContent = post.title;
        
        postElement.querySelector('p').textContent = post.excerpt;
        postElement.querySelector('.post-date').innerHTML = `<i class="far fa-calendar"></i> ${post.date}`;
        postElement.querySelector('.post-author').innerHTML = `<i class="far fa-user"></i> ${post.author}`;
        
        // Set the "Read More" link to point to the blog details page
        const readMoreLink = postElement.querySelector('.read-more');
        if (readMoreLink) {
            // Use the provided slug or generate one from the title
            const slug = post.slug || createSlug(post.title);
            readMoreLink.href = `blog-details.html?post=${slug}`;
        }

        // Make the entire card clickable
        const postCard = postElement.querySelector('.post-card');
        if (postCard) {
            postCard.style.cursor = 'pointer';
            postCard.addEventListener('click', function(event) {
                // Prevent triggering if clicking on the Read More button (it has its own link)
                if (!event.target.classList.contains('read-more')) {
                    // Get post slug from the Read More link or generate from title
                    const readMoreHref = readMoreLink.getAttribute('href');
                    window.location.href = readMoreHref;
                }
            });
        }

        // Append to container
        container.appendChild(postElement);
    });
}

// Helper function to create a URL-friendly slug from a title
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
        .trim();                  // Trim leading/trailing spaces
}

// Set up blog filters
function setupBlogFilters() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categorySelect = document.getElementById('category-select');
    const categoryLinks = document.querySelectorAll('.category-list a');

    // Search functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            filterBlogPosts(searchInput.value, categorySelect ? categorySelect.value : 'all');
        });

        // Also trigger search on Enter key
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                filterBlogPosts(searchInput.value, categorySelect ? categorySelect.value : 'all');
            }
        });
    }

    // Category select dropdown
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            filterBlogPosts(searchInput ? searchInput.value : '', categorySelect.value);
        });
    }

    // Category sidebar links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = link.getAttribute('data-category');

            // Update the category select dropdown if it exists
            if (categorySelect) {
                categorySelect.value = category;
            }

            filterBlogPosts(searchInput ? searchInput.value : '', category);
        });
    });
}

// Filter blog posts based on search term and category
function filterBlogPosts(searchTerm, category) {
    const blogPosts = document.querySelectorAll('#blog-posts .post-card');
    searchTerm = searchTerm.toLowerCase().trim();

    blogPosts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const excerpt = post.querySelector('p').textContent.toLowerCase();
        const postCategory = post.querySelector('.post-category').dataset.category;

        const matchesSearch = searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm);
        const matchesCategory = category === 'all' || postCategory === category;

        // Show or hide based on filters
        if (matchesSearch && matchesCategory) {
            post.style.display = '';
        } else {
            post.style.display = 'none';
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}