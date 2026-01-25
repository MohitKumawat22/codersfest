// using native fetch

async function testAura() {
    console.log("Testing Aura API at http://localhost:3000/api/aura...");
    try {
        const response = await fetch('http://localhost:3000/api/aura', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: 'I need a jacket'
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Aura says:", data.response);

            // Validation Logic
            if (data.response.toLowerCase().includes("cyberpunk") || data.response.toLowerCase().includes("leather")) {
                console.log("✅ PASS: Aura recommended the catalog item.");
            } else {
                console.log("⚠️ WARNING: Aura's response was generic. Check context injection.");
            }
        } else {
            console.error("API Error:", response.status, await response.text());
        }
    } catch (error) {
        console.error("Fetch Failed:", error);
    }
}

// Check if node-fetch is available, otherwise use native fetch (Node 18+)
if (typeof fetch === 'undefined') {
    testAura();
} else {
    // If not node 18+, we usually need to import. 
    // But in this environment, we better just rely on native fetch if available or fail gracefully.
    // Actually, recent Node versions have global fetch.
    testAura();
}
