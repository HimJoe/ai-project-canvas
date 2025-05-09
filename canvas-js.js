// Canvas rendering functionality
class CanvasRenderer {
    constructor(previewElement) {
        this.previewElement = previewElement;
        this.canvasData = {
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
        
        // Initialize with empty canvas
        this.renderCanvas();
    }
    
    // Update canvas data and refresh the preview
    updateSection(section, content) {
        this.canvasData[section] = content;
        this.renderCanvas();
    }
    
    // Get complete canvas data
    getCanvasData() {
        return {...this.canvasData};
    }
    
    // Render the entire canvas based on current data
    renderCanvas() {
        const html = this.generateCanvasHTML();
        this.previewElement.innerHTML = html;
    }
    
    // Generate HTML structure for the canvas
    generateCanvasHTML() {
        return `
            <div class="canvas-container">
                <div class="title-section">
                    <h1 class="canvas-title">AI Project Canvas</h1>
                    <div class="project-title">${this.canvasData.title || 'Project Title'}</div>
                </div>
                
                <!-- Row 1 -->
                <div class="row">
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Data</h2>
                            <div class="icon">≡</div>
                        </div>
                        <p class="prompt">Which data do you need?</p>
                        <div class="content">${this.formatContent(this.canvasData.data)}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Skills</h2>
                            <div class="icon">🔑</div>
                        </div>
                        <p class="prompt">Which skills do you need for development?</p>
                        <div class="content">${this.formatContent(this.canvasData.skills)}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Value Proposition</h2>
                            <div class="icon">🏆</div>
                        </div>
                        <p class="prompt">What is the value added by your project?</p>
                        <div class="content">${this.formatContent(this.canvasData.valueProposition)}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Integration</h2>
                            <div class="icon">⊕</div>
                        </div>
                        <p class="prompt">How will the project be integrated?</p>
                        <div class="content">${this.formatContent(this.canvasData.integration)}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Customers</h2>
                            <div class="icon">👤</div>
                        </div>
                        <p class="prompt">Who are the end customers?</p>
                        <div class="content">${this.formatContent(this.canvasData.customers)}</div>
                    </div>
                </div>
                
                <!-- Row 2 -->
                <div class="row">
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Output</h2>
                            <div class="icon">🎯</div>
                        </div>
                        <p class="prompt">Which key metric are you optimizing for?</p>
                        <div class="content">${this.formatContent(this.canvasData.output)}</div>
                    </div>
                    <div class="cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Stakeholders</h2>
                            <div class="icon">👥</div>
                        </div>
                        <p class="prompt">Who are the key stakeholders?</p>
                        <div class="content">${this.formatContent(this.canvasData.stakeholders)}</div>
                    </div>
                </div>
                
                <!-- Row 3 -->
                <div class="row">
                    <div class="cell long-cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Cost</h2>
                            <div class="icon">💰</div>
                        </div>
                        <p class="prompt">What costs will the project incur?</p>
                        <div class="content">${this.formatContent(this.canvasData.cost)}</div>
                    </div>
                    <div class="cell long-cell">
                        <div class="cell-header">
                            <h2 class="cell-title">Revenue</h2>
                            <div class="icon">📈</div>
                        </div>
                        <p class="prompt">How will the project generate revenue/savings?</p>
                        <div class="content">${this.formatContent(this.canvasData.revenue)}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Format content as HTML (convert plain text to formatted HTML)
    formatContent(content) {
        if (!content) return '<p class="placeholder">No content yet...</p>';
        
        // Convert bullet points (lines starting with • or -) into lists
        if (content.includes('•') || content.includes('- ')) {
            const lines = content.split('\n');
            let html = '<ul>';
            let inList = false;
            let inSubList = false;
            
            lines.forEach(line => {
                line = line.trim();
                if (!line) return; // Skip empty lines
                
                // Check if line is indented (for sub-lists)
                const isIndented = line.startsWith('  ') || line.startsWith('\t');
                
                if ((line.startsWith('•') || line.startsWith('-')) && !isIndented) {
                    // Main list item
                    if (inSubList) {
                        html += '</ul></li>';
                        inSubList = false;
                    }
                    
                    if (!inList) {
                        inList = true;
                        if (html !== '<ul>') {
                            html += '<ul>';
                        }
                    }
                    
                    html += `<li>${line.substring(1).trim()}`;
                    
                    // Check if next line is indented to keep list item open
                    const nextLineIndented = lines.indexOf(line) < lines.length - 1 && 
                                            (lines[lines.indexOf(line) + 1].startsWith('  ') || 
                                             lines[lines.indexOf(line) + 1].startsWith('\t'));
                    
                    if (!nextLineIndented) {
                        html += '</li>';
                    }
                } else if ((line.startsWith('•') || line.startsWith('-') || isIndented) && inList) {
                    // Sub-list item or continuation
                    const trimmedLine = line.trimStart();
                    const startsWithBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-');
                    
                    if (isIndented && startsWithBullet) {
                        // This is a sub-list item
                        if (!inSubList) {
                            html += '<ul>';
                            inSubList = true;
                        }
                        html += `<li>${trimmedLine.substring(1).trim()}</li>`;
                    } else if (isIndented) {
                        // This is a continuation of the previous list item
                        html += ' ' + trimmedLine;
                    }
                } else {
                    // Regular paragraph
                    if (inSubList) {
                        html += '</ul></li>';
                        inSubList = false;
                    }
                    
                    if (inList) {
                        inList = false;
                        html += '</ul>';
                    }
                    
                    html += `<p>${line}</p>`;
                }
            });
            
            // Close any open lists
            if (inSubList) {
                html += '</ul></li>';
            }
            
            if (inList) {
                html += '</ul>';
            }
            
            if (html === '<ul></ul>') {
                return '<p class="placeholder">No content yet...</p>';
            }
            
            return html;
        }
        
        // Simple paragraph formatting for non-list content
        return `<p>${content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
    }
    
    // Load a complete template
    loadTemplate(templateData) {
        this.canvasData = {...templateData};
        this.renderCanvas();
    }
}