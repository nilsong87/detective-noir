class SoundManager {
    constructor() {
        this.sounds = {
            click: this.createSound('assets/sounds/click.wav', 0.20),
            travel: this.createSound('assets/sounds/travel.wav', 0.20),
            clue: this.createSound('assets/sounds/clue.wav', 0.20),
            success: this.createSound('assets/sounds/success.wav', 0.20),
            failure: this.createSound('assets/sounds/failure.wav', 0.20),
            mainTheme: this.createSound('assets/sounds/main_theme.mp3', 0.20, true)
        };
        this.mainThemeId = null;
        this.isMainThemePlaying = false;
        this.pausedSeek = 0;
    }

    createSound(src, volume, loop = false) {
        return new Howl({
            src: [src],
            volume,
            loop,
            onplayerror: function() {
                console.error('Error playing sound:', src);
                this.once('unlock', function() {
                    this.play();
                });
            }
        });
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`Sound "${soundName}" not found.`);
            return;
        }

        if (soundName === 'mainTheme') {
            if (!this.isMainThemePlaying) {
                this.mainThemeId = sound.play();
                sound.seek(this.pausedSeek);
                sound.fade(0, 0.3, 1000, this.mainThemeId);
                this.isMainThemePlaying = true;
            }
        } else {
            sound.play();
        }
    }

    stop(soundName) {
        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`Sound "${soundName}" not found.`);
            return;
        }

        if (soundName === 'mainTheme') {
            if (this.isMainThemePlaying) {
                sound.fade(0.3, 0, 1000, this.mainThemeId);
                setTimeout(() => {
                    sound.stop(this.mainThemeId);
                    this.isMainThemePlaying = false;
                    this.pausedSeek = 0;
                }, 1000);
            }
        } else {
            sound.stop();
        }
    }

    pause(soundName) {
        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`Sound "${soundName}" not found.`);
            return;
        }

        if (soundName === 'mainTheme') {
            if (this.isMainThemePlaying) {
                this.pausedSeek = sound.seek(this.mainThemeId);
                sound.pause(this.mainThemeId);
                this.isMainThemePlaying = false;
            }
        } else {
            sound.pause();
        }
    }

    resume(soundName) {
        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`Sound "${soundName}" not found.`);
            return;
        }

        if (soundName === 'mainTheme') {
            if (!this.isMainThemePlaying) {
                if (this.mainThemeId === null) {
                    this.mainThemeId = sound.play();
                } else {
                    sound.play(this.mainThemeId);
                }
                sound.seek(this.pausedSeek);
                sound.fade(0, 0.3, 1000, this.mainThemeId);
                this.isMainThemePlaying = true;
            }
        } else {
            sound.play();
        }
    }

    toggleMainTheme() {
        if (this.isMainThemePlaying) {
            this.pause('mainTheme');
        } else {
            this.resume('mainTheme');
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