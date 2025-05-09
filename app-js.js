// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab navigation
    initTabs();
    
    // Initialize canvas preview
    const canvasPreview = document.getElementById('canvasPreview');
    const renderer = new CanvasRenderer(canvasPreview);
    
    // Initialize form inputs and canvas updates
    initFormInputs(renderer);
    
    // Initialize storage functionality
    const storage = new CanvasStorage(renderer);
    
    // Initialize export functionality
    const exporter = new CanvasExporter(canvasPreview);
    
    // Initialize template loading
    initTemplateLoader(renderer);
    
    // Set up event listeners for actions
    document.getElementById('saveBtn').addEventListener('click', () => {
        storage.saveDraft();
    });
    
    document.getElementById('loadBtn').addEventListener('click', () => {
        storage.loadDraft();
    });
    
    document.getElementById('exportBtn').addEventListener('click', () => {
        exporter.exportToPDF();
    });
    
    // Function to initialize tab navigation
    function initTabs() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panes
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding pane
                tab.classList.add('active');
                const section = tab.getAttribute('data-section');
                document.getElementById(`${section}-section`).classList.add('active');
            });
        });
    }
    
    // Function to initialize form inputs
    function initFormInputs(renderer) {
        // Set up event listeners for all form inputs to update canvas
        document.getElementById('project-title').addEventListener('input', (e) => {
            renderer.updateSection('title', e.target.value);
        });
        
        document.getElementById('data-content').addEventListener('input', (e) => {
            renderer.updateSection('data', e.target.value);
        });
        
        document.getElementById('skills-content').addEventListener('input', (e) => {
            renderer.updateSection('skills', e.target.value);
        });
        
        document.getElementById('value-content').addEventListener('input', (e) => {
            renderer.updateSection('valueProposition', e.target.value);
        });
        
        document.getElementById('integration-content').addEventListener('input', (e) => {
            renderer.updateSection('integration', e.target.value);
        });
        
        document.getElementById('customers-content').addEventListener('input', (e) => {
            renderer.updateSection('customers', e.target.value);
        });
        
        document.getElementById('output-content').addEventListener('input', (e) => {
            renderer.updateSection('output', e.target.value);
        });
        
        document.getElementById('stakeholders-content').addEventListener('input', (e) => {
            renderer.updateSection('stakeholders', e.target.value);
        });
        
        document.getElementById('cost-content').addEventListener('input', (e) => {
            renderer.updateSection('cost', e.target.value);
        });
        
        document.getElementById('revenue-content').addEventListener('input', (e) => {
            renderer.updateSection('revenue', e.target.value);
        });
    }
    
    // Function to initialize template loading
    function initTemplateLoader(renderer) {
        document.getElementById('templateSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                if (e.target.value === 'blank') {
                    // Load blank template
                    const blankTemplate = {
                        title: '',
                        data: '',
                        skills: '',
                        valueProposition: '',
                        integration: '',
                        customers: '',
                        output: '',
                        stakeholders: '',
                        cost: '',
                        revenue: ''
                    };
                    loadTemplateIntoForm(blankTemplate, renderer);
                } else {
                    // Load template from JSON file
                    fetch(`templates/${e.target.value}.json`)
                        .then(response => response.json())
                        .then(data => {
                            loadTemplateIntoForm(data, renderer);
                        })
                        .catch(error => {
                            console.error('Error loading template:', error);
                            showNotification('Error loading template. Please try again.', 'error');
                        });
                }
            }
        });
    }
    
    // Function to load template data into form fields
    function loadTemplateIntoForm(data, renderer) {
        // Update form inputs to match template
        document.getElementById('project-title').value = data.title || '';
        document.getElementById('data-content').value = data.data || '';
        document.getElementById('skills-content').value = data.skills || '';
        document.getElementById('value-content').value = data.valueProposition || '';
        document.getElementById('integration-content').value = data.integration || '';
        document.getElementById('customers-content').value = data.customers || '';
        document.getElementById('output-content').value = data.output || '';
        document.getElementById('stakeholders-content').value = data.stakeholders || '';
        document.getElementById('cost-content').value = data.cost || '';
        document.getElementById('revenue-content').value = data.revenue || '';
        
        // Update canvas with template data
        renderer.loadTemplate(data);
        
        // Show success notification
        showNotification('Template loaded successfully!');
    }
    
    // Function to show notification
    window.showNotification = function(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style based on type
        if (type === 'error') {
            notification.style.backgroundColor = '#f44336';
        } else {
            notification.style.backgroundColor = '#4CAF50';
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            
            // Remove from DOM after fade out
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    };
});