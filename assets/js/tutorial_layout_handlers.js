function findChunks() {
    // Find the div with class 'post_content'
    const postContentDiv = document.querySelector(".post-content");
    if (!postContentDiv) return []; // If the div is not found, return an empty array

    // Find the post title and post meta elements
    const postTitle = document.querySelector(".post-title");
    const postMeta = document.querySelector(".post-meta");

    // Initialize an array to hold the chunks
    const chunks = [];
    let currentChunk = [];

    // Add post title and post meta to the first chunk if they exist
    if (postTitle) {
        currentChunk.push(postTitle.cloneNode(true));
    }
    if (postMeta) {
        currentChunk.push(postMeta.cloneNode(true));
    }

    // Iterate over the child nodes of the postContentDiv
    Array.from(postContentDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.startsWith("H") && node.textContent === "END_SECTION") {
            // If the node is an h element with text 'END_SECTION'
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
                currentChunk = [];
            }
            // Remove the h element
            node.remove();
        } else {
            // Skip comment nodes, empty text nodes, and nodes with class 'gallery-print-exempt'
            if (!isCommentNode(node) && !isEmptyTextNode(node) && !hasClass(node, "gallery-print-exempt")) {
                // Add the node to the current chunk
                currentChunk.push(node.cloneNode(true));
            }
        }
    });

    // Add any remaining nodes to the chunks array
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    return chunks;
}

function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}

function hasClass(node, className) {
    return node.nodeType === Node.ELEMENT_NODE && node.classList.contains(className);
}

function isEmptyTextNode(node) {
    return node.nodeType === Node.TEXT_NODE && !/\S/.test(node.textContent);
}

function onViewSelectDropdownChange() {
    const dropdown = document.getElementById("viewDropdown");
    const selectedValue = dropdown.value;
    console.log("Selected value:", selectedValue);
    const scrollContentDiv = document.querySelector(".post-content");
    const galleryContentDiv = document.querySelector(".gallery-content");
    const printContentDiv = document.querySelector(".print-content");

    switch (selectedValue) {
        case "print":
            scrollContentDiv.hidden = true;
            galleryContentDiv.hidden = true;
            printContentDiv.hidden = false;
            break;
        case "gallery":
            scrollContentDiv.hidden = true;
            galleryContentDiv.hidden = false;
            printContentDiv.hidden = true;
            break;
        default: // scroll
            scrollContentDiv.hidden = false;
            galleryContentDiv.hidden = true;
            printContentDiv.hidden = true;
            break;
    }
}

function setupGalleryDims() {
    const galleryContent = document.querySelector(".gallery-content");
    const prevButton = document.getElementById("galleryPrevButton");
    const nextButton = document.getElementById("galleryNextButton");
    const windowHeight = window.innerHeight;
    const availableHeight = windowHeight * 0.95;

    galleryContent.style.height = `${availableHeight}px`;

    // Position the buttons
    prevButton.style.position = "fixed";
    prevButton.style.bottom = `${windowHeight/2}px`;
    prevButton.style.left = "10px";

    nextButton.style.position = "fixed";
    nextButton.style.bottom = `${windowHeight/2}px`;
    nextButton.style.right = "10px";
}

function galleryNext() {
    slides[slidePointer].removeTempElements();
    slidePointer += 1;
    slidePointer = Math.min(slides.length - 1, slidePointer);
    console.log(slides[slidePointer]);
    drawSlide();
}

function galleryPrev() {
    slides[slidePointer].removeTempElements();
    slidePointer -= 1;
    slidePointer = Math.max(slidePointer, 0);
    console.log(slides[slidePointer]);
    drawSlide();
}

function drawSlide() {
    const gallery = document.querySelector(".gallery-content");
    var container = gallery.querySelector(".gallery-container");
    if (!container) {
        container = document.createElement("div");
        container.classList.add("gallery-container");
        container.style.width='100%'
        container.style.height='100%'
        gallery.appendChild(container);
    } else {
        container.innerHTML = "";
    }
    const slide = slides[slidePointer];
    switch (slide.type) {
        case "title":
            slide.createTitlePage(container);
            break;
        case "bom":
            slide.createBOM(container);
            break;
        case "step":
            slide.createStep(container);
            break;
        default:
            break;
    }
}

function buildGallery(chunks) {
    setupGalleryDims();
    const gallery = document.querySelector(".gallery-content");
    slides = chunks.map((chunk, index) => {
        const slide = new Slide("step"); // You can set the type based on your logic
        chunk.forEach((node) => slide.categorizeNode(node));
        return slide;
    });
    slides[0].type = "title";
    drawSlide();
}
