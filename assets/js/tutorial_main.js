var SVGs = [];
var componentObject;
var boardReferenceMasterList = [];
var forcedReflows = [];
var tutorialStepVisibleLayers = [];
var slides = [];
var slidePointer = 0;

document.addEventListener("DOMContentLoaded", function () {
    var chunks;
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
        })
        .then(() => {
            buildGallery(chunks);
            window.addEventListener("resize", setupGalleryDims);
        });
});
