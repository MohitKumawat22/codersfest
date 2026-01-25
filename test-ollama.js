
async function test() {
    console.log("Testing connection to http://127.0.0.1:11434/api/generate...");
    try {
        const response = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3',
                prompt: 'Are you working?',
                stream: false
            })
        });

        console.log("Response Status:", response.status);
        if (response.ok) {
            const data = await response.json();
            console.log("Success! Output:", data.response);
        } else {
            console.log("Error Body:", await response.text());
        }
    } catch (error) {
        console.error("Connection Failed:", error.cause || error);
    }
}

test();
