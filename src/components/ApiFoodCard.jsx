import { Link } from "react-router";

function ApiFoodCard({ apiFood, savedFood }) {
    const detailsPath = savedFood ? `/foods/${savedFood._id}` : `/nutrition/${apiFood.externalId}`;

    return (
        <Link to={detailsPath}>
            <div className="food-card">
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
                        <span className="food-source-badge api"> USDA</span>
                    )}
                </div>

                <div className="food-card-calories">
                    <strong>{Math.round(apiFood.calories)}</strong>
                    <span>kcal</span>
                </div>

                <p className="food-card-serving">Per {apiFood.servingAmount} {apiFood.servingUnit}</p>

                <div className="food-card-macros">
                    <div>
                        <span>Protien</span>
                        <strong>{apiFood.protein === null ? "N/A" : `${Math.round(apiFood.protein)}g`}</strong>
                    </div>

                    <div>
                        <span>Carbohydrates</span>
                        <strong>{apiFood.carbohydrates === null ? "N/A" : `${Math.round(apiFood.carbohydrates)}g`}</strong>
                    </div>

                    <div>
                        <span>Fat</span>
                        <strong>{apiFood.fat === null ? "N/A" : `${Math.round(apiFood.fat)}g`}</strong>
                    </div>

                </div>
            </div>
        </Link>
    );
}

export default ApiFoodCard;