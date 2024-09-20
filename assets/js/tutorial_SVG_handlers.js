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
                div.setAttribute(
                    "data-view-box",
                    `${svgElement.viewBox.baseVal.x} ${svgElement.viewBox.baseVal.y} ${svgElement.viewBox.baseVal.width} ${svgElement.viewBox.baseVal.height}`
                );
                divs.push(div);
                cleanUpReflows();
            }
        }
    }
    const formattedDivs = [];
    var fd = document.createElement("div");
    fd.classList.add("toolTipImageContainer");
    for (let d of divs) {
        const viewBoxForDiv = d.getAttribute("data-view-box").split(" ").map(parseFloat);
        if (viewBoxForDiv[2] > viewBoxForDiv[3]) {
            // width > height
            formattedDivs.push(fd);
            fd = document.createElement("div");
            fd.classList.add("toolTipImageContainer");
        }
        fd.appendChild(d);
    }
    formattedDivs.push(fd);

    return formattedDivs;
}

function rotateToCorrectOrientation(svgElement) {
    const viewBox = svgElement.viewBox.baseVal;
    if (viewBox.width > viewBox.height) {
    }
}

function makeDivWithSVGElement(svgElement, maxDimension = 200) {
    const div = document.createElement("div");
    div.style.padding = "0";
    div.style.margin = "0";
    div.style.overflow = "hidden";
    div.classList.add('generated-div-with-svg-element')

    const viewBox = svgElement.viewBox.baseVal;
    const aspectRatio = viewBox.width / viewBox.height;

    let newWidth, newHeight;

    if (maxDimension !== -1) {
        if (viewBox.width >= viewBox.height) {
            // Scale based on width
            newWidth = maxDimension;
            newHeight = maxDimension / aspectRatio;
        } else {
            // Scale based on height
            newHeight = maxDimension;
            newWidth = maxDimension * aspectRatio;
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
    let count = 0;
    for (let i = 0; i < layers.length; i++) {
        const currentLabel = layers[i].getAttribute("inkscape:label");
        if (currentLabel) {
            if (currentLabel.includes(" Alt")) {
                layers[i].style.display = "none";
                count += 1
            }
        }
    }
    return count
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

// function getBbox(layer) {
//     const bbox = layer.getBBox();
//     if (bbox) {
//         transform = layer.getAttribute("transform");
//         if (transform) {
//             const translateMatch = /translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/.exec(transform);
//             if (translateMatch) {
//                 // e.g. <g inkscape:groupmode="layer" id="layer73" inkscape:label="J2" transform="translate(-0.30954099,13.471314)" style="display: block;"><g id="g1698" transform="rotate(-26.850264,0.74882559,10.823287)"><rect style="fill:url(#linearGradient1696);fill-opacity:1;fill-rule:evenodd;stroke:url(#linearGradient1698);stroke-width:0.999995;stroke-linecap:butt;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" id="rect1695" width="7.3000002" height="9.5" x="29.669634" y="19.23086"></rect><rect style="fill:#f7f7f7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" id="rect1694" width="3" height="10.3" x="28.319635" y="28.239521"></rect><rect style="fill:#f7f7f7;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.01;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" id="rect1694-7" width="3" height="10.3" x="35.319633" y="28.239521"></rect><rect style="fill:#f2f2f2;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.01;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" id="rect1694-7-5" width="4" height="5" x="31.319633" y="29.230858"></rect><path d="m 35.319603,34.100581 -3.999998,-3.7e-5 8.9e-5,2.999768 1.475388,-2.82e-4 0.174336,-0.480528 0.767302,-0.0054 0.193559,0.486057 1.389413,2.14e-4 z" style="fill:#e5e5e5;fill-rule:evenodd;stroke-width:0.00999997" id="path1699"></path></g></g>
//                 const translateX = parseFloat(translateMatch[1]);
//                 const translateY = parseFloat(translateMatch[2]);
//                 return {
//                     x: bbox.x + translateX,
//                     y: bbox.y + translateY,
//                     width: bbox.width,
//                     height: bbox.height,
//                 };
//             }
//         }
//         // not behaving the same as transform, which works perfectly
//         // e.g. <g inkscape:groupmode="layer" id="layer73" inkscape:label="J2" transform="matrix(-1,0,0,1,135.31649,13.471314)" style="display: block;"> (tutorial_SVG_handlers.js, line 432)<g id="g1698" transform="rotate(-26.850264,0.74882559,10.823287)"></g></g>
//         console.log(bbox);
//         return bbox;
//     }
//     return null;
// }

function getBbox(layer) {
    const bbox = layer.getBBox();
    if (bbox) {
        const transform = layer.getAttribute("transform");

        if (transform) {
            // Handle "translate(x, y)" transform
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

            // Handle "matrix(a, b, c, d, e, f)" transform
            const matrixMatch = /matrix\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/.exec(transform);
            if (matrixMatch) {
                const a = parseFloat(matrixMatch[1]); // scale X or skew X
                const b = parseFloat(matrixMatch[2]); // skew Y
                const c = parseFloat(matrixMatch[3]); // skew X
                const d = parseFloat(matrixMatch[4]); // scale Y or skew Y
                const e = parseFloat(matrixMatch[5]); // translate X
                const f = parseFloat(matrixMatch[6]); // translate Y
                console.log(a, b, c, d, e, f)

                // Apply the matrix transformation to the bounding box // stuck here!!!!!
                // TODO TODO
                const transformedX = bbox.x * a + bbox.y * c + e - Math.abs(bbox.width)/2;
                const transformedY = bbox.x * b + bbox.y * d + f;

                // Fix negative width and height by taking the absolute value
                const transformedWidth = Math.abs(bbox.width * a);
                const transformedHeight = Math.abs(bbox.height * d);

                return {
                    x: transformedX,
                    y: transformedY,
                    width: transformedWidth,
                    height: transformedHeight,
                };
            }
        }

        // If no transform or unhandled transform, return the original bbox
        console.log(bbox);
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
            dataString += `${data.data.value}Ω`;
            if (data.data.wattage) {
                dataString += ` - ${data.data.wattage}W`;
            }
            if (data.data.tolerance) {
                dataString += ` - ${data.data.tolerance}%`;
            }
            break;
        case "capacitor":
            dataString += `${data.data.value}F`;
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
    if (images) {
        const tooltipImages = document.createElement("div");
        for (let i of images) {
            tooltipImages.appendChild(i);
        }
        tooltip.appendChild(tooltipImages);
    }

    return tooltip;
}

function positionTooltip(event, tooltip) {
    const spanRect = event.target.getBoundingClientRect();
    tooltip.style.left = `${spanRect.left}px`;
    tooltip.style.top = `${spanRect.bottom + window.scrollY + 5}px`;
}

function showPopulatedLayersAtStep(layers) {
    var count = 0;
    for (let i = 0; i < layers.length; i++) {
        const currentLabel = layers[i].getAttribute("inkscape:label");
        if (currentLabel) {
            if (tutorialStepVisibleLayers.includes(currentLabel)) {
                layers[i].style.display = "block";
                count += 1;
            }
        }
    }
    return count;
}

function areasToHighlightForCurrentStep(layers, stepReferencesArray, border = 5) {
    areas = [];
    for (let id of stepReferencesArray) {
        const layer = findLayer(layers, id);
        console.log(layer)
        if (layer) {
            const layerBBox = getBbox(layer);
            layerBBox.x -= border;
            layerBBox.y -= border;
            layerBBox.width += 2 * border;
            layerBBox.height += 2 * border;
            // fix bboxes falling off here
            areas.push(layerBBox);
        } else {
            console.log("No areas to highlight")
        }
    }
    return areas;
}

function addHighlightForCurrentStepAreas(areas, svgElement) {
    for (let layerBBox of areas) {
        // Create a new rect element
        const highlight = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        highlight.setAttribute("x", layerBBox.x);
        highlight.setAttribute("y", layerBBox.y);
        highlight.setAttribute("width", layerBBox.width);
        highlight.setAttribute("height", layerBBox.height);
        highlight.setAttribute("fill", "none");
        highlight.setAttribute("stroke", "red");
        highlight.setAttribute("stroke-width", "1");
        highlight.classList.add("cycle-opacity-slow");
        svgElement.appendChild(highlight);
    }
}

function addHighlightBeneathLayersForCurrentStep(areas, svgElement) {
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
            highlight.classList.add("cycle-opacity-slow");

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
        button.classList.add("gallery-print-exempt");
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
            console.error("Component not found for ref:", ref);
        }
    });
}

function componentOfInterestInSVGElement(svgElement, stepReferencesArray) {
    let res = false;
    const layers = svgElement.getElementsByTagNameNS("*", "g");
    for (let layerId of stepReferencesArray) {
        let layer = findLayer(layers, layerId);
        if (layer) {
            res = true;
        }
    }
    return res;
}

function drawStepGraphics(node) {
    const stepReferencesArray = node
        .getAttribute("data-bom-references")
        .replace(/'/g, "")
        .split(",")
        .map((str) => str.trim());
    var newComponents = stepReferencesArray.length != 0;
    tutorialStepVisibleLayers = tutorialStepVisibleLayers.concat(stepReferencesArray);
    let debugCounterSVG = 0;
    if (newComponents) {
        for (let svgString of SVGs) {
            
            debugCounterSVG += 1;
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
            
            const altCount = hideAllAltReferencedLayers(layers);
            const count = showPopulatedLayersAtStep(layers);
            
            console.log(`SVG: ${debugCounterSVG}\t\t COUNT: ${count} ALT COUNT: ${altCount}\t\t LAYERS: ${stepReferencesArray}`);
            if (count > 0) {
                if (componentOfInterestInSVGElement(svgElement, stepReferencesArray)) {
                    var areas = areasToHighlightForCurrentStep(layers, stepReferencesArray);
                    console.log('areas', areas)
                    areas = reduceAreas(areas);
                    addHighlightForCurrentStepAreas(areas, svgElement);
                    const div = makeDivWithSVGElement(svgElement, -1);

                    node.appendChild(div);
                }
            } else {
                console.log('no count')
            }
            cleanUpReflows();
            
        }
    }
}

function reduceAreas(areas) {
    if (!areas.length) return [];

    // Helper function to check if two bounding boxes overlap
    function isOverlapping(bb1, bb2) {
        return (
            bb1.x < bb2.x + bb2.width &&
            bb1.x + bb1.width > bb2.x &&
            bb1.y < bb2.y + bb2.height &&
            bb1.y + bb1.height > bb2.y
        );
    }

    // Helper function to merge two bounding boxes
    function mergeBoundingBoxes(bb1, bb2) {
        const x = Math.min(bb1.x, bb2.x);
        const y = Math.min(bb1.y, bb2.y);
        const width = Math.max(bb1.x + bb1.width, bb2.x + bb2.width) - x;
        const height = Math.max(bb1.y + bb1.height, bb2.y + bb2.height) - y;
        return { x, y, width, height };
    }

    let reducedAreas = [...areas];

    let hasOverlaps;
    do {
        hasOverlaps = false;
        const newAreas = [];

        while (reducedAreas.length) {
            const bb = reducedAreas.pop();
            let merged = false;

            for (let i = 0; i < reducedAreas.length; i++) {
                if (isOverlapping(bb, reducedAreas[i])) {
                    const mergedBB = mergeBoundingBoxes(bb, reducedAreas[i]);
                    reducedAreas.splice(i, 1); // Remove the overlapping bounding box
                    reducedAreas.push(mergedBB); // Add the merged bounding box back for further checking
                    merged = true;
                    hasOverlaps = true;
                    break;
                }
            }

            if (!merged) {
                newAreas.push(bb);
            }
        }

        reducedAreas = newAreas;
    } while (hasOverlaps);

    return reducedAreas;
}

function buildStepComponents() {
    const tutorialStepTitles = document.querySelectorAll(".tutorial-step-title");
    let step_count = 1;

    for (let node of tutorialStepTitles) {
        node.innerHTML = `${step_count}. ${node.innerHTML}`;
        step_count++;
    }
    const tutorialStepGraphics = document.querySelectorAll(".tutorial-step-graphic");
    let counter = 1
    for (let node of tutorialStepGraphics) {
        console.log(`Step ${counter}`);
        counter += 1;
        drawStepGraphics(node);
        console.log(``);
    }
}

function hideAltLayersInHeroImage() {
    const completeGraphicsDivs = document.querySelectorAll(".tutorial-complete-graphic");

    completeGraphicsDivs.forEach((div) => {
        const mainDiv = document.createElement("div");
        // Set the display property to flex
        mainDiv.classList.add("complete-graphics-showcase");
        mainDiv.style.display = "flex";
        // Additional flexbox properties
        mainDiv.style.flexDirection = "row"; // Default is 'row', but can be 'column'
        mainDiv.style.justifyContent = "center"; // Center items horizontally
        mainDiv.style.alignItems = "center"; // Center items vertically
        mainDiv.style.gap = "10px"; // Optional: Adds spacing between flex items
        for (let svgString of SVGs) {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
            const svgElement = svgDoc.documentElement;
            scaleSvgToPercentOfWindow(svgElement, 0.5);
            svgElement.style.padding = "0";
            svgElement.style.margin = "0";
            svgElement.style.border = "none";

            // Use getElementsByTagNameNS to handle namespaces
            const layers = svgElement.getElementsByTagNameNS("*", "g");
            hideAllAltReferencedLayers(layers);
            const cdiv = makeDivWithSVGElement(svgElement);
            const bdiv = document.createElement("div");
            bdiv.style.padding = "0px";
            bdiv.style.margin = "0px";
            bdiv.style.overflow = "hidden";
            bdiv.classList.add("svg-container-div");
            bdiv.appendChild(cdiv);
            mainDiv.appendChild(bdiv);
        }
        div.appendChild(mainDiv);
        // div.insertAdjacentElement('afterend', mainDiv);
    });
}

function scaleSvgToPercentOfWindow(svgElement, percent) {
    var bodyHeight = window.innerHeight;
    var desiredHeightPercentage = percent; // 50%
    var svgHeight = bodyHeight * desiredHeightPercentage;

    var viewBox = svgElement.getAttribute("viewBox");
    var aspectRatio = 1; // Default aspect ratio

    if (viewBox) {
        var viewBoxValues = viewBox.split(" ");
        var viewBoxWidth = parseFloat(viewBoxValues[2]);
        var viewBoxHeight = parseFloat(viewBoxValues[3]);
        aspectRatio = viewBoxWidth / viewBoxHeight;
    }

    var svgWidth = svgHeight * aspectRatio;

    svgElement.style.width = svgWidth + "px";
    svgElement.style.height = svgHeight + "px";
}
