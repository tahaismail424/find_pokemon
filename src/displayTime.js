export default function msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    return (twoDigit(mins) + ':' + twoDigit(secs) + '.' + ms);
}

function twoDigit (time) {
    if ((time / 10) === 0) return ('0' + time);
    else return ('' + time);
}