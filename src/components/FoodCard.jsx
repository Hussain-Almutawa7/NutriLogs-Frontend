import { Link } from "react-router";

function FoodCard({ food }) {
    return (
        <Link to={`/foods/${food._id}`}>
            <div className="food-card">
                <div className="food-card-header">
                    <div>
                        <h3>{food.name}</h3>
                        {food.brand && (
                            <p className="food-card-brand">{food.brand}</p>
                        )}
                    </div>
                    <span className="food-source-badge">Saved</span>
                </div>

                <div className="food-card-calories">
                    <strong>{Math.round(food.calories)}</strong>
                    <span>kcal</span>
                </div>

                <p className="food-card-serving">Per {food.servingAmoung} {food.servingUnit}</p>

                <div className="food-card-macros">
                    <div>
                        <span>Protien</span>
                        <strong>{food.protein === null ? "N/A" : `${Math.round(food.protein)}g`}</strong>
                    </div>

                    <div>
                        <span>Carbohydrates</span>
                        <strong>{food.carbohydrates === null ? "N/A" : `${Math.round(food.carbohydrates)}g`}</strong>
                    </div>

                    <div>
                        <span>Fat</span>
                        <strong>{food.fat === null ? "N/A" : `${Math.round(food.fat)}g`}</strong>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default FoodCard;