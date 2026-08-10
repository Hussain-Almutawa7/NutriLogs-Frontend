function FoodLogEntryCard({ entry }) {
    return (
        <div>
            <p>{entry.time}</p>
            <p>{entry.foodName}</p>
            <p>{entry.brand ? entry.brand : ""}</p>
            <p>{entry.consumedAmount} {entry.consumedUnit}</p>
            <p>{entry.totalCalories} Kcal</p>
            <p>{entry.totalProtein === null ? "N/A" : entry.totalProtein + "g"} Protein</p>
            <p>{entry.totalCarbohydrates === null ? "N/A" : entry.totalCarbohydrates + "g"} Carbohydrates</p>
            <p>{entry.totalFat === null ? "N/A" : entry.totalFat + "g"} Fat</p>
        </div>
    );
}

export default FoodLogEntryCard;