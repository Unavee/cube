document.addEventListener('DOMContentLoaded', function() {
        // search functionality
        const searchIcon = document.getElementById('searchIcon');
        const searchBox = document.getElementById('searchBox');
    
        if (searchIcon && searchBox) {
            searchIcon.addEventListener('click', function() {
                searchBox.style.display = searchBox.style.display === 'block' ? 'none' : 'block';
            });
        }
    
        // Mobile Menu Toggle
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const mainNav = document.querySelector('.main-nav');
    
        if (hamburgerMenu && mainNav) {
            hamburgerMenu.addEventListener('click', function() {
                mainNav.classList.toggle('active');
            });
        }
    
        // FAQ Accordion
        const accordionItems = document.querySelectorAll('.accordion-item');
    
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const plusIcon = item.querySelector('.plus-icon');
    
            header.addEventListener('click', function() {
                // Close all accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.accordion-content').style.display = 'none';
                        otherItem.querySelector('.plus-icon').textContent = '+';
                    }
                });
    
                // Toggle current item
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    plusIcon.textContent = '+';
                } else {
                    content.style.display = 'block';
                    plusIcon.textContent = '-';
                }
            });
        });
    
        // product gallery 
        const mainProductImage = document.getElementById('mainProductImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const galleryDots = document.querySelectorAll('.gallery-dot');
        const prevButton = document.querySelector('.gallery-prev');
        const nextButton = document.querySelector('.gallery-next');
        
        // Store all image paths for the slider
        const imagePaths = [];
        thumbnails.forEach(thumbnail => {
            imagePaths.push(thumbnail.getAttribute('data-image'));
        });
        
        let currentIndex = 0;
        
       
        function updateGallery(index) {
          
            mainProductImage.src = imagePaths[index];
            
           
            thumbnails.forEach((thumbnail, i) => {
                if (i === index) {
                    thumbnail.classList.add('active');
                } else {
                    thumbnail.classList.remove('active');
                }
            });
            
           
            if (galleryDots.length > 0) {
               
                const dotIndex = Math.min(Math.floor(index / (imagePaths.length / galleryDots.length)), galleryDots.length - 1);
                
                galleryDots.forEach((dot, i) => {
                    if (i === dotIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
       
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                currentIndex = index;
                updateGallery(currentIndex);
            });
        });
        
      
        if (galleryDots.length > 0) {
            galleryDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    // calculate for dots
                    const imagesPerDot = Math.ceil(imagePaths.length / galleryDots.length);
                    currentIndex = index * imagesPerDot;
                    if (currentIndex >= imagePaths.length) {
                        currentIndex = imagePaths.length - 1;
                    }
                    updateGallery(currentIndex);
                });
            });
        }
        
        // Set up prev/next buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
                updateGallery(currentIndex);
            });
            
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % imagePaths.length;
                updateGallery(currentIndex);
            });
        }
        
        // flavor selection affects product image
        const flavorRadios = document.querySelectorAll('input[name="flavor"]');
        
        flavorRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                
                const flavor = this.value;
                
                if (flavor === 'original') {
                   
                    const originalThumb = document.querySelector('.thumbnail[data-image*="original"]');
                    if (originalThumb) originalThumb.click();
                } else if (flavor === 'matcha') {
                    
                    const matchaThumb = document.querySelector('.thumbnail[data-image*="matcha"]');
                    if (matchaThumb) matchaThumb.click();
                } else if (flavor === 'cacao') {
                    
                    const cacaoThumb = document.querySelector('.thumbnail[data-image*="cacao"]');
                    if (cacaoThumb) cacaoThumb.click();
                }
            });
        });
        
        // add to cart button
        const purchaseOptions = document.querySelectorAll('input[name="purchase-type"]');
        const addToCartBtn = document.getElementById('addToCartBtn');
        
        purchaseOptions.forEach(option => {
            option.addEventListener('change', function() {
               
                const purchaseType = this.value;
                
                if (purchaseType === 'subscription') {
                    addToCartBtn.textContent = 'Subscribe Now →';
                } else if (purchaseType === 'double-kit') {
                    addToCartBtn.textContent = 'Add Double Kit to Cart →';
                } else if (purchaseType === 'try-once') {
                    addToCartBtn.textContent = 'Add to Cart →';
                }
            });
        });
    
        // Animated counter for statistics section
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start) + '%';
                
                if (start >= target) {
                    clearInterval(timer);
                    element.textContent = target + '%';
                }
            }, 16);
        }
    
       
        function initCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target, 2000); // 2 seconds duration
            });
        }
        
       
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        
        function checkCounters() {
            const statisticsSection = document.querySelector('.statistics-section');
            if (statisticsSection && isInViewport(statisticsSection)) {
                initCounters();
                window.removeEventListener('scroll', checkCounters);
            }
        }
        
       
        window.addEventListener('scroll', checkCounters);
        checkCounters(); 
    });
