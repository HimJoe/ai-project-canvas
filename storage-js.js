// Local storage functionality
class CanvasStorage {
    constructor(renderer) {
        this.renderer = renderer;
        this.storageKey = 'ai-project-canvas-draft';
    }
    
    // Save current canvas state to localStorage
    saveDraft() {
        try {
            const canvasData = this.renderer.getCanvasData();
            localStorage.setItem(this.storageKey, JSON.stringify(canvasData));
            
            // Show success notification
            window.showNotification('Draft saved successfully!');
        } catch (error) {
            console.error('Error saving draft:', error);
            window.showNotification('Error saving draft. Please try again.', 'error');
        }
    }
    
    // Load canvas state from localStorage
    loadDraft() {
        try {
            const savedData = localStorage.getItem(this.storageKey);
            
            if (savedData) {
                const canvasData = JSON.parse(savedData);
                this.renderer.loadTemplate(canvasData);
                
                // Update form inputs
                document.getElementById('project-title').value = canvasData.title || '';
                document.getElementById('data-content').value = canvasData.data || '';
                document.getElementById('skills-content').value = canvasData.skills || '';
                document.getElementById('value-content').value = canvasData.valueProposition || '';
                document.getElementById('integration-content').value = canvasData.integration || '';
                document.getElementById('customers-content').value = canvasData.customers || '';
                document.getElementById('output-content').value = canvasData.output || '';
                document.getElementById('stakeholders-content').value = canvasData.stakeholders || '';
                document.getElementById('cost-content').value = canvasData.cost || '';
                document.getElementById('revenue-content').value = canvasData.revenue || '';
                
                // Show success notification
                window.showNotification('Draft loaded successfully!');
            } else {
                window.showNotification('No saved draft found.', 'error');
            }
        } catch (error) {
            console.error('Error loading draft:', error);
            window.showNotification('Error loading draft. The saved data may be corrupted.', 'error');
        }
    }
}