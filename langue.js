/* Selecteur de langue. Meme regle que le jeu : on suit la langue de l'appareil
   par defaut, et un choix explicite la remplace. La difference avec Loc, c'est
   qu'ici il n'y a rien a persister entre deux visites — un legal.html se lit une
   fois — donc le choix ne vit que dans la page.

   Le HTML porte les deux langues. Ce fichier n'en MASQUE qu'une : sans lui, la
   page reste entierement lisible, les deux versions a la suite. C'est
   deliberement dans cet ordre — une politique de confidentialite qui devient
   blanche parce qu'un script n'a pas repondu est un motif de rejet. */

(function () {
    "use strict";

    var langues = ["fr", "en"];

    function appliquer(choix) {
        langues.forEach(function (l) {
            document.querySelectorAll("[data-langue=" + l + "]").forEach(function (n) {
                n.hidden = l !== choix;
            });
        });
        document.documentElement.lang = choix;
        document.querySelectorAll(".langues button").forEach(function (b) {
            b.setAttribute("aria-pressed", String(b.dataset.pour === choix));
        });
    }

    var depart = (navigator.language || "fr").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
    appliquer(depart);

    document.querySelectorAll(".langues button").forEach(function (b) {
        b.addEventListener("click", function () { appliquer(b.dataset.pour); });
    });
})();
