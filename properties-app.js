const allProperties = [
    { id: 1, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', title: 'Modern Villa in Beverly Hills', location: 'Beverly Hills', price: '$12,500,000', beds: 5, baths: 7, area: '8,000 sqft' },
    { id: 2, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800', title: 'Penthouse with Ocean View', location: 'Malibu', price: '$9,800,000', beds: 3, baths: 4, area: '4,500 sqft' },
    { id: 3, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', title: 'Classic Estate in The Hamptons', location: 'The Hamptons', price: '$15,000,000', beds: 7, baths: 9, area: '12,000 sqft' },
    { id: 4, image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', title: 'Luxury Waterfront Villa', location: 'Miami Beach', price: '$8,200,000', beds: 4, baths: 5, area: '6,500 sqft' },
    { id: 5, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', title: 'Contemporary Downtown Penthouse', location: 'Manhattan', price: '$11,800,000', beds: 4, baths: 4, area: '5,200 sqft' },
    { id: 6, image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800', title: 'Modern Architectural Masterpiece', location: 'Hollywood Hills', price: '$7,500,000', beds: 3, baths: 3, area: '4,800 sqft' }
];

// Mobile view state management
let currentMobileView = 'full'; // 'full' or 'split'

function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';
    allProperties.forEach(property => {
        const fullCard = `
            <div class="col-lg-4 col-md-6 mb-4 property-card-new">
                <div class="property-card-new">
                    <div class="property-image-container">
                        <img src="${property.image}" alt="${property.title}" class="property-image-new" loading="lazy">
                        <div class="property-favorite">
                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="#080341"></path> </g></svg>
                        </div>
                        <div class="property-badge-image">For Sale</div>
                    </div>
                    <div class="property-content-new">
                        <h3 class="property-title-new">${property.title}</h3>
                        <p class="property-price-new">${property.price}</p>
                        <div class="property-divider"></div>
                        <div class="property-details-new">
                            <div class="property-detail-item">
                                <i class="fas fa-bed"></i>
                                <span>${property.beds}</span>
                            </div>
                            <div class="property-detail-item">
                                <i class="fas fa-bath"></i>
                                <span>${property.baths}</span>
                            </div>
                            <div class="property-detail-item">
                                <i class="fas fa-expand-arrows-alt"></i>
                                <span>${property.area}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const splitCard = `
            <div class="col-12 mobile-card-split">
                <div class="mobile-image-container">
                    <img src="${property.image}" alt="${property.title}" class="mobile-image" loading="lazy">
                    <div class="mobile-favorite">
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="#080341"></path> </g></svg>
                    </div>
                    <div class="mobile-badge">For Sale</div>
                </div>
                <div class="mobile-content">
                    <div>
                        <h4 class="mobile-title">${property.title}</h4>
                        <p class="mobile-price">${property.price}</p>
                    </div>
                    <div class="mobile-details">
                        <div class="mobile-detail-item">
                            <i class="fas fa-bed"></i>
                            <span>${property.beds}</span>
                        </div>
                        <div class="mobile-detail-item">
                            <i class="fas fa-bath"></i>
                            <span>${property.baths}</span>
                        </div>
                        <div class="mobile-detail-item">
                            <i class="fas fa-expand-arrows-alt"></i>
                            <span>${property.area}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        grid.innerHTML += fullCard + splitCard;
    });

    // Add favorite functionality
    addFavoriteListeners();
    
    // Set initial mobile view
    setMobileView(currentMobileView);
}

// Set mobile view and update grid classes
function setMobileView(viewType) {
    const grid = document.getElementById('propertiesGrid');
    const toggleIcon = document.getElementById('viewToggleIcon');
    
    if (!grid) return;
    
    // Remove existing view classes
    grid.classList.remove('mobile-view-full', 'mobile-view-split');
    
    // Add new view class
    grid.classList.add(`mobile-view-${viewType}`);
    
    // Update toggle icon
    if (toggleIcon) {
        if (viewType === 'full') {
            toggleIcon.className = 'fas fa-th-large';
        } else {
            toggleIcon.className = 'fas fa-th-list';
        }
    }
    
    // Store current view
    currentMobileView = viewType;
}

// Toggle mobile view
function toggleMobileView() {
    const newView = currentMobileView === 'full' ? 'split' : 'full';
    setMobileView(newView);
    
    // Add subtle animation feedback
    const grid = document.getElementById('propertiesGrid');
    if (grid) {
        grid.style.opacity = '0.7';
        setTimeout(() => {
            grid.style.opacity = '1';
        }, 150);
    }
}

// Add favorite functionality
function addFavoriteListeners() {
    // Handle both full and split card favorites
    document.querySelectorAll('.property-favorite, .mobile-favorite').forEach(favoriteBtn => {
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            
            // Add pulse animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'heartPulse 0.6s ease';
            }, 10);
            
            // Remove animation after completion
            setTimeout(() => {
                this.style.animation = 'none';
            }, 610);
        });
    });
}

// Initialize mobile view toggle button
function initializeMobileViewToggle() {
    const toggleBtn = document.getElementById('mobileViewToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMobileView);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    initializeMobileViewToggle();
});