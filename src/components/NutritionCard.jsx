function NutritionCard({ name, consumed, goal, remaining, unit }) {

    function getPercentage(consumed, goal) {
        if (goal === 0) return 0;

        return Math.min((consumed / goal) * 100, 100)
    }

    return (
        <div>
            <h3>{name}</h3>

            <p>{consumed} / {goal} {unit}</p>

            <p>
                Progress: {getPercentage(consumed, goal).toFixed(0)}%
            </p>

            <p>Remaining: {remaining} {unit}</p>
        </div>
    );
}

export default NutritionCard;