document.addEventListener('DOMContentLoaded', function () {
    const resistorElements = document.querySelectorAll('.resistor');
    resistorElements.forEach(element => {
        element.addEventListener('mouseover', showTooltip);
        element.addEventListener('mouseout', hideTooltip);
    });

    function showTooltip(event) {
        const resistorValue = event.target.getAttribute('data-value');
        const tolerance = event.target.getAttribute('data-tolerance') || "1";
        const wattage = event.target.getAttribute('data-wattage') || "unknown";
        
        const tooltip = createTooltip(resistorValue, tolerance, wattage);
        document.body.appendChild(tooltip);
        positionTooltip(event, tooltip);
        tooltip.style.display = 'block';
    }

    function hideTooltip(event) {
        const tooltip = document.querySelector('.resistor-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    function createTooltip(value, tolerance, wattage) {
        const tooltip = document.createElement('div');
        tooltip.classList.add('resistor-tooltip');
        
        const colorBands = getColorBands(value, tolerance);
        colorBands.forEach(color => {
            const band = document.createElement('div');
            band.classList.add('color-band');
            band.style.backgroundColor = color;
            tooltip.appendChild(band);
        });

        if (wattage != 'unknown'){
            const wattageText = document.createElement('div');
            wattageText.textContent = `Wattage: ${wattage}W`;
            tooltip.appendChild(wattageText);
        }
        
        
        return tooltip;
    }

    function positionTooltip(event, tooltip) {
        const spanRect = event.target.getBoundingClientRect();
        tooltip.style.left = `${spanRect.left}px`;
        tooltip.style.top = `${spanRect.bottom + window.scrollY + 5}px`; // Adjust this value to position closer
    }

    function getColorBands(value, tolerance) {
        const colorMap = {
            "0": "black",
            "1": "brown",
            "2": "red",
            "3": "orange",
            "4": "yellow",
            "5": "green",
            "6": "blue",
            "7": "violet",
            "8": "gray",
            "9": "white"
        };

        const bands = [];
        const digits = value.split("");
        digits.forEach(digit => {
            bands.push(colorMap[digit]);
        });

        // Add tolerance band
        const toleranceMap = {
            "1": "brown",
            "2": "red",
            "5": "gold",
            "10": "silver"
        };
        bands.push(toleranceMap[tolerance]);

        return bands;
    }
});