/**
 * Global Development Research Portal - Main JavaScript
 * This file handles interactive elements and functionality for the website
 */

(function() {
    'use strict';

    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Detect and announce screen reader support
        addA11ySupport();
        
        // Set up navigation
        setupMobileNav();
        
        // Set up form handling
        setupForms();
        
        // Set up country field in signup form
        setupCountryField();
        
        // Set up blog filtering
        setupBlogFiltering();
        
        // Set up blog search
        setupBlogSearch();
        
        // Add keyboard navigation support
        setupKeyboardNav();
        
        // Update current year in footer
        updateCopyrightYear();
        
        // Update mobile styles
        addMobileStyles();
    });

    /**
     * Add accessibility support features
     */
    function addA11ySupport() {
        // Add skip link announcement for screen readers
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('focus', function() {
                // Announce to screen readers that skip link is available
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.classList.add('sr-only');
                announcement.textContent = 'Skip link activated. Press Enter to skip to main content.';
                document.body.appendChild(announcement);
                
                // Remove after announcement has been read
                setTimeout(function() {
                    document.body.removeChild(announcement);
                }, 3000);
            });
        }
        
        // Add announcement for required form fields
        const requiredFields = document.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const label = document.querySelector(`label[for="${field.id}"]`);
            if (label && !label.querySelector('.required-indicator')) {
                const indicator = document.createElement('span');
                indicator.classList.add('required-indicator');
                indicator.setAttribute('aria-hidden', 'true');
                indicator.textContent = ' *';
                label.appendChild(indicator);
                
                // Add screen reader text
                const srText = document.createElement('span');
                srText.classList.add('sr-only');
                srText.textContent = ' (required)';
                label.appendChild(srText);
            }
        });
        
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
        interactiveElements.forEach(element => {
            if (element.getAttribute('tabindex') === '-1' && !element.hasAttribute('aria-hidden')) {
                console.warn('Element with tabindex="-1" should usually have aria-hidden="true"', element);
            }
        });
    }

    /**
     * Set up mobile navigation
     */
    function setupMobileNav() {
        const header = document.querySelector('header');
        if (!header) return;

        // Get or create mobile nav button if it doesn't exist
        let navToggle = document.querySelector('.mobile-nav-toggle');
        if (!navToggle) {
            navToggle = document.createElement('button');
            navToggle.classList.add('mobile-nav-toggle');
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
            navToggle.innerHTML = '<span></span><span></span><span></span>';
            
            const nav = header.querySelector('nav');
            if (nav) {
                const primaryMenu = nav.querySelector('ul');
                if (primaryMenu) {
                    navToggle.setAttribute('aria-controls', primaryMenu.id || 'primary-menu');
                    if (!primaryMenu.id) primaryMenu.id = 'primary-menu';
                }
                
                header.insertBefore(navToggle, nav);
            }
        }
        
        // Set up toggle functionality
        navToggle.addEventListener('click', function() {
            header.classList.toggle('nav-open');
            const isExpanded = header.classList.contains('nav-open');
            navToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            
            // Accessibility: Announce menu state to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.classList.add('sr-only');
            announcement.textContent = isExpanded ? 'Navigation menu expanded' : 'Navigation menu collapsed';
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        });
        
        // Close menu when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (header.classList.contains('nav-open') && 
                !e.target.closest('nav') && 
                !e.target.closest('.mobile-nav-toggle')) {
                header.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Set up form validation and submission
     */
    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.getAttribute('data-js-handled')) {
                form.setAttribute('data-js-handled', 'true');
                
                // Add inline validation
                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    if (input.hasAttribute('required')) {
                        input.addEventListener('blur', function() {
                            validateInput(input);
                        });
                    }
                    
                    // Special validation for password fields
                    if (input.id === 'password') {
                        input.addEventListener('input', function() {
                            validatePassword(input);
                        });
                    }
                    
                    if (input.id === 'confirm-password') {
                        input.addEventListener('input', function() {
                            validatePasswordMatch(
                                document.getElementById('password'),
                                input
                            );
                        });
                    }
                });
                
                form.addEventListener('submit', function(e) {
                    // Validate all required fields before submission
                    let isValid = true;
                    inputs.forEach(input => {
                        if (input.hasAttribute('required')) {
                            if (!validateInput(input)) {
                                isValid = false;
                            }
                        }
                    });
                    
                    // Check password match if applicable
                    const password = form.querySelector('#password');
                    const confirmPassword = form.querySelector('#confirm-password');
                    if (password && confirmPassword) {
                        if (!validatePasswordMatch(password, confirmPassword)) {
                            isValid = false;
                        }
                    }
                    
                    // Only prevent default if needed
                    if (!isValid || !form.getAttribute('data-submit-allowed')) {
                        e.preventDefault();
                        
                        if (!isValid) {
                            // Focus the first invalid field
                            const firstInvalid = form.querySelector('.is-invalid');
                            if (firstInvalid) {
                                firstInvalid.focus();
                            }
                            
                            // Announce validation error to screen readers
                            announceValidationError();
                        } else {
                            // Handle specific form types
                            handleFormSpecificSubmit(form);
                        }
                    }
                });
            }
        });
    }
    
    /**
     * Validate a form input field
     * @param {HTMLElement} input - The input element to validate
     * @returns {boolean} - Whether the input is valid
     */
    function validateInput(input) {
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous validation classes and messages
        input.classList.remove('is-valid', 'is-invalid');
        const existingError = input.parentNode.querySelector('.validation-error');
        if (existingError) {
            input.parentNode.removeChild(existingError);
        }
        
        // Check for required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        
        // Add appropriate validation class
        input.classList.add(isValid ? 'is-valid' : 'is-invalid');
        
        // Add error message if invalid
        if (!isValid) {
            const errorElement = document.createElement('div');
            errorElement.classList.add('validation-error');
            errorElement.textContent = errorMessage;
            errorElement.id = `${input.id}-error`;
            input.setAttribute('aria-describedby', errorElement.id);
            input.parentNode.appendChild(errorElement);
        } else {
            input.removeAttribute('aria-describedby');
        }
        
        return isValid;
    }
    
    /**
     * Validate email format
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    /**
     * Validate password strength
     * @param {HTMLElement} input - The password input
     * @returns {boolean} - Whether the password is strong enough
     */
    function validatePassword(input) {
        const password = input.value;
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        let isValid = password.length >= minLength && hasNumber && hasSpecial;
        
        // Update password strength indicator if it exists
        const strengthIndicator = document.getElementById('password-strength');
        if (strengthIndicator) {
            let strength = 'weak';
            if (password.length >= minLength && (hasNumber || hasSpecial)) {
                strength = 'medium';
            }
            if (password.length >= minLength && hasNumber && hasSpecial) {
                strength = 'strong';
            }
            
            strengthIndicator.className = 'password-strength ' + strength;
            strengthIndicator.textContent = `Password strength: ${strength}`;
        }
        
        return isValid;
    }
    
    /**
     * Validate that passwords match
     * @param {HTMLElement} passwordInput - The main password input
     * @param {HTMLElement} confirmInput - The confirm password input 
     * @returns {boolean} - Whether the passwords match
     */
    function validatePasswordMatch(passwordInput, confirmInput) {
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        
        const isValid = password === confirm;
        
        // Remove previous validation classes and messages
        confirmInput.classList.remove('is-valid', 'is-invalid');
        const existingError = confirmInput.parentNode.querySelector('.validation-error');
        if (existingError) {
            confirmInput.parentNode.removeChild(existingError);
        }
        
        // Only show validation once the user has started typing in the confirm field
        if (confirm && !isValid) {
            confirmInput.classList.add('is-invalid');
            
            const errorElement = document.createElement('div');
            errorElement.classList.add('validation-error');
            errorElement.textContent = 'Passwords do not match';
            errorElement.id = `${confirmInput.id}-error`;
            confirmInput.setAttribute('aria-describedby', errorElement.id);
            confirmInput.parentNode.appendChild(errorElement);
        } else if (confirm) {
            confirmInput.classList.add('is-valid');
            confirmInput.removeAttribute('aria-describedby');
        }
        
        return isValid || !confirm; // Only fail validation if user has started typing
    }
    
    /**
     * Announce validation error to screen readers
     */
    function announceValidationError() {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.classList.add('sr-only');
        announcement.textContent = 'Form has validation errors. Please check your entries.';
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    }
    
    /**
     * Handle form-specific submission logic
     * @param {HTMLElement} form - The form element
     */
    function handleFormSpecificSubmit(form) {
        // Registration form handling
        if (form.id === 'registration-form') {
            // Show a loading state
            form.classList.add('loading');
            
            // Simulate successful registration (replace with actual API call)
            setTimeout(() => {
                form.classList.remove('loading');
                showSuccessMessage('Registration successful! You can now log in with your credentials.');
                window.location.href = 'login.html';
            }, 1500);
        }
        
        // Login form handling
        if (form.id === 'login-form') {
            // Show a loading state
            form.classList.add('loading');
            
            // Simulate successful login (replace with actual API call)
            setTimeout(() => {
                form.classList.remove('loading');
                showSuccessMessage('Login successful!');
                window.location.href = 'index.html';
            }, 1500);
        }
    }
    
    /**
     * Show a success message
     * @param {string} message - The success message to display
     */
    function showSuccessMessage(message) {
        // Create success message element if it doesn't exist
        let successElement = document.getElementById('success-message');
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.id = 'success-message';
            successElement.classList.add('success-message');
            successElement.setAttribute('aria-live', 'polite');
            document.body.appendChild(successElement);
        }
        
        successElement.textContent = message;
        successElement.classList.add('visible');
        
        // Remove after a delay
        setTimeout(() => {
            successElement.classList.remove('visible');
        }, 5000);
    }

    /**
     * Set up country field in signup form
     */
    function setupCountryField() {
        const countrySelect = document.getElementById('country');
        if (countrySelect) {
            const otherCountryGroup = document.getElementById('other-country-group');
            if (otherCountryGroup) {
                // Set initial state
                otherCountryGroup.style.display = countrySelect.value === 'other' ? 'block' : 'none';
                
                // Add change listener
                countrySelect.addEventListener('change', function() {
                    const showOtherField = this.value === 'other';
                    otherCountryGroup.style.display = showOtherField ? 'block' : 'none';
                    
                    // Handle required attribute on the other country field
                    const otherCountryField = document.getElementById('other-country');
                    if (otherCountryField) {
                        if (showOtherField) {
                            otherCountryField.setAttribute('required', 'required');
                        } else {
                            otherCountryField.removeAttribute('required');
                        }
                    }
                });
            }
        }
    }

    /**
     * Set up blog category filtering
     */
    function setupBlogFiltering() {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                const category = this.value.toLowerCase();
                const blogPosts = document.querySelectorAll('.blog-post-card, .featured-article');
                let postsVisible = 0;
                
                blogPosts.forEach(post => {
                    const postCategory = post.querySelector('.category')?.textContent.toLowerCase();
                    
                    if (category === 'all' || (postCategory && postCategory === category)) {
                        post.style.display = '';
                        postsVisible++;
                    } else {
                        post.style.display = 'none';
                    }
                });
                
                // Update results count
                updateFilterResults(postsVisible, category);
            });
        }
    }
    
    /**
     * Update filter results count for screen readers and users
     * @param {number} count - Number of visible posts
     * @param {string} category - Selected category
     */
    function updateFilterResults(count, category) {
        // Create or update results count element
        let resultsElement = document.getElementById('filter-results');
        if (!resultsElement) {
            resultsElement = document.createElement('div');
            resultsElement.id = 'filter-results';
            resultsElement.setAttribute('aria-live', 'polite');
            
            const blogControls = document.querySelector('.blog-controls');
            if (blogControls) {
                blogControls.appendChild(resultsElement);
            }
        }
        
        const categoryText = category === 'all' ? 'all categories' : `category "${category}"`;
        resultsElement.textContent = `Showing ${count} post${count !== 1 ? 's' : ''} in ${categoryText}`;
    }

    /**
     * Set up blog search functionality
     */
    function setupBlogSearch() {
        const searchBar = document.querySelector('.search-bar');
        if (searchBar) {
            const searchInput = searchBar.querySelector('input');
            const searchButton = searchBar.querySelector('button');
            
            if (searchInput && searchButton) {
                const performSearch = () => {
                    const searchTerm = searchInput.value.toLowerCase().trim();
                    
                    // Display all posts if search term is empty
                    if (!searchTerm) {
                        resetSearch();
                        return;
                    }
                    
                    const blogPosts = document.querySelectorAll('.blog-post-card, .featured-article');
                    let postsVisible = 0;
                    
                    blogPosts.forEach(post => {
                        const title = post.querySelector('h3, h4')?.textContent.toLowerCase() || '';
                        const excerpt = post.querySelector('.excerpt')?.textContent.toLowerCase() || '';
                        const author = post.querySelector('.meta')?.textContent.toLowerCase() || '';
                        
                        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || author.includes(searchTerm)) {
                            post.style.display = '';
                            postsVisible++;
                            
                            // Highlight search matches
                            highlightMatches(post, searchTerm);
                        } else {
                            post.style.display = 'none';
                        }
                    });
                    
                    // Update results for screen readers
                    updateSearchResults(postsVisible, searchTerm);
                };
                
                // Reset search results
                const resetSearch = () => {
                    const blogPosts = document.querySelectorAll('.blog-post-card, .featured-article');
                    
                    blogPosts.forEach(post => {
                        post.style.display = '';
                        
                        // Remove highlighting
                        const highlights = post.querySelectorAll('.search-highlight');
                        highlights.forEach(el => {
                            const parent = el.parentNode;
                            parent.replaceChild(document.createTextNode(el.textContent), el);
                            parent.normalize();
                        });
                    });
                    
                    // Clear results announcement
                    const resultsElement = document.getElementById('search-results');
                    if (resultsElement) {
                        resultsElement.textContent = '';
                    }
                };
                
                // Add event listeners
                searchButton.addEventListener('click', performSearch);
                
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        performSearch();
                    }
                });
                
                // Add reset button
                const resetButton = document.createElement('button');
                resetButton.textContent = 'Clear';
                resetButton.classList.add('reset-search');
                resetButton.setAttribute('aria-label', 'Clear search');
                resetButton.style.display = 'none';
                
                searchBar.appendChild(resetButton);
                
                resetButton.addEventListener('click', () => {
                    searchInput.value = '';
                    resetSearch();
                    resetButton.style.display = 'none';
                    searchInput.focus();
                });
                
                // Show/hide reset button based on search input
                searchInput.addEventListener('input', () => {
                    resetButton.style.display = searchInput.value ? 'block' : 'none';
                });
            }
        }
    }
    
    /**
     * Update search results for screen readers
     * @param {number} count - Number of visible posts
     * @param {string} term - Search term
     */
    function updateSearchResults(count, term) {
        // Create or update results element
        let resultsElement = document.getElementById('search-results');
        if (!resultsElement) {
            resultsElement = document.createElement('div');
            resultsElement.id = 'search-results';
            resultsElement.setAttribute('aria-live', 'polite');
            resultsElement.classList.add('search-results-count');
            
            const blogControls = document.querySelector('.blog-controls');
            if (blogControls) {
                blogControls.appendChild(resultsElement);
            }
        }
        
        resultsElement.textContent = `Found ${count} post${count !== 1 ? 's' : ''} matching "${term}"`;
    }
    
    /**
     * Highlight search term matches in posts
     * @param {HTMLElement} post - The blog post element
     * @param {string} term - The search term to highlight
     */
    function highlightMatches(post, term) {
        // Remove any existing highlights first
        const existingHighlights = post.querySelectorAll('.search-highlight');
        existingHighlights.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
        
        // Text elements to search in
        const textElements = post.querySelectorAll('h3, h4, p:not(.meta)');
        
        textElements.forEach(element => {
            const originalText = element.innerHTML;
            
            // Skip if the element has complex HTML
            if (originalText.includes('<') && originalText.includes('>')) {
                return;
            }
            
            // Create regex with word boundary for better matching
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
            const newText = originalText.replace(regex, '<span class="search-highlight">$1</span>');
            
            if (newText !== originalText) {
                element.innerHTML = newText;
            }
        });
    }
    
    /**
     * Escape special regex characters in a string
     * @param {string} string - String to escape
     * @returns {string} - Escaped string safe for regex
     */
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    /**
     * Set up keyboard navigation support
     */
    function setupKeyboardNav() {
        // Add keyboard support for cards
        const cards = document.querySelectorAll('.topic-card, .blog-card, .blog-post-card');
        
        cards.forEach(card => {
            // Make cards focusable if they have an inner link
            const cardLink = card.querySelector('a');
            if (cardLink) {
                // Use first link as the card's action
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', cardLink.textContent);
                
                card.addEventListener('keydown', function(e) {
                    // Activate card on Enter or Space
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        cardLink.click();
                    }
                });
            }
        });
    }
    
    /**
     * Update copyright year in footer
     */
    function updateCopyrightYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Add mobile styles dynamically
     */
    function addMobileStyles() {
        // Skip if already added
        if (document.getElementById('mobile-nav-styles')) {
            return;
        }
        
        const styleEl = document.createElement('style');
        styleEl.id = 'mobile-nav-styles';
        styleEl.textContent = `
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                    background: none;
                    border: none;
                    width: 30px;
                    height: 20px;
                    position: relative;
                    cursor: pointer;
                    z-index: 20;
                }
                
                .mobile-nav-toggle span {
                    display: block;
                    position: absolute;
                    height: 3px;
                    width: 100%;
                    background: var(--primary-color);
                    border-radius: 3px;
                    opacity: 1;
                    left: 0;
                    transform: rotate(0deg);
                    transition: .25s ease-in-out;
                }
                
                .mobile-nav-toggle span:nth-child(1) {
                    top: 0px;
                }
                
                .mobile-nav-toggle span:nth-child(2) {
                    top: 8px;
                }
                
                .mobile-nav-toggle span:nth-child(3) {
                    top: 16px;
                }
                
                header.nav-open .mobile-nav-toggle span:nth-child(1) {
                    top: 8px;
                    transform: rotate(135deg);
                }
                
                header.nav-open .mobile-nav-toggle span:nth-child(2) {
                    opacity: 0;
                    left: -60px;
                }
                
                header.nav-open .mobile-nav-toggle span:nth-child(3) {
                    top: 8px;
                    transform: rotate(-135deg);
                }
                
                header nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    max-width: 300px;
                    height: 100vh;
                    background: white;
                    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
                    padding: 80px 20px 20px;
                    transition: right 0.3s ease;
                    z-index: 10;
                }
                
                header.nav-open nav {
                    right: 0;
                }
                
                header nav ul {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                header nav li {
                    margin: 10px 0;
                    width: 100%;
                }
                
                header nav a {
                    display: block;
                    padding: 10px 0;
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
})(); 