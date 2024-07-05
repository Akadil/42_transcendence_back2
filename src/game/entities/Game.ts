export class Game {
    constructor() {
        console.log('Game created');
    }

    /* ********************************************************************** */
    /* Lifecycle methods                                                      */
    /* ********************************************************************** */
    start() {
        console.log('Game started');
    }

    pause() {
        console.log('Game stopped');
    }

    unPause() {
        console.log('Game unpaused');
    }

    update() {
        console.log('Game updated');
    }

    /* ********************************************************************** */
    /* Game loop                                                             */
    /* ********************************************************************** */
    loop() {
        console.log('Game loop');
    }

    get live() {
        return {};
    }
}
