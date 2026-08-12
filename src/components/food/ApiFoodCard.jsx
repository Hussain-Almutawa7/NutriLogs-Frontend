import { Link } from "react-router";
import { favoriteFood, importFood } from "../../services/foodService";

function ApiFoodCard({ apiFood, savedFood, onFoodUpdated }) {

    const detailsPath = savedFood ? `/foods/${savedFood._id}` : `/nutrition/${apiFood.externalId}`;
    const logPath = savedFood ? `/foods/${savedFood._id}/log` : `/nutrition/${apiFood.externalId}/log`;

    const handleFavorite = async () => {
        try {
            if (savedFood) {
                await favoriteFood(savedFood._id, false);
            } else {
                await importFood(apiFood.externalId);
            }

            onFoodUpdated?.();
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="food-card">

            <Link to={detailsPath}>
                <div className="food-card-header">
                    <div>
                        <h3>{apiFood.name}</h3>

                        {apiFood.brand && (
                            <p className="food-card-brand">{apiFood.brand}</p>
                        )}
                    </div>

                    {savedFood ? (
                        <span className="food-source-badge">Saved</span>
                    ) : (
                        <span className="food-source-badge api">USDA</span>
                    )}
                </div>

                <div className="food-card-calories">
                    <strong>{Math.round(apiFood.calories)}</strong>
                    <span>kcal</span>
                </div>

                <p className="food-card-serving">
                    Per {apiFood.servingAmount} {apiFood.servingUnit}
                </p>

                <div className="food-card-macros">
                    <div>
                        <span>Protein</span>
                        <strong>
                            {apiFood.protein === null ? "N/A" : `${Math.round(apiFood.protein)}g`}
                        </strong>
                    </div>

                    <div>
                        <span>Carbohydrates</span>
                        <strong>
                            {apiFood.carbohydrates === null ? "N/A" : `${Math.round(apiFood.carbohydrates)}g`}
                        </strong>
                    </div>

                    <div>
                        <span>Fat</span>
                        <strong>
                            {apiFood.fat === null ? "N/A" : `${Math.round(apiFood.fat)}g`}
                        </strong>
                    </div>
                </div>
            </Link>

            <div className="food-details-actions">
                <button onClick={handleFavorite}>
                    {savedFood ? "Unfavorite Food" : "Favorite Food"}
                </button>

                <Link to={logPath}>
                    <button>Add to Log</button>
                </Link>
            </div>
        </div>
    );
}

export default ApiFoodCard;