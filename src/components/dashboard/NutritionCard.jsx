function NutritionCard({ name, consumed, goal, remaining, unit }) {

    function getPercentage(consumed, goal) {
        if (goal === 0) return 0;

        return Math.min((consumed / goal) * 100, 100);
    }

    const percentage = getPercentage(consumed, goal);

    return (
        <div className="nutrition-card">
            <div className="nutrition-card-header">
                <h3>{name}</h3>
                <span>{Math.round(percentage)}%</span>
            </div>

            <p className="nutrition-value">{Math.round(consumed)} / {goal} {unit}</p>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>

            <p className="nutrition-remaining">Remaining: {Math.round(remaining)} {unit}</p>
        </div>
    );
}

export default NutritionCard;