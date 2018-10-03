let arsenal = [{
        title: "baton",
        damage: 5,
        levelMin: 0,
        use: 15
    },
    {
        title: "couteau",
        damage: 10,
        levelMin: 10,
        use: 20
    },
    {
        title: "épée",
        damage: 15,
        levelMin: 20,
        use: 20
    },
    {
        title: "hache",
        damage: 20,
        levelMin: 30,
        use: 25
    }
];

class Personnage {
    constructor(nom, life, level, xp) {
        this.nom = nom;
        this.life = life;
        this.level = level;
        this.xp = xp;
        this.weapon = "";
    }

    selectWeapon() {
        if (this.level >= 0 && this.level < 10) {
            this.weapon = arsenal[0];
            return this.weapon;
        } else if (this.level >= 10 && this.level < 20) {
            this.weapon = arsenal[1];
            return this.weapon;
        } else if (this.level >= 20 && this.level < 30) {
            this.weapon = arsenal[2];
            return this.weapon;
        } else if (this.level >= 30) {
            this.weapon = arsenal[3];
            return this.weapon;
        }
    }

    receiveDamage(adversaire) {

        let hit = Math.round(Math.random() * this.selectWeapon()["damage"]);
        adversaire.life -= hit;
        if (hit == 0) {
            /// Points de VIE
            let hurt = adversaire.nom + " a évité le coup! \n";
            // gain d' EXPERIENCE
            adversaire.xp += this.selectWeapon()["damage"] * this.level;
            hurt += adversaire.nom + " gagne une expérience de " + (this.selectWeapon()["damage"] * this.level) + ".\n";
            return hurt;
        } else {
            /// Points de VIE
            let vie = adversaire.nom + " est blessé de " + hit + " points.\n";
            vie += adversaire.nom + " n'a plus que " + adversaire.life + " points de vie.\n";
            this.xp += hit * this.level;
            // gain d' EXPERIENCE
            vie += this.nom + " à maintenant une expérience de " + this.xp + ".\n";
            return vie;
        }
    }

    levelUp(adversaire) {
        if (this.xp >= 30 * this.level) {
            this.level++;
            return "Super! tu est passé au niveau " + this.level + '.\n';
        } else if (adversaire.xp >= 30 * this.level) {
            adversaire.level++;
            return "Votre ennemi à gagné un niveau !.\n";
        } else {

            //il vous reste xx point pour le niveau sup
            return '';
        }
    }

    attack(adversaire) {

        let text = this.nom + " attaque " + adversaire.nom + " avec l'arme " + this.selectWeapon()["title"] + "!\n";

        text += this.receiveDamage(adversaire);
        text += this.levelUp(adversaire);
        document.querySelector('#infoCast').innerHTML = text;
    }

};

// Appel CLASS
let lily = new Personnage("Lily", 100, 1, 10, "");
let oussama = new Personnage("Oussama", 100, 1, 12, "");

function player1Attack() {

    lily.attack(oussama)
}

function player2Attack() {

    oussama.attack(lily)
}

document.querySelector('#btn_player1').addEventListener('click', player1Attack);
document.querySelector('#btn_player2').addEventListener('click', player2Attack);