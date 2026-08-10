function WeeklyCaloriesChart({ week, calorieGoal }) {

    function getDayName(date) {
        const [year, month, day] = date.split("-").map(Number);

        const dateObject = new Date(year, month - 1, day);

        return dateObject.toLocaleDateString("en-US", { weekday: "short" });
    }

    function getBarPercentage(calories, goal) {
        if (goal === 0) return 0;

        return Math.min(calories / goal * 100, 100);
    }

    return (
        <div className="weekly-chart">
            {week.map(day => {
                return(
                    <div className="weekly-day" key={day.date}></div>
                );
            })}
        </div>
    );
}

export default WeeklyCaloriesChart;