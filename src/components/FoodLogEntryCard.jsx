import { Link } from "react-router";

function FoodLogEntryCard({ entry }) {
    return (
        <Link to={`/food-log/${entry._id}`}>
            <div className="food-log-entry">

                <div className="food-entry-header">
                    <div className="food-entry-info">
                        <h3>{entry.foodName}</h3>
                        {entry.brand && (
                            <p className="food-entry-brand">{entry.brand}</p>
                        )}
                        <p className="food-entry-serving">{entry.consumedAmount} {entry.consumedUnit}</p>
                    </div>

                    <span className="food-entry-time">{entry.time}</span>
                </div>

                <div className="food-entry-calories">
                    <span>{Math.round(entry.totalCalories)}</span>
                    <small>kcal</small>
                </div>

                <div className="food-entry-macros">
                    <div className="food-entry-macro">
                        <span>Protein</span>
                        <strong>{entry.totalProtein === null ? "N/A" : `${Math.round(entry.totalProtein)}g`}</strong>
                    </div>

                    <div className="food-entry-macro">
                        <span>Carbs</span>
                        <strong>{entry.totalCarbohydrates === null ? "N/A" : `${Math.round(entry.totalCarbohydrates)}g`}</strong>
                    </div>

                    <div className="food-entry-macro">
                        <span>Fat</span>
                        <strong>{entry.totalFat === null ? "N/A" : `${Math.round(entry.totalFat)}g`}</strong>
                    </div>
                </div>

            </div>
        </Link>
    );
}

export default FoodLogEntryCard;