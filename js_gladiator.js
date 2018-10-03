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
    }];

class Personnage {
    constructor(nom, life, level, force, xp) {
        this.nom = nom;
        this.life = life;
        this.level = level;
        this.force = force;
        this.xp = xp;
        this.weapon = "";
    }
    selectWeapon() {
        if (this.level >= 0 && this.level < 10) {
            this.weapon = arsenal[0]["title"];
            return this.weapon;
        } else if (this.level >= 10 && this.level < 20) {
            this.weapon = arsenal[1]["title"];
            return this.weapon;
        } else if (this.level >= 20 && this.level < 30) {
            this.weapon = arsenal[2]["title"];
            return this.weapon;
        }  else if (this.level >= 30) {
            this.weapon = arsenal[3]["title"];
            return this.weapon;
}

let lily = new Personnage("lily", 100, 0, 10, 0, "");

console.log(lily.selectWeapon());
