

async function fetchWithTimeOut(url, options) {

    const { timeout = 5000 } = options

    const controller = new AbortController()

    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    })

    clearTimeout(id)

    return response;
}

/**
 * 使用案例
*/
async function loadGames() {
    try {
        const response = await fetchWithTimeout('/games', {
            timeout: 6000
        });
        const games = await response.json();
        return games;
    } catch (error) {
        // Timeouts if the request takes
        // longer than 6 seconds
        console.log(error.name === 'AbortError');
    }
}
