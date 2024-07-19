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
            hideAltLayersInHeroImage();
            wrapTextNodes();
            buildStepComponents();
            setupTutorialBOMTable();
        });
});
