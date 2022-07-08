import { notesToPlayInOrder } from "./music-to-play";
import { MusicalNote, BEATS_PER_MINUTE } from "./musical-score";

function getMiliSeconds(beats: number){
    const BEATS_PER_SEC = BEATS_PER_MINUTE/60;
    const BEATS_PER_Mili = (1/BEATS_PER_SEC)*1000;
    return BEATS_PER_Mili*beats;
}

function getAudioElem(Object: MusicalNote) {
    const PITCH = Object.pitch;
    const OCTAVE = Object.octave;
    const ACCIDENTAL = Object.accidental;

    let audioTagID: string = PITCH+OCTAVE.toString();
    if(ACCIDENTAL && (ACCIDENTAL === "F" || ACCIDENTAL === "S") ){
        audioTagID += ACCIDENTAL;
    }

    const audioElem = document.getElementById(audioTagID) as HTMLAudioElement;
    if(!audioElem) return;
    return audioElem;
}

function playSound(notes: MusicalNote[]) {
    if(!notes) return;
    const firstMusic = notes[0];
    const audioElem = getAudioElem(firstMusic) as HTMLAudioElement;
    audioElem?.play();
    console.log(firstMusic, getMiliSeconds(firstMusic.beats))
    setTimeout(() => {
        audioElem.pause();
        playSound(notes.slice(1, notes.length));
    }, getMiliSeconds(firstMusic.beats));
}

function playMusic() {
    const notes = notesToPlayInOrder;
    playSound(notes);
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
