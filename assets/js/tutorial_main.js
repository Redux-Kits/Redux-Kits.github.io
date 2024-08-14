var SVGs = [];
var componentObject;
var boardReferenceMasterList = [];
var forcedReflows = [];
var tutorialStepVisibleLayers = [];
var slides = [];
var slidePointer = 0;

function deepCopyDOMArray(array) {
    return array.map((innerArray) => {
        return innerArray.map((element) => {
            if (element.cloneNode) {
                return element.cloneNode(true);
            } else {
                return element; // In case it's not a DOM element
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var chunks;
    var printChunks;
    hideGalleryButtons();
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
        .then(() => {
            hideAltLayersInHeroImage();
            wrapTextNodes();
            buildStepComponents();
            setupTutorialBOMTable();
        })
        .then(() => {
            chunks = findChunks();
            printChunks = deepCopyDOMArray(chunks);
        })
        .then(() => {
            buildGallery(chunks);
            window.addEventListener("resize", setupGalleryDims);
            // const duplicateIds = findDuplicateIds();
            // if (duplicateIds.length > 0) {
            //     console.warn("Duplicate IDs found:", duplicateIds);
            // } else {
            //     console.log("No duplicate IDs found.");
            // }
        })
        .then(() => {
            generatePrintView(printChunks);
        });
});
