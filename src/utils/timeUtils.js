function formatTime(time) {
    const date = new Date(time);

    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    }).format(date);
}

export {
    formatTime,
}