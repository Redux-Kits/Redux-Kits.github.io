function findChunks() {
    const postContentDiv = document.querySelector(".post-content");
    if (!postContentDiv) return [];

    const postTitle = document.querySelector(".post-title");
    const postMeta = document.querySelector(".post-meta");

    const chunks = [];
    let currentChunk = [];

    if (postTitle) {
        currentChunk.push(postTitle.cloneNode(true));
    }
    if (postMeta) {
        currentChunk.push(postMeta.cloneNode(true));
    }

    Array.from(postContentDiv.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.startsWith("H") && node.textContent === "END_SECTION") {
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
                currentChunk = [];
            }
            node.remove();
        } else {
            if (!isCommentNode(node) && !isEmptyTextNode(node) && !hasClass(node, "gallery-print-exempt")) {
                currentChunk.push(node.cloneNode(true));
            }
        }
    });

    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }

    return chunks;
}

function isSVGNode(node) {
    if (node.tagName === "SVG" || node.querySelector("svg")) {
        return true;
    }
}

function cloneSVGElement(svgNode) {
    const actualSVG = svgNode.querySelector("svg");
    if (!actualSVG) return svgNode.cloneNode(true);
    return svgNode.cloneNode(true);
}

// Helper function to reflow the SVG
function reflowSVG(element) {
    // Force reflow for the current element
    element.offsetHeight;

    // Recursively reflow all child elements
    Array.from(element.children).forEach((child) => {
        reflowSVG(child);
    });
}

function isImageNode(node) {
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
            scrollContentDiv.classList.add("offscreen-hidden-container");
            galleryContentDiv.classList.add("offscreen-hidden-container");
            printContentDiv.classList.remove("offscreen-hidden-container");
            hideGalleryButtons();
            printAllPrintPageDivs();
            // printAllPages();
            break;
        case "gallery":
            scrollContentDiv.classList.add("offscreen-hidden-container");
            galleryContentDiv.classList.remove("offscreen-hidden-container");
            printContentDiv.classList.add("offscreen-hidden-container");
            showGalleryButtons();
            break;
        default: // scroll
            scrollContentDiv.classList.remove("offscreen-hidden-container");
            galleryContentDiv.classList.add("offscreen-hidden-container");
            printContentDiv.classList.add("offscreen-hidden-container");
            hideGalleryButtons();
            break;
    }
}

function showGalleryButtons() {
    const prevButton = document.getElementById("galleryPrevButton");
    const nextButton = document.getElementById("galleryNextButton");

    if (prevButton) prevButton.style.display = "inline-block";
    if (nextButton) nextButton.style.display = "inline-block";
}

function hideGalleryButtons() {
    const prevButton = document.getElementById("galleryPrevButton");
    const nextButton = document.getElementById("galleryNextButton");

    if (prevButton) prevButton.style.display = "none";
    if (nextButton) nextButton.style.display = "none";
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
    prevButton.style.bottom = `${windowHeight / 2}px`;
    prevButton.style.left = "10px";
    prevButton.style.zIndex = "1000";

    nextButton.style.position = "fixed";
    nextButton.style.bottom = `${windowHeight / 2}px`;
    nextButton.style.right = "10px";
    nextButton.style.zIndex = "1000";
}

function galleryNext() {
    slides[slidePointer].removeTempElements();
    slidePointer += 1;
    slidePointer = Math.min(slides.length - 1, slidePointer);
    // console.log(slides[slidePointer]);
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
        container.style.width = "100%";
        container.style.height = "100%";
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

function findDuplicateIds() {
    const allElements = document.getElementsByTagName("*");
    const idMap = new Map();
    const duplicates = new Set();

    for (let element of allElements) {
        const id = element.id;
        if (id) {
            if (idMap.has(id)) {
                duplicates.add(id);
            } else {
                idMap.set(id, element);
            }
        }
    }

    return Array.from(duplicates);
}