import { Link } from "react-router";
import { favoriteFood } from "../services/foodService";

function FoodCard({ food, onFoodUpdated }) {

    const handleFavorite = async () => {
        try {
            await favoriteFood(food._id, !food.isFavorite);
            onFoodUpdated();
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="food-card">
            <Link to={`/foods/${food._id}`}>
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

                <p className="food-card-serving">Per {food.servingAmount} {food.servingUnit}</p>

                <div className="food-card-macros">
                    <div>
                        <span>Protein</span>
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
            </Link>

            <div className="food-details-actions">
                <button onClick={handleFavorite}>{food.isFavorite ? "Unfavorite Food" : "Favorite Food"}</button>

                <Link to={`/foods/${food._id}/log`}>
                    <button>Add to Log</button>
                </Link>
            </div>
        </div>
    )
}

export default FoodCard;