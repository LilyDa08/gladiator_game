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
        if (this.level >= 0 && this.level < 5) {
            this.weapon = arsenal[0];
            return this.weapon;
        } else if (this.level >= 5 && this.level < 20) {
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

        if (hit == 0) {
            /// Points de VIE
            let hurt = adversaire.nom + " a évité le coup!<br/>";
            // gain d' EXPERIENCE
            adversaire.xp += this.selectWeapon()["damage"] * this.level;
            hurt += adversaire.nom + " gagne " + (this.selectWeapon()["damage"] * this.level) + " points d'expérience.<br/>";
            return hurt;
        } else {
            adversaire.life -= hit;
            if (adversaire.life <= 0) {
                document.querySelector("#btn_player1").style.display = "none";
                document.querySelector("#btn_player2").style.display = "none";
                document.querySelector("#victoire").innerHTML = this.nom + " a massacré son adversaire !<br/>";
                document.querySelector('#replay').style.display = "block";
                return adversaire.nom + " est mort !<br/>";
            } else {
                /// Points de VIE
                let vie = adversaire.nom + " est blessé de " + hit + " points.<br/>";
                vie += adversaire.nom + " n'a plus que " + adversaire.life + " points de vie.<br/>";
                this.xp += hit * this.level;
                // gain d' EXPERIENCE
                vie += this.nom + " à maintenant une expérience de " + this.xp + ".<br/>";
                return vie;
            }
        }
    }
    levelUp(adversaire) {

        if (this.xp >= 5 * this.level * this.selectWeapon()['damage']) {

            this.level++;
            this.xp = 0;
            document.querySelector('#level_1').innerHTML = "Level " + this.level;
            return "Super! tu est passé au niveau " + this.level + '.<br/>';

        } else if (adversaire.xp >= 5 * this.selectWeapon()['damage']) {
            adversaire.level++;
            adversaire.xp = 0;
            document.querySelector('#level_2').innerHTML = "Level " + adversaire.level;
            return adversaire.nom + " à gagné un niveau !<br/>";
        } else {

            //il vous reste xx point pour le niveau sup
            return '';
        }
    }

    attack(adversaire) {

        let text = this.nom + " attaque " + adversaire.nom + " avec l'arme " + this.selectWeapon()["title"] + "!<br/>";
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

function newGame() {
    document.location.reload();
}
document.querySelector('#replay').addEventListener('click', newGame);

document.querySelector('#btn_player1').addEventListener('click', player1Attack);
document.querySelector('#btn_player2').addEventListener('click', player2Attack);
