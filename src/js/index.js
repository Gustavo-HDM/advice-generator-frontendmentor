const button = document.getElementById('button')
const adviceNumber = document.getElementById("advice-number")
const advice = document.getElementById('advice')

async function getAdvice() {
    try {
    const api = await fetch(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`)
        if(!api.ok) {
            throw new Error('Network response was not ok ' + Response.statusText)
        }
        const data = await api.json()
        return data.slip
    } catch (error) {
        console.error('Fetch operation failed:', error)
        return null
    }
    
}

button.addEventListener('click', async () => {

    const loadingTexts = ["Loading", "Loading.", "Loading..", "Loading..."]
    let loadingIndex = 0
    const loadingInterval = setInterval(() => {
        advice.textContent = loadingTexts[loadingIndex]
        loadingIndex = (loadingIndex + 1) % loadingTexts.length
    }, 500)

    const adviceData = await getAdvice()

    clearInterval(loadingInterval)

    if (adviceData) {
        adviceNumber.textContent = adviceData.id
        advice.textContent = adviceData.advice
    } else {
        advice.textContent = "Could not fetch advice. Please try again"
    }
})