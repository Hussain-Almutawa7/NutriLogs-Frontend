import { useEffect, useState } from "react";
import { getSummary } from "../services/foodLogService";

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
        <>
            <h1>Hello {user.username}</h1>
            <h2>Today's Nutrition</h2>

            <p>
                Calories: {summary.today.consumed.calories} / {summary.goals.calories}g
            </p>

            <p>
                Protien: {summary.today.consumed.protein} / {summary.goals.protein}g
            </p>

            <p>
                Carbohydrates: {summary.today.consumed.carbohydrates} / {summary.goals.carbohydrates}g
            </p>

            <p>
                Fat: {summary.today.consumed.fat} / {summary.goals.fat}g
            </p>

            <h2>Remaining</h2>

            <p>
                Calories: {summary.today.remaining.calories}
            </p>

            <p>
                Protein: {summary.today.remaining.protein}g
            </p>

            <p>
                Carbohydrates: {summary.today.remaining.carbohydrates}g
            </p>

            <p>
                Fat: {summary.today.remaining.fat}g
            </p>

            <h2>This Week</h2>

            {summary.week.map(day => (
                <div key={day.date}>
                    {day.date} : {day.calories} calories {day.protein}g {day.carbohydrates}g {day.fat}g 
                </div>
            ))}
        </>
    )
}

export default Dashboard;