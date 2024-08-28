function animateValue(id, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        document.getElementById(id).innerHTML = id === 'community-stat' ? value.toLocaleString() : value + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', (event) => {
    animateValue("visibility-stat", 0, 58, 2000);
    animateValue("trust-stat", 0, 71, 2000);
    animateValue("community-stat", 0, 100000, 2000);
});