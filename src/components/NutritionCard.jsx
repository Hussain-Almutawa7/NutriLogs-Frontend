function NutritionCard({ name, consumed, goal, remaining, unit }) {

    function getPercentage(consumed, goal) {
        if (goal === 0) return 0;

        return Math.min((consumed / goal) * 100, 100)
    }

    const percentage = getPercentage(consumed, goal);

    return (
        <div className="nutrition-card">

            <div className="nutrition-card-header">
                <h3>{name}</h3>
                <span>{percentage.toFixed(0)}%</span>
            </div>

            <p className="nutrition-value">{consumed.toFixed(0)} / {goal} {unit}</p>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>

            <p className="nutrition-remaining">Remaining: {remaining.toFixed(0)} {unit}</p>
        </div>
    );
}

export default NutritionCard;