document.addEventListener("DOMContentLoaded", function () {
    // Run the function to wrap text nodes
    wrapTextNodes();

    function extractBoardReferences(componentRows) {
        return {};
    }

    function wrapTextNodes() {
        const componentRows = document.querySelectorAll(".component");
        const boardReferences = {};

        // Populate boardReferences from componentRows
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
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    for (let child of node.childNodes) {
                        getTextNodesRecursive(child);
                    }
                }
            }
            getTextNodesRecursive(node);
            return textNodes;
        }

        // Iterate over each reference
        for (let ref in boardReferences) {
            // Find all text nodes in the document
            const textNodes = getTextNodes(document.body);

            textNodes.forEach((textNode) => {
                const regex = new RegExp(`(\\b${ref}\\b)(?=[\\s,;:\\-]|$)`, "g");
                const parentElement = textNode.parentElement;
                if (parentElement && !parentElement.classList.contains('component-text')) {
                    let match;
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    while ((match = regex.exec(textNode.textContent)) !== null) {
                        const matchStart = match.index;
                        const matchEnd = match.index + match[0].length;

                        // Append text before the match
                        fragment.appendChild(
                            document.createTextNode(textNode.textContent.slice(lastIndex, matchStart))
                        );

                        // Create span for the reference
                        const span = document.createElement("span");
                        span.classList.add("component-text", ref, boardReferences[ref].generic_part);
                        span.textContent = match[0];
                        span.addEventListener("mouseover", showTooltip);
                        span.addEventListener("mouseout", hideTooltip);
                        span.setAttribute("data-component", JSON.stringify(boardReferences[ref]));

                        fragment.appendChild(span);

                        lastIndex = matchEnd;
                    }

                    // Append remaining text after the last match
                    fragment.appendChild(
                        document.createTextNode(textNode.textContent.slice(lastIndex))
                    );

                    textNode.parentNode.replaceChild(fragment, textNode);
                }
            });
        }
    }

    function showTooltip(event) {
        const span = event.target;
        const data = JSON.parse(span.getAttribute("data-component"));
        const tooltip = createTooltip(data);
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

    function createTooltip(data) {
        const tooltip = document.createElement("div");
        tooltip.classList.add("component-tooltip");
        const info = document.createElement("div");
        let dataString = "";

        switch (data.generic_part) {
            case "resistor":
                dataString = `${data.data.value}${data.data.units}Ω`;
                if (data.data.wattage) {
                    dataString += ` - ${data.data.wattage}W`;
                }
                if (data.data.tolerance) {
                    dataString += ` - ${data.data.tolerance}%`;
                }
                break;
            // Add other cases for different component types
            default:
                dataString = `Component details not available`;
                break;
        }
        info.textContent = dataString;
        tooltip.appendChild(info);
        return tooltip;
    }

    function positionTooltip(event, tooltip) {
        const spanRect = event.target.getBoundingClientRect();
        tooltip.style.left = `${spanRect.left}px`;
        tooltip.style.top = `${spanRect.bottom + window.scrollY + 5}px`; // Adjust this value to position closer
    }
});