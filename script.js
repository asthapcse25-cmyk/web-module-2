const items = document.querySelectorAll('.item');
const zones = document.querySelectorAll('.drop-zone');

let draggedItem = null;

// Start dragging
items.forEach(item => {
    item.addEventListener('dragstart', function () {
        draggedItem = this.innerText;
    });
});

// Enable drop
zones.forEach(zone => {
    zone.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    zone.addEventListener('drop', function () {
        if (draggedItem) {

            // Add item visually
            const el = document.createElement('div');
            el.textContent = draggedItem;
            el.style.padding = "5px";
            el.style.margin = "3px";
            el.style.background = "#673ab7";
            el.style.color = "white";
            el.style.borderRadius = "4px";

            this.appendChild(el);

            // Slight visual change on drop
            this.style.backgroundColor = "#e3f2fd";

            checkReaction();
        }
    });
});

// Reaction logic with visual changes
function checkReaction() {
    const zone1 = zones[0];
    const zone2 = zones[1];

    const text1 = zone1.innerText;
    const text2 = zone2.innerText;

    // Reset styles first
    zones.forEach(z => {
        z.style.borderColor = "#aaa";
    });

    // Reaction condition
    if (
        (text1.includes("Acid") && text2.includes("Base")) ||
        (text1.includes("Base") && text2.includes("Acid"))
    ) {
        // Highlight zones
        zone1.style.borderColor = "green";
        zone2.style.borderColor = "green";

        showReaction("⚗️ Neutralization Reaction → Salt + Water");
    } else if (text1.includes("Acid") && text2.includes("Acid")) {
        showReaction("💥 Strong acidic mixture! Handle carefully.");
    } else if (text1.includes("Base") && text2.includes("Base")) {
        showReaction("🧪 Basic solution formed.");
    } else {
        showReaction("No significant reaction...");
    }
}

// Display reaction result dynamically
function showReaction(message) {
    let output = document.getElementById("output");

    if (!output) {
        output = document.createElement("div");
        output.id = "output";
        output.style.marginTop = "20px";
        output.style.padding = "12px";
        output.style.fontWeight = "bold";
        output.style.background = "#f1f8e9";
        output.style.border = "2px solid #4caf50";
        document.body.appendChild(output);
    }

    output.innerHTML = message;
}