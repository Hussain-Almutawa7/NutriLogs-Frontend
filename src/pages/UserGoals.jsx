import { useState, useEffect } from "react";
import { getSummary } from "../services/foodLogService";
import { formatDate } from "../utils/dateUtils";
import { updateGoals } from "../services/userService";

function UserGoals({ user }) {

    const [userGoals, setUserGoals] = useState();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date;
    const formatedDate = formatDate(today);

    useEffect(() => {
        const fetchSummarygoals = async () => {
            try {
                const summaryData = await getSummary(formatedDate);
                setUserGoals(summaryData.goals)
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchSummarygoals();
    }, []);

    const initialState = {
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: ""
    }

    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
    }

    if (isLoading) return <p>Loading Dashboard...</p>
    if (error) return <p>Error Occured: {error}</p>
    if (!userGoals) return <p>No Summary Details.</p>

    return (
        <main className="user-goals">

            <section className="user-goals-header">
                <h1>Nutrition Goals</h1>
                <p>Set your daily calorie and macronutrient goals.</p>
            </section>

            <section className="user-goals-card">
                <form onSubmit={handleSubmit}>
                    <div className="user-goals-field">
                        <label htmlFor="calories">Calories</label>
                        <input type="number" id="calories" name="calories" onChange={handleChange} value={userGoals.calories} />
                        <span>kcal per day</span>
                    </div>

                    <div className="user-goals-field">
                        <label htmlFor="protein">Protein</label>
                        <input type="number" id="protein" name="protein" onChange={handleChange} value={userGoals.protein} />
                        <span>g per day</span>
                    </div>

                    <div className="user-goals-field">
                        <label htmlFor="carbohydrates">Carbohydrates</label>
                        <input type="number" id="carbohydrates" name="carbohydrates" onChange={handleChange} value={userGoals.carbohydrates} />
                        <span>g per day</span>
                    </div>

                    <div className="user-goals-field">
                        <label htmlFor="fat">Fat</label>
                        <input type="number" id="fat" name="fat" onChange={handleChange} value={userGoals.fat} />
                        <span>g per day</span>
                    </div>

                    <div className="user-goals-actions">
                        <button type="submit">Save Goals</button>
                    </div>
                </form>
            </section>

        </main>
    );
}

export default UserGoals;