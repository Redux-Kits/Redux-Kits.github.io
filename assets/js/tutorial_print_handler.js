const maxPageHeight = 297 * 3.77953 - 40; // Convert mm to px and subtract margins
var combinedHTML = "";

function generatePrintView(chunks) {
    const printContentDiv = document.querySelector(".print-content");
    printContentDiv.innerHTML = ""; // Clear existing content
    const pageDivs = [];

    chunks.forEach((chunk) => {
        const pageDiv = document.createElement("div");
        pageDiv.classList.add("print-page");

        chunk.forEach((node) => {
            node.style.display = "block";

            // Wrap images and SVGs in a full-width div
            if (isImageryElement(node)) {
                const wrapperDiv = document.createElement("div");
                wrapperDiv.classList.add("image-wrapper-div");
                // node.style.display = "inline-block";

                wrapperDiv.appendChild(node);
                if (wrapperDiv.querySelector("p")) {
                    wrapperDiv.querySelectorAll("p").forEach((p) => {
                        p.style.textAlign = "left";
                    });
                }

                pageDiv.appendChild(wrapperDiv);
            } else {
                pageDiv.appendChild(node);
            }
        });

        pageDivs.push(pageDiv);
    });
    pageDivs.forEach((pageDiv) => {
        convertSVGsToImages(pageDiv);
        setFlexColumn("complete-graphics-showcase", pageDiv);
    });

    pageDivs.forEach((pageDiv) => {
        printContentDiv.appendChild(pageDiv);
    });
}

function isImageryElement(el) {
    return el.tagName === "IMG" || el.tagName === "SVG" || el.querySelector("svg") || el.querySelector("img");
}

function isScalableElement(el) {
    // console.log(el.tagName, el.querySelector("img"))
    return (
        el.tagName === "IMG" ||
        el.tagName === "SVG" ||
        el.tagName === "TABLE" ||
        el.querySelector("svg") ||
        el.querySelector("img")
    );
}

function setFlexColumn(className, div) {
    // Select the element with the specified class name
    div.querySelectorAll("." + className).forEach((element) => {
        element.style.display = "flex";
        element.style.flexDirection = "column";
        element.querySelectorAll(".generated-div-with-svg-element").forEach((e) => {
            e.style.width = "100%";
            e.style.textAlign = "center";
        });
    });
}

function setFullWidthRecursively(className) {
    // Get all elements with the specified class name
    var elements = document.querySelectorAll("." + className);

    // Function to set width recursively
    function setWidth(element) {
        // Skip SVG elements
        if (element.tagName.toLowerCase() === "svg") {
            return;
        }

        // Set the width to 100%
        element.style.width = "100%";

        // Recursively apply to child elements
        Array.from(element.children).forEach(function (child) {
            setWidth(child);
        });
    }

    // Apply the function to each element with the specified class
    elements.forEach(function (element) {
        setWidth(element);
    });
}

function convertSVGsToImages(parentElement) {
    setFullWidthRecursively("image-wrapper-div");
    var svgs = parentElement.querySelectorAll("svg");
    svgs.forEach(function (svg) {
        var svgData = new XMLSerializer().serializeToString(svg);
        var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        var url = URL.createObjectURL(svgBlob);

        var img = new Image();
        img.src = url;
        // Replace SVG with the image
        svg.parentNode.style.width = "100%";
        svg.parentNode.parentNode.style.width = "100%";
        svg.parentNode.replaceChild(img, svg);
    });
}

function combineForPrinting() {
    var printDivs = document.querySelectorAll(".print-page");
    combinedHTML = "";

    printDivs.forEach(function (div) {
        combinedHTML += div.outerHTML;
    });
}

function ensureImagesLoaded(callback) {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    if (images.length === 0) {
        callback(); // No images to load
    }

    images.forEach((img) => {
        if (img.complete) {
            loadedCount++;
            if (loadedCount === images.length) {
                callback(); // All images are loaded
            }
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    callback(); // All images are loaded
                }
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    callback(); // All images are loaded (some might have failed to load)
                }
            });
        }
    });
}

function printAllPrintPageDivs() {
    combineForPrinting();
    console.log(combinedHTML);

    ensureImagesLoaded(function() {
        var pageTitle = document.title
            .replace(/\|/g, '')          // Remove all instances of |
            .replace(/\s\s+/g, ' ')       // Replace multiple spaces with a single space
            .trim();
        
        html2pdf().from(combinedHTML).set({
            margin: 1,
            filename: `${pageTitle}_Build_Guide.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save().then(function() {
            alert('PDF Generated');
        });
    });
}

    // printJS({
    //     printable: combinedHTML,
    //     type: "raw-html",
    //     style: `
    //         @page {
    //             margin: 20mm;
    //             size: auto;
    //             @bottom-left {
    //                 content: "";
    //             }
    //              @bottom-right { 
    //                 content: "";
    //             }
    //         }
    //         body {
    //             font-family: Arial, sans-serif;
    //             font-size: 14px;
    //         }
    //         .print-page {
    //             page-break-after: always;
    //         }
    //         .complete-graphics-showcase {
    //             width: 100%;
    //         }

    //         .tutorial-step-graphic {
    //             max-width: 100%;
    //             text-align: center;
    //         }
    //         table {
    //             width: 100%;
    //             border-collapse: collapse; /* Ensure borders are collapsed */
    //         }
    //         th,
    //         td {
    //             border: 1px solid black; /* Apply border to table cells */
    //             padding: 8px; /* Optional: Add some padding for better readability */
    //         }
    //         img {
    //             max-width: 50%;
    //         }
    //         .custom-checkbox {
    //             position: relative;
    //             display: inline-block;
    //             width: 30px; // Adjust the size as needed
    //             height: 30px; // Adjust the size as needed
    //             background-color: #ffffff;
    //             border: 2px solid #000000;
    //         }
    //         input {
    //             opacity: 0;
    //             width: 0;
    //             height: 0;
    //         }

    //     `,
    //     documentTitle: "CustomFileName", // Set a custom file name here
    //     scanStyles: false,
    //     showModal: true, // Optional: Show a modal while the PDF is being generated
    // });
// }
