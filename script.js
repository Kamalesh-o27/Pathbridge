// PathBridge – script.js
// Global search and utility functions for PathBridge

/**
 * Initialize search functionality for any page
 * @param {string} searchInputId - ID of the search input element
 * @param {string} itemsContainerId - ID of the container with items to search
 * @param {string} itemSelector - CSS selector for individual items
 * @param {Array<string>} searchableFields - Data attributes to search within
 */
function initializeSearch(searchInputId, itemsContainerId, itemSelector, searchableFields = ['search-text']) {
    const searchInput = document.getElementById(searchInputId);
    const itemsContainer = document.getElementById(itemsContainerId);
    
    if (!searchInput || !itemsContainer) {
        console.warn('Search elements not found:', { searchInputId, itemsContainerId });
        return;
    }

    function filterItems() {
        const query = searchInput.value.trim().toLowerCase();
        const items = itemsContainer.querySelectorAll(itemSelector);
        let visibleCount = 0;

        items.forEach(item => {
            const text = searchableFields
                .map(field => item.getAttribute(`data-${field}`) || item.textContent)
                .join(' ')
                .toLowerCase();

            if (query === '' || text.includes(query)) {
                item.style.display = '';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        const noResults = itemsContainer.querySelector('.no-results-message');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? '' : 'none';
        }
    }

    searchInput.addEventListener('input', filterItems);
    searchInput.addEventListener('change', filterItems);
}

/**
 * Search scholarships by name, focus area, or link
 */
function initScholarshipSearch() {
    const searchInput = document.getElementById('scholarshipSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const rows = document.querySelectorAll('table tr');
        let visibleRows = 0;

        rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row
            
            const text = row.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                row.style.display = '';
                visibleRows++;
            } else {
                row.style.display = 'none';
            }
        });

        // Show message if no results
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = visibleRows === 0 ? 'block' : 'none';
        }
    });
}

/**
 * Advanced career search with category and keyword filtering
 */
function initAdvancedCareerSearch() {
    const searchInput = document.getElementById('advancedCareerSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!searchInput || !categoryFilter) return;

    function filterCareers() {
        const query = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const careers = document.querySelectorAll('[data-career]');
        
        careers.forEach(career => {
            const title = career.getAttribute('data-career').toLowerCase();
            const careerCategory = career.getAttribute('data-category');
            const keywords = career.getAttribute('data-keywords')?.toLowerCase() || '';
            
            const matchesQuery = query === '' || title.includes(query) || keywords.includes(query);
            const matchesCategory = category === 'all' || careerCategory === category;
            
            career.style.display = matchesQuery && matchesCategory ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterCareers);
    categoryFilter.addEventListener('change', filterCareers);
}

/**
 * Generate quiz result from form data
 */
function generateAdvancedResult() {
    let userData = {
        interest:    document.getElementById("interest")?.value    || "tech",
        environment: document.getElementById("environment")?.value || "office",
        risk:        document.getElementById("risk")?.value        || "stable",
        study:       document.getElementById("study")?.value       || "3-4",
        govt:        document.getElementById("govt")?.value        || "no"
    };
    localStorage.setItem("careerData", JSON.stringify(userData));
    window.location.href = "result.html";
}

/**
 * Initialize all search functionality on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scholarship search if on scholarships page
    if (document.getElementById('scholarshipSearch')) {
        initScholarshipSearch();
    }
    
    // Initialize advanced career search if available
    if (document.getElementById('advancedCareerSearch')) {
        initAdvancedCareerSearch();
    }
});

/**
 * Debounce search input for performance
 */
function debounceSearch(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
