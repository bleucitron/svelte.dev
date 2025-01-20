export async function roll() {
  // Récupère un nombre aléatoire entre 1 et 6
  // (avec un retard, pour pouvoir s'en rendre compte)
  return new Promise((fulfil, reject) => {
    setTimeout(() => {
      // simule un réseau instable
      if (Math.random() < 0.3) {
        reject(new Error('La requête a échoué'));
        return;
      }

      fulfil(Math.ceil(Math.random() * 6));
    }, 1000);
  });
}
