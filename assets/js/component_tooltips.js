var SVGs = [];
var componentObject;
var boardReferenceMasterList = [];

function loadBoardReferenceMasterList() {
    for (let component of componentObject) {
        if (component.board_reference) {
            for (let c of component.board_reference) {
                boardReferenceMasterList.push(c);
            }
        }
    }
}

function getComponentObject() {
    const dataDiv = document.getElementById("components");
    componentObject = JSON.parse(dataDiv.getAttribute("data-components"));
    loadBoardReferenceMasterList();
    return Promise.resolve();
}

function loadBoardSVGs() {
    const paths = getSVGPaths();
    const fetchPromises = paths.map((p) => fetch(p).then((response) => response.text()));
    return Promise.all(fetchPromises);
}

function getSVGPaths() {
    var paths = [];
    const dataDiv = document.getElementById("board-vector-locations");
    for (let i = 1; i <= dataDiv.attributes.length; i++) {
        const attrName = `data-vector-endpoint-${i}`;
        const svgPath = dataDiv.getAttribute(attrName);
        if (svgPath) {
            paths.push(svgPath);
        }
    }
    return paths;
}

// boardReferenceMasterList

function getLayerDiv(layerId) {
    for (let svgString of SVGs) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        svgElement.style.padding = "0";
        svgElement.style.margin = "0";
        svgElement.style.border = "none";

        // Use getElementsByTagNameNS to handle namespaces
        const layers = svgElement.getElementsByTagNameNS("*", "g");
        let layer = null;

        for (let i = 0; i < layers.length; i++) {
            const currentLabel = layers[i].getAttribute("inkscape:label");
            if (currentLabel) {
                if (
                    (currentLabel != layerId && boardReferenceMasterList.includes(currentLabel)) ||
                    currentLabel.includes(" Alt")
                ) {
                    layers[i].style.display = "none";
                } else {
                    layers[i].style.display = "block";
                    if (currentLabel == layerId) {
                        layer = layers[i];
                    }
                }
            }
        }
        if (layer) {
            // Force reflow by accessing offsetHeight
            svgElement.style.display = "none";
            document.body.appendChild(svgElement);
            svgElement.offsetHeight;
            svgElement.style.display = "block";

            const bbox = layer.getBBox();
            console.log(`Bounding box for layer ${layerId}:`, bbox);

            // Optionally, adjust the viewBox of the SVG to fit the bounding box of the layer
            var scale = 0.5;
            svgElement.setAttribute(
                "viewBox",
                `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
            );
            svgElement.style.transform = `scale(${scale})`; // Adjust the scale as needed
            svgElement.style.transformOrigin = "top left"; 
            // Create a div and set its innerHTML to the modified SVG
            const div = document.createElement("div");
            div.style.padding = "0";
            div.style.margin = "0";
            div.style.border = "none";
            div.style.height = bbox.height * scale;
            div.style.width = bbox.width * scale;
            div.innerHTML = new XMLSerializer().serializeToString(svgElement);
            document.body.removeChild(svgElement);
            return div;
        }
    }
    return null;
}

function wrapTextNodes() {
    const componentRows = document.querySelectorAll(".component");
    const boardReferences = {};

    componentRows.forEach((element) => {
        const dataString = element.getAttribute("data-component");
        try {
            const dataObject = JSON.parse(dataString);
            dataObject.board_reference.forEach((ref) => {
                if (ref !== "-") {
                    boardReferences[ref] = dataObject;
                }
            });
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    });

    function getTextNodes(node) {
        let textNodes = [];
        function getTextNodesRecursive(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains("component-text")) {
                for (let child of node.childNodes) {
                    getTextNodesRecursive(child);
                }
            }
        }
        getTextNodesRecursive(node);
        return textNodes;
    }

    function wrapReference(textNode, ref, data) {
        const regex = new RegExp(`(\\b${ref}\\b)(?=[\\s,;:.\\-]|$)`, "g");
        let match;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        while ((match = regex.exec(textNode.textContent)) !== null) {
            const matchStart = match.index;
            const matchEnd = match.index + match[0].length;

            fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex, matchStart)));

            const span = document.createElement("span");
            span.classList.add("component-text", ref, data.generic_part);
            span.textContent = match[0];
            span.addEventListener("mouseover", showTooltip);
            span.addEventListener("mouseout", hideTooltip);
            span.setAttribute("data-component", JSON.stringify(data));

            fragment.appendChild(span);

            lastIndex = matchEnd;
        }

        fragment.appendChild(document.createTextNode(textNode.textContent.slice(lastIndex)));

        textNode.parentNode.replaceChild(fragment, textNode);
    }

    for (let ref in boardReferences) {
        const textNodes = getTextNodes(document.body);

        textNodes.forEach((textNode) => {
            const parentElement = textNode.parentElement;
            if (parentElement && !parentElement.classList.contains("component-text")) {
                wrapReference(textNode, ref, boardReferences[ref]);
            }
        });
    }
}

function showTooltip(event) {
    const span = event.target;
    const reference = event.target.innerHTML;
    const data = JSON.parse(span.getAttribute("data-component"));
    const tooltip = createTooltip(data, reference);
    document.body.appendChild(tooltip);
    positionTooltip(event, tooltip);
    tooltip.style.display = "block";
}

function hideTooltip(event) {
    const tooltip = document.querySelector(".component-tooltip");
    if (tooltip) {
        tooltip.remove();
    }
}

function createTooltip(data, reference) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("component-tooltip");
    const info = document.createElement("div");
    const title = document.createElement("div");
    title.textContent = reference;
    tooltip.appendChild(title);
    let dataString = "";

    switch (data.generic_part) {
        case "resistor":
            dataString += `${data.data.value}${data.data.units}Ω`;
            if (data.data.wattage) {
                dataString += ` - ${data.data.wattage}W`;
            }
            if (data.data.tolerance) {
                dataString += ` - ${data.data.tolerance}%`;
            }
            break;
        case "capacitor":
            dataString += `${data.data.value}${data.data.units}F`;
            break;
        case "transistor":
            dataString += `${data.part}`;
            if (data.data.model) {
                dataString += `- ${data.data.model}`;
            }
            break;
        default:
            dataString += `${data.part}`;
            break;
    }
    info.textContent = dataString;
    tooltip.appendChild(info);
    var image = getLayerDiv(reference);
    if (image) {
        tooltip.appendChild(image);
    }
    return tooltip;
}

function positionTooltip(event, tooltip) {
    const spanRect = event.target.getBoundingClientRect();
    tooltip.style.left = `${spanRect.left}px`;
    tooltip.style.top = `${spanRect.bottom + window.scrollY + 5}px`;
}

document.addEventListener("DOMContentLoaded", function () {
    getComponentObject()
        .then(() => {
            return loadBoardSVGs();
        })
        .then((loadedSVGs) => {
            SVGs = loadedSVGs;
        })
        .catch((error) => {
            console.error("Error loading SVGs:", error);
        })
        .finally(() => {
            wrapTextNodes();
        });
});
