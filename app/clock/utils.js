export function getTimerValues(){
    let seconds = [];
    let minutes = [];

    for (let i = 0; i < 60; i++) {
        seconds.push(i);
        minutes.push(i);
    }

    return {seconds, minutes};
}