const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const header = document.querySelector('.header');


const game = {
    ships: [],
    shipCount: 0,
    optionShip: {
        count: [1, 2, 3, 4],
        size: [4, 3, 2, 1]
    },
    generateShip() {
        for (let i = 0; i < this.optionShip.count.length; i++) {
            console.log('count: ' + this.optionShip.count[i]);
            for (let j = 0; j < this.optionShip.count[i]; j++) {
                console.log('size: ' + this.optionShip.size[i]);

                const size = this.optionShip.size[i];
                const ship = this.generationOptionsShip(size);

                this.ships.push(ship);
                this.shipCount++;
            }
        }
    },
    generateOptionsShip(shipSize) {
        const ship = {
            hit: [],
            location: [] 
    };

        const direction = Math.random() < 0.5;
        let x, y;

        if (direction) {
            x = Math.floor(Math.random() * 10);
            console.log(x);
            y = Math.floor(Math.random() * 10);
            console.log(y);
        }   else {
            x = Math.floor(Math.random() * 10);
            console.log(x);
            y = Math.floor(Math.random() * 10);
            console.log(y);
        }

        for (let i = 0; i < shipSize; i++) {
            if (direction) {
                ship.location.push(x + '' + (y+ i))
            }   else {
                ship.location.push((x + i) + '' + y)
            }
        }

        return ship;
    }
};

const play = {
    record: localStorage.getItem('seaBattleRecord') || 0,
    shot: 0,
    hit: 0,
    dead: 0,
    set updateData(data) {
        this[data] += 1;
        this.render();
    },
    render() {
        record.textContent = this.record;
        shot.textContent = this.shot;
        hit.textContent = this.hit;
        dead.textContent = this.dead;
    }
};


const show = {
    hit(elem) {
        this.changeClass(elem, 'hit');
    },
    miss(elem) {
        this.changeClass(elem, 'miss');
    },
    dead(elem) {
        this.changeClass(elem, 'dead');
    },
    changeClass(elem, value) {
        elem.className = value;
    }
};

const fire = (event) => {
    const target = event.target;
    
    if (target.tagName === 'TD' && target.classList.length == 0 && !game.shipCount) {
        play.updateData = 'shot';
        show.miss(target);

        for (let i = 0; i < game.ships.length; i++) {
            const ship = game.ships[i];
            const index = ship.location.indexOf(target.id);

            if (index >= 0) {
                show.hit(target);
                play.updateData = 'hit';
                ship.hit[index] = 'x';
                const life = ship.hit.indexOf('');

                if (life < 0) {
                    play.updateData = 'dead';

                    for (const id of ship.location) {
                        show.dead(document.getElementById(id));
                    }

                    game.shipCount -= 1;

                    if (!game.shipCount) {
                        header.textContent = 'Игра окончена!';
                        header.style.color = 'red';

                        if (play.shot < play.record || play.record === 0) {
                            localStorage.setItem('seaBattleRecord', play.shot);
                            play.record = play.shot;  
                            play.render();
                        }
                        
                    }
                }
            }
        }
    }
    
};

const init = () => {
    enemy.addEventListener('click', fire);
    play.render();

    game.generateShip();

    again.addEventListener('click', () => {
        location.reload();
    })

    record.addEventListener('dblclick', () => {
        localStorage.clear();
        play.record = 0;
        play.render();
    })

    console.log(game.ships);
    
};

init()
