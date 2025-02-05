const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan", "lime", "gold"];
        let targetColor = "";
        let score = 0;

        function startNewGame(resetScore = false) {
            if (resetScore) score = 0;
            document.getElementById("score").innerText = score;
            document.getElementById("gameStatus").innerText = "";

            targetColor = colors[Math.floor(Math.random() * colors.length)];
            document.getElementById("colorBox").style.backgroundColor = targetColor;
            document.getElementById("colorBox").classList.remove("correct");

            generateColorOptions();
        }

        function generateColorOptions() {
            const optionsContainer = document.getElementById("colorOptions");
            optionsContainer.innerHTML = "";

            let shuffledColors = colors.filter(c => c !== targetColor).sort(() => Math.random() - 0.5).slice(0, 5);
            shuffledColors.push(targetColor);
            shuffledColors.sort(() => Math.random() - 0.5); 

            shuffledColors.forEach(color => {
                const button = document.createElement("button");
                button.className = "colorOption";
                button.style.backgroundColor = color;
                button.dataset.testid = "colorOption";
                button.onclick = () => handleGuess(color);
                optionsContainer.appendChild(button);
            });
        }

        function handleGuess(color) {
            if (color === targetColor) {
                score++;
                document.getElementById("gameStatus").innerText = "Correct!";
                document.getElementById("score").innerText = score;
                document.getElementById("colorBox").classList.add("correct");
                setTimeout(() => startNewGame(false), 1000);
            } else {
                document.getElementById("gameStatus").innerText = "Wrong! Restarting...";
                setTimeout(() => startNewGame(true), 1000);
            }
        }

        document.getElementById("newGameButton").addEventListener("click", () => startNewGame(true));

        startNewGame();