class SoundManager {
    constructor() {
        this.sounds = {
            click: this.createSound('assets/sounds/click.wav', 0.2),
            travel: this.createSound('assets/sounds/travel.wav', 0.10),
            clue: this.createSound('assets/sounds/clue.wav', 0.16),
            success: this.createSound('assets/sounds/success.wav', 0.2),
            failure: this.createSound('assets/sounds/failure.wav', 0.2),
            mainTheme: this.createSound('assets/sounds/main_theme.mp3', 0, true)
        };
    }

    createSound(src, volume, loop = false) {
        return new Howl({
            src: [src],
            volume,
            loop
        });
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.play();
        } else {
            console.warn(`Sound "${soundName}" not found.`);
        }
    }

    stop(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.stop();
        } else {
            console.warn(`Sound "${soundName}" not found.`);
        }
    }

    setVolume(soundName, volume) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.volume(volume);
        } else {
            console.warn(`Sound "${soundName}" not found.`);
        }
    }
}

class StorageManager {
    constructor(saveKey = 'detectiveNoirSave') {
        this.saveKey = saveKey;
    }

    saveGame(data) {
        try {
            localStorage.setItem(this.saveKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }

    loadGame() {
        try {
            const data = localStorage.getItem(this.saveKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load game:', error);
            return null;
        }
    }

    clearSave() {
        localStorage.removeItem(this.saveKey);
    }

    hasSave() {
        return localStorage.getItem(this.saveKey) !== null;
    }
}

class Utilities {
    static randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffleArray(array) {
        if (!Array.isArray(array)) {
            throw new Error('Input must be an array');
        }

        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    static formatTime(minutes) {
        if (isNaN(minutes)) {
            return '0h 0m';
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    static animateElement(element, animation, callback = null) {
        if (!element || !animation) {
            console.warn('Element and animation parameters are required');
            return;
        }

        element.classList.add('animate__animated', `animate__${animation}`);
        
        const handleAnimationEnd = () => {
            element.classList.remove('animate__animated', `animate__${animation}`);
            element.removeEventListener('animationend', handleAnimationEnd);
            
            if (typeof callback === 'function') {
                callback();
            }
        };
        
        element.addEventListener('animationend', handleAnimationEnd);
    }
}

export { SoundManager, StorageManager, Utilities };