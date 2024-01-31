const targetDate = new Date(prompt('Enter Start Date (YYYY-MM-DDTHH:MM:SS) where YYYY = Year, MM = Month, DD = Day, HH = Hour, MM = Minute and SS = Second.'))

const updateCountdown = () => {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (difference < 0) {
        clearInterval(interval);
        document.getElementById("timer").innerText = "Countdown has finished!";
    }
}
const interval = setInterval(updateCountdown, 1000);