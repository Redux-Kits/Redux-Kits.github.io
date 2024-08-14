const maxPageHeight = 297 * 3.77953 - 40; // Convert mm to px and subtract margins

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
                        p.style.textAlign = "center";
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
        element.querySelectorAll(".generated-div-with-svg-element").forEach((e)=>{
            e.style.width = '100%';
            e.style.textAlign = 'center';
        })
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
        console.log(svg.parentNode);
        console.log(svg.parentNode.parentNode);
        svg.parentNode.replaceChild(img, svg);
    });
}

function printAllPrintPageDivs() {
    if (typeof printJS === "undefined") {
        console.error("Print.js is not loaded.");
        return;
    }

    var printDivs = document.querySelectorAll(".print-page");
    var combinedHTML = "";

    printDivs.forEach(function (div) {
        // Convert SVGs to images
        // convertSVGsToImages(div);

        // Add the outerHTML to the combinedHTML string
        combinedHTML += div.outerHTML;
    });

    // Use printJS to print the combined HTML as a PDF
    printJS({
        printable: combinedHTML,
        type: "raw-html",
        style: `
            @page { margin: 20mm; }
            body { font-family: Arial, sans-serif; font-size: 14px;}
            .print-page { page-break-after: always; }
            .complete-graphics-showcase{
                width: 100%;
            }
            
            .tutorial-step-graphic {
                max-width: 100%;
                text-align: center;
            }
            table {
                width: 100%;
                border-collapse: collapse; /* Ensure borders are collapsed */
            }
            th, td {
                border: 1px solid black; /* Apply border to table cells */
                padding: 8px; /* Optional: Add some padding for better readability */
            }
            img {
                max-width: 50%;
            }
            .custom-checkbox {
                position: relative;
                display: inline-block;
                width: 30px; // Adjust the size as needed
                height: 30px; // Adjust the size as needed
                background-color: #FFFFFF;
                border: 2px solid #000000;
            }
            input {
                opacity: 0;
                width: 0;
                height: 0;
            }
        `,
        documentTitle: "CustomFileName", // Set a custom file name here
        scanStyles: false,
        showModal: true, // Optional: Show a modal while the PDF is being generated
    });
}
