var SVGs = [];
var componentObject;
var boardReferenceMasterList = [];
var forcedReflows = [];
var tutorialStepVisibleLayers = [];

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

function getTooltipLayerDiv(layerId) {
    const divs = [];
    for (let svgString of SVGs) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        svgElement.style.padding = "0";
        svgElement.style.margin = "0";
        svgElement.style.border = "none";

        // Use getElementsByTagNameNS to handle namespaces
        const layers = svgElement.getElementsByTagNameNS("*", "g");

        for (let lID of [layerId, layerId + " Alt"]) {
            let layer = findLayer(layers, lID);
            hideAllReferencedLayers(layers);
            hideAllAltReferencedLayers(layers);

            if (layer) {
                layer.style.display = "block";
                if (lID.includes("Alt")) {
                    cropSVGElement(svgElement, layer);
                } else {
                    prettyCropSVGElement(svgElement, layer, 6);
                }
                const div = makeDivWithSVGElement(svgElement);
                divs.push(div);
                cleanUpReflows();
            }
        }
    }
    return divs;
}

function makeDivWithSVGElement(svgElement, minDimension = 200) {
    const div = document.createElement("div");
    div.style.padding = "0";
    div.style.margin = "0";
    div.style.overflow = "hidden";
    const viewBox = svgElement.viewBox.baseVal;
    const aspectRatio = viewBox.width / viewBox.height;

    if (minDimension != -1) {
        let newWidth = minDimension;
        let newHeight = minDimension / aspectRatio;

        if (newHeight < minDimension) {
            newHeight = minDimension;
            newWidth = minDimension * aspectRatio;
        }

        svgElement.setAttribute("width", newWidth);
        svgElement.setAttribute("height", newHeight);
    }

    div.innerHTML = new XMLSerializer().serializeToString(svgElement);
    return div;
}

function forceReflow(svgElement) {
    svgElement.style.display = "none";
    document.body.appendChild(svgElement);
    svgElement.offsetHeight;
    svgElement.offsetWidth;
    svgElement.style.display = "block";
    forcedReflows.push(svgElement);
}

function cleanUpReflows() {
    for (let e of forcedReflows) {
        document.body.removeChild(e);
    }
    forcedReflows = [];
}

function prettyCropSVGElement(svgElement, layer, padding) {
    // Force reflow
    forceReflow(svgElement);
    const bbox = getBbox(layer);
    // figure out center of bbox
    let cx = bbox.x + bbox.width / 2;
    let cy = bbox.y + bbox.height / 2;
    // figure out square dim
    let dim = Math.max(bbox.width, bbox.height) + padding;
    let x = cx - dim / 2;
    let y = cy - dim / 2;
    var unitScale,
        units = figureOutUnits(svgElement);
    svgElement.setAttribute("viewBox", `${x} ${y} ${dim} ${dim}`);
    svgElement.setAttribute("width", `${dim}${units}`);
    svgElement.setAttribute("height", `${dim}${units}`);
}

function cropSVGElement(svgElement, layer) {
    // Force reflow
    forceReflow(svgElement);
    const bbox = getBbox(layer);
    var unitScale,
        units = figureOutUnits(svgElement);
    svgElement.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    svgElement.setAttribute("width", `${bbox.width}${units}`);
    svgElement.setAttribute("height", `${bbox.height}${units}`);
}

function hideAllReferencedLayers(layers) {
    for (let i = 0; i < layers.length; i++) {
        const currentLabel = layers[i].getAttribute("inkscape:label");
        if (currentLabel) {
            if (boardReferenceMasterList.includes(currentLabel)) {
                layers[i].style.display = "none";
            }
        }
    }
}

function hideAllAltReferencedLayers(layers) {
    for (let i = 0; i < layers.length; i++) {
        const currentLabel = layers[i].getAttribute("inkscape:label");
        if (currentLabel) {
            if (currentLabel.includes(" Alt")) {
                layers[i].style.display = "none";
            }
        }
    }
}

function findLayer(layers, layerId) {
    var layer = null;
    for (let i = 0; i < layers.length; i++) {
        const currentLabel = layers[i].getAttribute("inkscape:label");
        if (currentLabel) {
            if (currentLabel == layerId) {
                layer = layers[i];
            }
        }
    }
    return layer;
}

function getBbox(layer) {
    const bbox = layer.getBBox();
    if (bbox) {
        transform = layer.getAttribute("transform");
        if (transform) {
            const translateMatch = /translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/.exec(transform);
            if (translateMatch) {
                const translateX = parseFloat(translateMatch[1]);
                const translateY = parseFloat(translateMatch[2]);
                return {
                    x: bbox.x + translateX,
                    y: bbox.y + translateY,
                    width: bbox.width,
                    height: bbox.height,
                };
            }
        }
        return bbox;
    }
    return null;
}

function figureOutUnits(svgElement) {
    const units = svgElement.getAttribute("width").replace(/[0-9.]/g, "");
    var unitScale = 1;

    switch (units) {
        case "mm":
            unitScale = 3.7795275591; // 1mm = 3.7795275591px
            break;
        case "cm":
            unitScale = 37.795275591; // 1cm = 37.795275591px
            break;
        case "in":
            unitScale = 96; // 1in = 96px
            break;
        case "pt":
            unitScale = 1.3333333333; // 1pt = 1.3333333333px
            break;
        default:
            unitScale = 1;
    }
    return unitScale, units;
}

function addRedDot(x, y, r, svgElement) {
    const redDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    redDot.setAttribute("cx", x);
    redDot.setAttribute("cy", y);
    redDot.setAttribute("r", r); // Radius of the red dot
    redDot.setAttribute("fill", "red");

    // Append the red dot to the top layer or directly to the SVG if needed
    svgElement.appendChild(redDot);
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
    var images = getTooltipLayerDiv(reference);
    for (let i of images) {
        tooltip.appendChild(i);
    }
    return tooltip;
}

function positionTooltip(event, tooltip) {
    const spanRect = event.target.getBoundingClientRect();
    tooltip.style.left = `${spanRect.left}px`;
    tooltip.style.top = `${spanRect.bottom + window.scrollY + 5}px`;
}

function showPopulatedLayersAtStep(layers) {
    for (let i = 0; i < layers.length; i++) {
        const currentLabel = layers[i].getAttribute("inkscape:label");
        if (currentLabel) {
            if (tutorialStepVisibleLayers.includes(currentLabel)) {
                layers[i].style.display = "block";
            }
        }
    }
}

function addHighlightBeneathLayersForCurrentStep(layers, stepReferencesArray, svgElement) {
    for (let id of stepReferencesArray) {
        const layer = findLayer(layers, id);
        if (layer) {
            const layerBBox = getBbox(layer);

            // Create a new rect element
            const highlight = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            highlight.setAttribute("x", layerBBox.x - 4);
            highlight.setAttribute("y", layerBBox.y - 4);
            highlight.setAttribute("width", layerBBox.width + 8);
            highlight.setAttribute("height", layerBBox.height + 8);
            highlight.setAttribute("fill", "none");
            highlight.setAttribute("stroke", "red");
            highlight.setAttribute("stroke-width", "1");

            // Insert the highlight rect before the layer to ensure it's beneath it
            svgElement.insertBefore(highlight, layer);
        }
    }
}

function setupTutorialBOMTable() {
    const bomContainers = document.querySelectorAll(".tutorial-bom-references-container");

    bomContainers.forEach((container) => {
        // Create expand/collapse button
        const button = document.createElement("button");
        button.textContent = "+ Show Components";
        button.style.marginBottom = "10px";
        button.addEventListener("click", () => {
            if (container.style.display === "none") {
                container.style.display = "block";
                button.textContent = "- Hide Components";
            } else {
                container.style.display = "none";
                button.textContent = "+ Show Components";
            }
        });

        // Insert the button before the container
        container.parentNode.insertBefore(button, container);

        // Set container to be collapsed initially
        container.style.display = "none";
    });
    tutorialBOMRefs = document.querySelectorAll("td.bom-reference");
    tutorialBOMRefs.forEach((node) => {
        ref = node.getAttribute("data-board-reference");
        console.log(node, ref);
        const component = componentObject.find((obj) => obj.board_reference.includes(ref));
        if (component) {
            let myString = "";
            switch (component.generic_part) {
                case "resistor":
                    myString = `${component.part}, ${component.data.value}${component.data.units}Ω`;
                    if (component.data.tolerance) {
                        myString += `, ${component.data.tolerance}%`;
                    }
                    break;
                case "capacitor":
                    myString = `${component.part}, ${component.data.value}${component.data.units}F`;
                    break;
                case "transistor":
                    myString = `Transistor, ${component.part}`;
                    if (component.data.model) {
                        myString += `, ${component.data.model}`;
                    }
                    break;
                default:
                    myString = component.part;
                    break;
            }
            node.innerHTML = myString;
        } else {
            console.log("Component not found for ref:", ref);
        }
    });
}

function drawStepGraphics(node) {
    const stepReferencesArray = node
        .getAttribute("data-bom-references")
        .replace(/'/g, "")
        .split(",")
        .map((str) => str.trim());
    var newComponents = stepReferencesArray.length != 0;
    tutorialStepVisibleLayers = tutorialStepVisibleLayers.concat(stepReferencesArray);
    if (newComponents) {
        for (let svgString of SVGs) {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
            const svgElement = svgDoc.documentElement;
            svgElement.style.padding = "0";
            svgElement.style.margin = "0";
            svgElement.style.border = "none";
            forceReflow(svgElement);

            // Use getElementsByTagNameNS to handle namespaces
            const layers = svgElement.getElementsByTagNameNS("*", "g");
            hideAllReferencedLayers(layers);
            hideAllAltReferencedLayers(layers);
            showPopulatedLayersAtStep(layers);
            addHighlightBeneathLayersForCurrentStep(layers, stepReferencesArray, svgElement);
            const div = makeDivWithSVGElement(svgElement, -1);
            node.appendChild(div);
            cleanUpReflows();
        }
    }
}

function buildStepComponents() {
    const tutorialStepTitles = document.querySelectorAll(".tutorial-step-title");
    let step_count = 1;

    for (let node of tutorialStepTitles) {
        node.innerHTML = `${step_count}. ${node.innerHTML}`;
        step_count++;
    }
    const tutorialStepGraphics = document.querySelectorAll(".tutorial-step-graphic");
    for (let node of tutorialStepGraphics) {
        drawStepGraphics(node);
    }
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
            buildStepComponents();
            setupTutorialBOMTable();
        });
});
