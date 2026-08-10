import { useEffect, useState } from "react";
import { getSummary } from "../services/foodLogService";
import NutritionCard from "../components/NutritionCard";

function Dashboard({ user }) {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`
    }

    function getCurrentWeek() {
        const today = new Date();

        const day = today.getDay();

        const daySinceMonday = day === 0 ? 6 : day - 1;

        const start = new Date(today);
        start.setDate(today.getDate() - daySinceMonday);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return {
            startDate: formatDate(start),
            endDate: formatDate(end),
            today: formatDate(today),
        }
    }

    const [summary, setSummary] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSummaryDetails = async () => {
            try {
                const { startDate, endDate, today } = getCurrentWeek();

                const summaryData = await getSummary(startDate, endDate, today);
                setSummary(summaryData);

            } catch (e) {
                console.log("Error:", e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSummaryDetails();

    }, []);

    console.log(summary);

    if (isLoading) return <p>Loading Dashboard...</p>

    if (!summary) return <p>No Summary Details.</p>


    return (
        <main className="dashboard">

            <section className="dashboard-header">
                <h1>Hello {user.username}</h1>
                <p>Here's your nutrition progress for today</p>
            </section>

            <section className="nutrition-section">
                <h2>Today's Nutrition</h2>

                <div className="nutrition-cards">
                    <NutritionCard
                        name="Calories"
                        consumed={summary.today.consumed.calories}
                        goal={summary.goals.calories}
                        remaining={summary.today.remaining.calories}
                        unit="kcal"
                    />

                    <NutritionCard
                        name="Protein"
                        consumed={summary.today.consumed.protein}
                        goal={summary.goals.protein}
                        remaining={summary.today.remaining.protein}
                        unit="g"
                    />

                    <NutritionCard
                        name="Carbohydrates"
                        consumed={summary.today.consumed.carbohydrates}
                        goal={summary.goals.carbohydrates}
                        remaining={summary.today.remaining.carbohydrates}
                        unit="g"
                    />

                    <NutritionCard
                        name="Fat"
                        consumed={summary.today.consumed.fat}
                        goal={summary.goals.fat}
                        remaining={summary.today.remaining.fat}
                        unit="g"
                    />
                </div>
            </section>

            <section className="weekly-section">
                <h2>This Week</h2>
                {summary.week.map(day => (
                    <div key={day.date}>
                        {day.date} : {day.calories} calories {day.protein}g {day.carbohydrates}g {day.fat}g
                    </div>
                ))}
            </section>

        </main>
    )
}

export default Dashboard;