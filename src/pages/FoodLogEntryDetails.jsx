import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { showEntry, deleteEntry } from "../services/foodLogService";
import { Link } from "react-router";
import ConfirmModal from "../components/ConfirmModal";

function FoodLogEntryDetails() {

    const { entryId } = useParams();
    const navigate = useNavigate();

    const [entry, setEntry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const fetchEntryDetails = async () => {
            try {
                const entryData = await showEntry(entryId);
                setEntry(entryData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEntryDetails();
    }, [entryId]);


    const handleDelete = async () => {
        try {
            await deleteEntry(entryId);
            navigate("/food-log");
        } catch (e) {
            setError(e.message);
        }
    }

    if (isLoading) return <p>Loading entry...</p>
    if (error) return <p>Error: {error}</p>
    if (!entry) return <p>No entry Found</p>

    return (
        <main className="entry-details">

            <section className="entry-details-card">
                <div className="entry-details-header">
                    <div>
                        <h1>{entry.foodName}</h1>

                        {entry.brand && (
                            <p className="entry-details-brand">{entry.brand}</p>
                        )}
                    </div>

                    <span className="food-source-badge">
                        {entry.source === "custom" ? "Custom" : "USDA"}
                    </span>
                </div>

                <div className="entry-details-consumed">
                    <div>
                        <span>Consumed Amount</span>
                        <strong>{entry.consumedAmount} {entry.consumedUnit}</strong>
                    </div>

                    <div>
                        <span>Date</span>
                        <strong>{entry.date}</strong>
                    </div>

                    <div>
                        <span>Time</span>
                        <strong>{entry.time}</strong>
                    </div>
                </div>

                <div className="entry-details-calories">
                    <strong>{Math.round(entry.totalCalories)}</strong>
                    <span>kcal consumed</span>
                </div>

                <div className="entry-details-macros">
                    <div>
                        <span>Protein</span>
                        <strong>
                            {entry.totalProtein === null ? "N/A" : `${Math.round(entry.totalProtein)}g`}
                        </strong>
                    </div>

                    <div>
                        <span>Carbohydrates</span>
                        <strong>
                            {entry.totalCarbohydrates === null ? "N/A" : `${Math.round(entry.totalCarbohydrates)}g`}
                        </strong>
                    </div>

                    <div>
                        <span>Fat</span>
                        <strong>
                            {entry.totalFat === null ? "N/A" : `${Math.round(entry.totalFat)}g`}
                        </strong>
                    </div>
                </div>

                <div className="entry-details-base">
                    <span>Nutrition based on</span>
                    <strong>{entry.baseAmount} {entry.baseUnit}</strong>
                </div>

                <div className="entry-details-actions">
                    <Link to={`/food-log/${entryId}/edit`}>
                        <button> Edit Entry</button>
                    </Link>

                    <button className="danger-button" onClick={() => setShowConfirm(true)}>
                        Delete Entry
                    </button>
                </div>
            </section>

            {showConfirm && (
                <ConfirmModal
                    message={`Are you sure you want to delete ${entry.foodName} from your food log?`}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </main>
    );
}

export default FoodLogEntryDetails;