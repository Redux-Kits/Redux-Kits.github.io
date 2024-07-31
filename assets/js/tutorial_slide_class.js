class Slide {
    constructor(type) {
        this.type = type; // Type of the slide, e.g., 'step', 'BOM', 'title slide', etc.
        this.images = []; // Array to hold nodes that contain images
        this.heading = null; // Array to hold heading elements (h1, h2, h3, h4, h5)
        this.tutorial_bom_references = null; // Will hold the BOM reference node if it exists
        this.content = []; // Array to hold all other uncategorized nodes
        this.bomTable = null; // Property to hold the BOM table if it exists
        this.tempElements = [];
    }

    // Method to add a node to the appropriate category
    categorizeNode(node) {
        if (this.isBomTableNode(node)) {
            this.bomTable = node;
            this.type = "bom"; // Set the type to 'bom'
        } else if (this.isImageNode(node)) {
            this.images.push(node);
        } else if (this.isHeadingNode(node)) {
            if (!this.heading) {
                this.heading = node;
            } else {
                this.content.push(node);
            }
        } else if (this.isBomReferenceNode(node)) {
            this.tutorial_bom_references = node;
        } else {
            this.content.push(node);
        }
    }

    // Check if the node contains an image
    isImageNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === "IMG") {
                return true;
            }
            // Check if any descendant nodes are images
            if (node.querySelector("img")) {
                return true;
            }
            // Check if the node is an SVG or contains an SVG
            if (node.tagName === "SVG" || node.querySelector("svg")) {
                return true;
            }
        }
        return false;
    }

    // Check if the node is a heading
    isHeadingNode(node) {
        return node.nodeType === Node.ELEMENT_NODE && /^H[1-5]$/.test(node.tagName);
    }

    // Check if the node is a BOM reference
    isBomReferenceNode(node) {
        return node.nodeType === Node.ELEMENT_NODE && node.classList.contains("tutorial-bom-references-container");
    }

    // Check if the node is a BOM table
    isBomTableNode(node) {
        return node.nodeType === Node.ELEMENT_NODE && node.classList.contains("bom-table");
    }

    createTempElement(type) {
        const elem = document.createElement(type);
        this.tempElements.push(elem);
        return elem;
    }

    removeTempElements() {
        for (let elem of this.tempElements) {
            elem.remove();
        }
        this.tempElements = [];
    }

    reflowSVG(element) {
        // Force reflow for the current element
        element.offsetHeight;
    
        // Recursively reflow all child elements
        Array.from(element.children).forEach(child => {
            reflowSVG(child);
        });
    }

    createTitlePage(container) {
        const all_content = this.createTempElement("div");
        all_content.classList.add("flex-vert-container");
        const first_row_content = this.createTempElement("div");
        first_row_content.appendChild(this.heading);
        first_row_content.appendChild(this.content[0]);

        const second_row_content = this.createTempElement("div");
        second_row_content.classList.add("flex-row-container");
        second_row_content.style.width = "100%";
        const imageContainer = this.createTempElement("div");
        imageContainer.style.width = "50%";
        for (let i of this.images) {
            imageContainer.appendChild(i);
        }
        const textContainer = this.createTempElement("div");
        textContainer.style.width = "50%";
        for (let i = 1; i < this.content.length; i++) {
            textContainer.appendChild(this.content[i]);
        }
        second_row_content.appendChild(imageContainer);
        second_row_content.appendChild(textContainer);

        all_content.appendChild(first_row_content);
        all_content.appendChild(second_row_content);
        all_content.appendChild(this.createTempElement("div"));

        container.appendChild(all_content);
        this.wrapText(container);
    }

    createBOM(container) {
        const all_content = this.createTempElement("div");
        all_content.classList.add("flex-vert-container");
        const first_row_content = this.createTempElement("div");
        first_row_content.appendChild(this.heading);

        const second_row_content = this.createTempElement("div");
        second_row_content.classList.add("flex-row-container");
        second_row_content.style.width = "100%";
        second_row_content.appendChild(this.bomTable);
        this.bomTable.style.margin='2px';

        all_content.appendChild(first_row_content);
        all_content.appendChild(second_row_content);
        all_content.appendChild(this.createTempElement("div"));

        container.appendChild(all_content);
        this.wrapText(container);
    }

    wrapText(elem) {
        const spans = elem.querySelectorAll('span.component-text');
        spans.forEach(span => {
            span.addEventListener('mouseover', showTooltip);
            span.addEventListener('mouseout', hideTooltip);
        });
    }

    createStep(container) {
        const all_content = this.createTempElement("div");
        all_content.classList.add("flex-vert-container");
        const first_row_content = this.createTempElement("div");
        first_row_content.appendChild(this.heading);
        
        const second_row_content = this.createTempElement("div");
        second_row_content.classList.add("flex-row-container");
        second_row_content.style.width = "100%";
        const imageContainer = this.createTempElement("div");
        imageContainer.style.width = "50%";
        for (let i of this.images) {
            imageContainer.appendChild(i);
        }
        const textContainer = this.createTempElement("div");
        textContainer.style.width = "50%";
        for (let i = 0; i < this.content.length; i++) {
            textContainer.appendChild(this.content[i]);
        }
        if (this.tutorial_bom_references){
            textContainer.appendChild(this.tutorial_bom_references);
            this.tutorial_bom_references.style.margin='2px';
            this.tutorial_bom_references.style.display = 'block';
        }
        second_row_content.appendChild(imageContainer);
        second_row_content.appendChild(textContainer);

        all_content.appendChild(first_row_content);
        all_content.appendChild(second_row_content);
        all_content.appendChild(this.createTempElement("div"));

        container.appendChild(all_content);
        this.wrapText(container);
    }
}
