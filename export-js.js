// PDF export functionality
class CanvasExporter {
    constructor(canvasElement) {
        this.canvasElement = canvasElement;
    }
    
    // Export the canvas to PDF
    exportToPDF() {
        // Show loading message
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'notification';
        loadingMsg.textContent = 'Generating PDF...';
        loadingMsg.style.backgroundColor = '#2196F3';
        document.body.appendChild(loadingMsg);
        
        // Use setTimeout to allow the loading message to render
        setTimeout(() => {
            // Use html2canvas to capture the canvas as an image
            html2canvas(this.canvasElement.querySelector('.canvas-container'), {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                allowTaint: true,
                logging: false
            })
                .then(canvas => {
                    try {
                        const imgData = canvas.toDataURL('image/png');
                        const { jsPDF } = window.jspdf;
                        
                        // Create PDF in landscape orientation
                        const pdf = new jsPDF({
                            orientation: 'landscape',
                            unit: 'mm',
                            format: 'a4'
                        });
                        
                        const width = pdf.internal.pageSize.getWidth();
                        const height = pdf.internal.pageSize.getHeight();
                        
                        // Calculate aspect ratio to fit the canvas properly
                        const canvasAspectRatio = canvas.width / canvas.height;
                        const pageAspectRatio = width / height;
                        
                        let printWidth, printHeight;
                        
                        if (canvasAspectRatio > pageAspectRatio) {
                            // Canvas is wider than page
                            printWidth = width;
                            printHeight = width / canvasAspectRatio;
                        } else {
                            // Canvas is taller than page
                            printHeight = height;
                            printWidth = height * canvasAspectRatio;
                        }
                        
                        // Center the image on the page
                        const x = (width - printWidth) / 2;
                        const y = (height - printHeight) / 2;
                        
                        pdf.addImage(imgData, 'PNG', x, y, printWidth, printHeight);
                        
                        // Get project title or use default
                        const title = document.getElementById('project-title').value || 'AI-Project-Canvas';
                        const safeTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
                        
                        pdf.save(`${safeTitle}.pdf`);
                        
                        // Remove loading message and show success
                        document.body.removeChild(loadingMsg);
                        window.showNotification('PDF exported successfully!');
                    } catch (error) {
                        console.error('Error generating PDF:', error);
                        document.body.removeChild(loadingMsg);
                        window.showNotification('Error generating PDF. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error capturing canvas:', error);
                    document.body.removeChild(loadingMsg);
                    window.showNotification('Error generating PDF. Please try again.', 'error');
                });
        }, 100);
    }
    
    // Export as PNG image
    exportToPNG() {
        html2canvas(this.canvasElement.querySelector('.canvas-container'), {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            allowTaint: true
        })
            .then(canvas => {
                const link = document.createElement('a');
                
                // Get project title or use default
                const title = document.getElementById('project-title').value || 'AI-Project-Canvas';
                const safeTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
                
                link.download = `${safeTitle}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                window.showNotification('Image exported successfully!');
            })
            .catch(error => {
                console.error('Error generating PNG:', error);
                window.showNotification('Error generating image. Please try again.', 'error');
            });
    }
}