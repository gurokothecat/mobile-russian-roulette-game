let barrel = [false, false, false, false, false, false];
let playerScore = 0;
let currentIndex = 0;
let botTurn = false; // Flag pour vérifier si c'est au bot de jouer

window.onload = function () {
    resetGame();
};

function resetGame() {
    playerScore = 0;
    reloadGun();
    currentIndex = 0;
    botTurn = false; // Assurez-vous que le bot ne joue pas au début
    document.getElementById("message").innerText = "Bienvenue ! Appuyez sur un bouton pour commencer.";
    updateScore();
}

function reloadGun() {
    document.getElementById("message").innerText = "On recharge";
    imageContainer.innerHTML = '<img src="russian-roulette.gif" alt="recharge">';
    const randomIndex = Math.floor(Math.random() * 6);
    barrel.fill(false);
    barrel[randomIndex] = true;
    currentIndex = 0;
    console.log("Arme rechargée : ", barrel);
}

function playerFire() {
    if (botTurn) return; // Empêche le joueur de tirer pendant le tour du bot

    showClickText(() => {
        if (barrel[currentIndex]) {
            document.getElementById("message").innerText = "BAM ! Vous êtes mort.";
            playerScore = 0;
            imageContainer.innerHTML = '<img src="istockphoto-1218974323-612x612.jpg" alt="vous êtes mort">';
            setTimeout(() => {
                reloadGun();
            }, 1500); // Attente de 3 secondes avant de recharger
        } else {
            document.getElementById("message").innerText = "Clic ! Pas de balle. +10 points.";
            playerScore += 10;
            currentIndex++;
            imageContainer.innerHTML = '<img src="1f99ffe6-5b0e-42f8-a16e-483d80f97451.webp" alt="pas de balle">';
            if (currentIndex >= barrel.length) reloadGun();
        }
        updateScore();
    });
}

function passGun() {
    if (botTurn) return; // Empêche de passer le pistolet deux fois de suite
    botTurn = true;

    const imageContainer = document.getElementById("imageContainer");

    showClickText(() => {
        if (barrel[currentIndex]) {
            document.getElementById("message").innerText = "BAM ! Le bot est mort. +20 points.";
            playerScore += 20;
            imageContainer.innerHTML = '<img src="mortadversaire.jpg" alt="Victoire !">';
            setTimeout(() => {
                reloadGun();
                botTurn = false; // Le joueur reprend la main après le rechargement
            }, 1500); // Attente de 3 secondes avant de recharger
        } else {
            document.getElementById("message").innerText = "Clic ! Le bot réfléchit...";
            currentIndex++;
            if (currentIndex >= barrel.length) reloadGun();

            imageContainer.innerHTML = '<img src="20c4ebc7-ba99-40b4-b3fb-744976463bff.webp" alt="Le bot réfléchit...">';

            setTimeout(botFire, 2000); // Délai avant que le bot tire
        }
        updateScore();
    });
}

function botFire() {
    if (!botTurn) return; // Vérifie si c'est bien le tour du bot

    const botTarget = Math.random() < 0.5 ? "player" : "bot"; // Le bot choisit aléatoirement sa cible

    showClickText(() => {
        if (botTarget === "player") {
            if (barrel[currentIndex]) {
                document.getElementById("message").innerText = "BAM ! Le bot vous a tiré dessus. Vous êtes mort.";
                imageContainer.innerHTML = '<img src="istockphoto-1218974323-612x612.jpg">';
                playerScore = 0; // Réinitialise le score du joueur
                setTimeout(() => {
                    reloadGun();
                    botTurn = false; // Le joueur reprend la main
                }, 2000); // Attente de 3 secondes avant de recharger
            } else {
                document.getElementById("message").innerText = "Clic ! Le bot a tenté de vous tirer dessus, mais il n'y a pas de balle. C'est à votre tour.";
                currentIndex++;
                imageContainer.innerHTML = '<img src="table.webp">';
                if (currentIndex >= barrel.length) reloadGun();
                botTurn = false; // Le joueur reprend la main
            }
        } else {
            if (barrel[currentIndex]) {
                document.getElementById("message").innerText = "BAM ! Le bot s'est tiré dessus. +20 points pour vous.";
                playerScore += 20; // Ajoute des points au joueur
                imageContainer.innerHTML = '<img src="mortadversaire.jpg">';
                setTimeout(() => {
                    reloadGun();
                    botTurn = false; // Le joueur reprend la main
                }, 1500); // Attente de 3 secondes avant de recharger
            } else {
                document.getElementById("message").innerText = "Clic ! Le bot survit et réfléchit à nouveau...";
                currentIndex++;
                imageContainer.innerHTML = '<img src="table.webp">';
                if (currentIndex >= barrel.length) reloadGun();

                setTimeout(botFire, 2000); // Le bot réfléchit et rejoue après 2 secondes
            }
        }
        updateScore();
    });
}

function showClickText(callback) {
    document.getElementById("message").innerText = "Clic !"; // Affiche "Clic !"
    setTimeout(() => {
        callback(); // Exécute la fonction après un délai
    }, 300); // Attente avant d'exécuter l'action suivante
}

function updateScore() {
    document.getElementById("playerScore").innerText = playerScore;
}

function changeVolume() {
    var audio = document.getElementById("music");
    var volumeControl = document.getElementById("volumeControl");
    audio.volume = volumeControl.value; // Ajuste le volume selon la position du curseur
}
