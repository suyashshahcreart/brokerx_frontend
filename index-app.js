const featuredProperties = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        title: 'Luxury Penthouse',
        location: 'Downtown District',
        price: '$2,500,000',
        beds: 4,
        baths: 3,
        area: '3500 sq ft'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
        title: 'Modern Villa',
        location: 'Riverside Estate',
        price: '$3,200,000',
        beds: 5,
        baths: 4,
        area: '4500 sq ft'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        title: 'Contemporary Apartment',
        location: 'City Center',
        price: '$1,800,000',
        beds: 3,
        baths: 2,
        area: '2500 sq ft'
    }
];

// Multi-select location functionality
class MultiSelectLocation {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.trigger = this.container.querySelector('.multi-select-trigger');
        this.dropdown = this.container.querySelector('.multi-select-dropdown');
        this.options = this.container.querySelectorAll('.multi-select-option');
        this.tagsContainer = document.getElementById('selectedLocationTags');
        this.selectedValues = new Set();
        
        this.init();
    }
    
    init() {
        this.trigger.addEventListener('click', () => this.toggleDropdown());
        this.options.forEach(option => {
            option.addEventListener('click', () => this.selectOption(option));
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.closeDropdown();
            }
        });
    }
    
    toggleDropdown() {
        const isOpen = this.dropdown.classList.contains('show');
        if (isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }
    
    openDropdown() {
        this.dropdown.classList.add('show');
        this.trigger.classList.add('active');
    }
    
    closeDropdown() {
        this.dropdown.classList.remove('show');
        this.trigger.classList.remove('active');
    }
    
    selectOption(option) {
        const value = option.dataset.value;
        const text = option.textContent;
        
        if (this.selectedValues.has(value)) {
            this.selectedValues.delete(value);
            option.classList.remove('selected');
            this.removeTag(value);
        } else {
            this.selectedValues.add(value);
            option.classList.add('selected');
            this.addTag(value, text);
        }
        
        this.updatePlaceholder();
    }
    
    addTag(value, text) {
        const tag = document.createElement('div');
        tag.className = 'selected-tag';
        tag.dataset.value = value;
        tag.innerHTML = `
            <span>${text}</span>
            <i class="lucide-x remove-tag"></i>
        `;
        
        // Make the entire tag clickable to unselect
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            this.unselectTag(value);
        });
        
        const removeBtn = tag.querySelector('.remove-tag');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.unselectTag(value);
        });
        
        this.tagsContainer.appendChild(tag);
    }
    
    unselectTag(value) {
        // Remove from selected values
        this.selectedValues.delete(value);
        
        // Update dropdown option
        this.options.forEach(opt => {
            if (opt.dataset.value === value) {
                opt.classList.remove('selected');
            }
        });
        
        // Remove tag with animation
        this.removeTag(value);
        
        // Update placeholder
        this.updatePlaceholder();
    }
    
    removeTag(value) {
        const tag = this.tagsContainer.querySelector(`[data-value="${value}"]`);
        if (tag) {
            tag.style.animation = 'tagFadeOut 0.2s ease';
            setTimeout(() => {
                if (tag.parentNode) {
                    tag.parentNode.removeChild(tag);
                }
            }, 200);
        }
    }
    
    updatePlaceholder() {
        const placeholder = this.trigger.querySelector('.placeholder');
        if (this.selectedValues.size === 0) {
            placeholder.textContent = 'Select locations...';
            placeholder.style.color = '#6c757d';
        } else {
            placeholder.textContent = `${this.selectedValues.size} location(s) selected`;
            placeholder.style.color = '#495057';
        }
    }
    
    getSelectedValues() {
        return Array.from(this.selectedValues);
    }
    
    clearAll() {
        this.selectedValues.clear();
        this.tagsContainer.innerHTML = '';
        this.options.forEach(option => option.classList.remove('selected'));
        this.updatePlaceholder();
    }
}

// Advanced Filter Modal functionality
class AdvancedFilterModal {
    constructor() {
        this.modal = new bootstrap.Modal(document.getElementById('advancedFilterModal'));
        this.filters = {
            bedrooms: '',
            bathrooms: '',
            age: '',
            furnished: '',
            minArea: '',
            maxArea: '',
            amenities: []
        };
        
        this.init();
    }
    
    init() {
        // Advanced filter button
        document.getElementById('advancedFilterBtn').addEventListener('click', () => {
            this.modal.show();
        });
        
        // Apply advanced filters
        document.getElementById('applyAdvancedFilters').addEventListener('click', () => {
            this.applyFilters();
        });
        
        // Clear advanced filters
        document.getElementById('clearAdvancedFilters').addEventListener('click', () => {
            this.clearFilters();
        });
        
        // Track amenity changes
        const amenityCheckboxes = document.querySelectorAll('#advancedFilterModal .form-check-input');
        amenityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateAmenities());
        });
    }
    
    applyFilters() {
        // Get all filter values
        this.filters.bedrooms = document.getElementById('advancedBedrooms').value;
        this.filters.bathrooms = document.getElementById('advancedBathrooms').value;
        this.filters.age = document.getElementById('advancedAge').value;
        this.filters.furnished = document.getElementById('advancedFurnished').value;
        this.filters.minArea = document.getElementById('minArea').value;
        this.filters.maxArea = document.getElementById('maxArea').value;
        
        // Show loading state
        const applyBtn = document.getElementById('applyAdvancedFilters');
        applyBtn.classList.add('btn-loading');
        
        // Simulate filter application
        setTimeout(() => {
            applyBtn.classList.remove('btn-loading');
            this.modal.hide();
            
            // Show success message
            this.showFilterMessage('Advanced filters applied successfully!');
        }, 1000);
    }
    
    updateAmenities() {
        const checkboxes = document.querySelectorAll('#advancedFilterModal .form-check-input:checked');
        this.filters.amenities = Array.from(checkboxes).map(cb => cb.value);
    }
    
    clearFilters() {
        // Reset all form elements
        document.getElementById('advancedBedrooms').value = '';
        document.getElementById('advancedBathrooms').value = '';
        document.getElementById('advancedAge').value = '';
        document.getElementById('advancedFurnished').value = '';
        document.getElementById('minArea').value = '';
        document.getElementById('maxArea').value = '';
        
        // Uncheck all amenities
        const amenityCheckboxes = document.querySelectorAll('#advancedFilterModal .form-check-input');
        amenityCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        this.filters = {
            bedrooms: '',
            bathrooms: '',
            age: '',
            furnished: '',
            minArea: '',
            maxArea: '',
            amenities: []
        };
        
        this.showFilterMessage('All advanced filters cleared!');
    }
    
    showFilterMessage(message) {
        // Create and show a toast message
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
        toast.style.cssText = 'top: 100px; right: 20px; z-index: 1055;';
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
            document.body.removeChild(toast);
        });
    }
    
    getFilters() {
        return this.filters;
    }
}

// Price range functionality
function initPriceRange() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            priceValue.textContent = `$${value.toLocaleString()}`;
        });
    }
}

// Main filter application
function applyFilters() {
    const typeFilter = document.getElementById('typeFilter').value;
    const priceRange = document.getElementById('priceRange').value;
    const selectedLocations = multiSelectLocation.getSelectedValues();
    const advancedFilters = advancedFilterModal.getFilters();
    
    // Show loading state
    const applyBtn = document.getElementById('applyFiltersBtn');
    applyBtn.classList.add('btn-loading');
    
    // Simulate filter application
    setTimeout(() => {
        applyBtn.classList.remove('btn-loading');
        
        // Create filter summary
        let filterSummary = [];
        if (typeFilter) filterSummary.push(`Type: ${typeFilter}`);
        if (selectedLocations.length > 0) filterSummary.push(`Locations: ${selectedLocations.length} selected`);
        if (priceRange && priceRange !== '5000000') filterSummary.push(`Max Price: $${parseInt(priceRange).toLocaleString()}`);
        
        const message = filterSummary.length > 0 
            ? `Filters applied: ${filterSummary.join(', ')}`
            : 'All filters cleared!';
            
        showToastMessage(message, 'success');
    }, 800);
}

function showToastMessage(message, type = 'success') {
    const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${bgClass} border-0 position-fixed`;
    toast.style.cssText = 'top: 100px; right: 20px; z-index: 1055;';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast);
    });
}

// Mobile Filter Modal functionality
class MobileFilterModal {
    constructor() {
        this.modal = new bootstrap.Modal(document.getElementById('mobileFilterModal'));
        this.mobileLocationSelect = null;
        this.filters = {
            type: '',
            priceRange: '5000000',
            locations: [],
            bedrooms: '',
            bathrooms: '',
            age: '',
            furnished: '',
            minArea: '',
            maxArea: '',
            amenities: []
        };
        
        this.init();
    }
    
    init() {
        // Initialize mobile location multi-select
        this.initMobileLocationSelect();
        
        // Initialize mobile price range
        this.initMobilePriceRange();
        
        // Mobile filter button
        document.getElementById('mobileFilterBtn').addEventListener('click', () => {
            this.syncFiltersFromDesktop();
            this.modal.show();
        });
        
        // Apply mobile filters
        document.getElementById('applyMobileFilters').addEventListener('click', () => {
            this.applyFilters();
        });
        
        // Clear mobile filters
        document.getElementById('clearMobileFilters').addEventListener('click', () => {
            this.clearFilters();
        });
        
        // Track amenity changes
        const amenityCheckboxes = document.querySelectorAll('#mobileFilterModal .form-check-input');
        amenityCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateAmenities());
        });
    }
    
    initMobileLocationSelect() {
        const container = document.getElementById('mobileLocationSelect');
        if (!container) return;
        
        this.mobileLocationSelect = new MultiSelectLocation('#mobileLocationSelect');
        
        // Update the container reference for mobile
        this.mobileLocationSelect.tagsContainer = document.getElementById('mobileSelectedLocationTags');
    }
    
    initMobilePriceRange() {
        const priceRange = document.getElementById('mobilePriceRange');
        const priceValue = document.getElementById('mobilePriceValue');
        
        if (priceRange && priceValue) {
            priceRange.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                priceValue.textContent = `$${value.toLocaleString()}`;
                this.filters.priceRange = value;
            });
        }
    }
    
    syncFiltersFromDesktop() {
        // Sync property type
        const desktopType = document.getElementById('typeFilter').value;
        document.getElementById('mobileTypeFilter').value = desktopType;
        
        // Sync price range
        const desktopPrice = document.getElementById('priceRange').value;
        document.getElementById('mobilePriceRange').value = desktopPrice;
        document.getElementById('mobilePriceValue').textContent = `$${parseInt(desktopPrice).toLocaleString()}`;
        
        // Sync locations
        if (multiSelectLocation && this.mobileLocationSelect) {
            const selectedLocations = multiSelectLocation.getSelectedValues();
            // Clear mobile selections first
            this.mobileLocationSelect.clearAll();
            // Apply desktop selections to mobile
            selectedLocations.forEach(value => {
                const option = this.mobileLocationSelect.container.querySelector(`[data-value="${value}"]`);
                if (option) {
                    this.mobileLocationSelect.selectOption(option);
                }
            });
        }
    }
    
    applyFilters() {
        // Get all filter values
        this.filters.type = document.getElementById('mobileTypeFilter').value;
        this.filters.priceRange = document.getElementById('mobilePriceRange').value;
        this.filters.bedrooms = document.getElementById('mobileBedrooms').value;
        this.filters.bathrooms = document.getElementById('mobileBathrooms').value;
        this.filters.age = document.getElementById('mobileAge').value;
        this.filters.furnished = document.getElementById('mobileFurnished').value;
        this.filters.minArea = document.getElementById('mobileMinArea').value;
        this.filters.maxArea = document.getElementById('mobileMaxArea').value;
        
        if (this.mobileLocationSelect) {
            this.filters.locations = this.mobileLocationSelect.getSelectedValues();
        }
        
        // Show loading state
        const applyBtn = document.getElementById('applyMobileFilters');
        applyBtn.classList.add('btn-loading');
        applyBtn.textContent = 'Applying...';
        
        // Simulate filter application
        setTimeout(() => {
            applyBtn.classList.remove('btn-loading');
            applyBtn.textContent = 'Apply Filters';
            this.modal.hide();
            
            // Sync filters back to desktop
            this.syncFiltersToDesktop();
            
            // Show success message
            this.showFilterMessage('Mobile filters applied successfully!');
        }, 1000);
    }
    
    syncFiltersToDesktop() {
        // Sync to desktop filters
        document.getElementById('typeFilter').value = this.filters.type;
        document.getElementById('priceRange').value = this.filters.priceRange;
        document.getElementById('priceValue').textContent = `$${parseInt(this.filters.priceRange).toLocaleString()}`;
        
        // Sync locations to desktop
        if (multiSelectLocation && this.mobileLocationSelect) {
            multiSelectLocation.clearAll();
            this.filters.locations.forEach(value => {
                const option = multiSelectLocation.container.querySelector(`[data-value="${value}"]`);
                if (option) {
                    multiSelectLocation.selectOption(option);
                }
            });
        }
    }
    
    updateAmenities() {
        const checkboxes = document.querySelectorAll('#mobileFilterModal .form-check-input:checked');
        this.filters.amenities = Array.from(checkboxes).map(cb => cb.value);
    }
    
    clearFilters() {
        // Reset all form elements
        document.getElementById('mobileTypeFilter').value = '';
        document.getElementById('mobilePriceRange').value = '5000000';
        document.getElementById('mobilePriceValue').textContent = '$5,000,000';
        document.getElementById('mobileBedrooms').value = '';
        document.getElementById('mobileBathrooms').value = '';
        document.getElementById('mobileAge').value = '';
        document.getElementById('mobileFurnished').value = '';
        document.getElementById('mobileMinArea').value = '';
        document.getElementById('mobileMaxArea').value = '';
        
        // Clear mobile location selection
        if (this.mobileLocationSelect) {
            this.mobileLocationSelect.clearAll();
        }
        
        // Uncheck all amenities
        const amenityCheckboxes = document.querySelectorAll('#mobileFilterModal .form-check-input');
        amenityCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset filters object
        this.filters = {
            type: '',
            priceRange: '5000000',
            locations: [],
            bedrooms: '',
            bathrooms: '',
            age: '',
            furnished: '',
            minArea: '',
            maxArea: '',
            amenities: []
        };
        
        this.showFilterMessage('All mobile filters cleared!');
    }
    
    showFilterMessage(message) {
        showToastMessage(message, 'success');
    }
    
    getFilters() {
        return this.filters;
    }
}

// Initialize everything when DOM is loaded
let multiSelectLocation;
let advancedFilterModal;
let mobileFilterModal;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize multi-select location
    multiSelectLocation = new MultiSelectLocation('#customLocationSelect');
    
    // Initialize advanced filter modal
    advancedFilterModal = new AdvancedFilterModal();
    
    // Initialize mobile filter modal
    mobileFilterModal = new MobileFilterModal();
    
    // Initialize price range
    initPriceRange();
    
    // Apply filters button
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
    
    // Render featured properties if container exists
    if (document.getElementById('featuredProperties')) {
        renderFeaturedProperties();
    }
});

function renderFeaturedProperties() {
    const container = document.getElementById('featuredProperties');
    if (!container) return;
    
    featuredProperties.forEach(property => {
        const card = `
            <div class="col-md-4">
                <div class="property-card">
                    <img src="${property.image}" alt="${property.title}" class="property-image" loading="lazy">
                    <div class="property-body">
                        <h5 class="mb-2">${property.title}</h5>
                        <p class="text-muted mb-3"><i class="icon-map-pin"></i> ${property.location}</p>
                        <div class="property-price mb-3">${property.price}</div>
                        <div class="d-flex justify-content-between text-muted">
                            <span><i class="icon-bed"></i> ${property.beds} Beds</span>
                            <span><i class="icon-bath"></i> ${property.baths} Baths</span>
                            <span><i class="icon-maximize"></i> ${property.area}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}