const APP_ID = "967f5793"; // Replace with your actual App ID
const API_KEY = "f9d9ee25d4bdce340b71dc2b2e90dc24"; // Replace with your actual API Key

document.getElementById("fetchButton").addEventListener("click", () => {
    const foodInput = document.getElementById("foodInput").value;
    if (foodInput.trim() === "") {
        alert("Please enter a food item.");
        return;
    }
    fetchNutritionData(foodInput);
});

function fetchNutritionData(foodQuery) {
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${encodeURIComponent(foodQuery)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Nutrition Data:", data); // Debugging: Log API response
            displayNutritionData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error.message);
            alert("An error occurred while fetching data. Please try again.");
        });
}

function displayNutritionData(data) {
    const outputDiv = document.getElementById("output");
    if (data.calories) {
        outputDiv.innerHTML = `
            <p><strong>Calories:</strong> ${data.calories}</p>
            <p><strong>Protein:</strong> ${data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity + ' ' + data.totalNutrients.PROCNT.unit : 'N/A'}</p>
            <p><strong>Fat:</strong> ${data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity + ' ' + data.totalNutrients.FAT.unit : 'N/A'}</p>
            <p><strong>Carbs:</strong> ${data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity + ' ' + data.totalNutrients.CHOCDF.unit : 'N/A'}</p>
        `;
        outputDiv.style.display = "block"; // Show output div
    } else {
        outputDiv.innerHTML = "<p>No data available for the given input.</p>";
        outputDiv.style.display = "block"; // Show output div
    }
}
