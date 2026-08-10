import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { getEntries } from "../services/foodLogService";

function FoodLog() {
    function getCurrentDate() {
        const today = new Date();
        return formatDate(today);
    }

    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    useEffect(() => {
        const fetchEntryDetails = async () => {
            setError("");
            setIsLoading(true);

            try {
                const entriesData = await getEntries(selectedDate);
                setEntries(entriesData);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEntryDetails();
    }, [selectedDate]);

    function handleChange(e) {
        setSelectedDate(e.target.value);
    }

    return (
        <main>
            <h1>Food Log</h1>
            <input type="date" value={selectedDate} onChange={handleChange} />

            {isLoading ? (
                <p>Loading Food Logs...</p>
            ) : error ? (
                <p>Error Occurred: {error}</p>
            ) : entries.length === 0 ? (
                <p>No food log entries.</p>
            ) : (
                entries.map(entry => (
                    <div key={entry._id}>
                        <p>{entry.time}</p>
                        <p>{entry.foodName}</p>
                        <p>{entry.consumedAmount} {entry.consumedUnit}</p>
                        <p>{entry.totalCalories} Kcal</p>
                        <p>{entry.totalProtein === null ? "N/A" : entry.totalProtein + "g"} Protein</p>
                        <p>{entry.totalCarbohydrates === null ? "N/A" : entry.totalCarbohydrates + "g"} Carbohydrates</p>
                        <p>{entry.totalFat === null ? "N/A" : entry.totalFat + "g"} Fat</p>
                    </div>
                ))
            )}

        </main>
    );
}

export default FoodLog;