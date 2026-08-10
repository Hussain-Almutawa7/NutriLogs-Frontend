import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { getEntries } from "../services/foodLogService";
import FoodLogEntryCard from "../components/FoodLogEntryCard";

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
        <main className="food-log">

            <section className="food-log-header">
                <div>
                    <h1>Food Log</h1>
                    <p>Track what you eat throughout the day.</p>
                </div>

                <div className="food-log-date">
                    <label htmlFor="log-date">Date</label>
                    <input id="log-date" type="date" value={selectedDate} onChange={handleChange} />
                </div>
            </section>

            <section className="food-log-content">
                {isLoading ? (
                    <p className="food-log-message">Loading Food Logs...</p>
                ) : error ? (
                    <p className="food-log-message error-message">Error Occurred: {error}</p>
                ) : entries.length === 0 ? (
                    <div className="food-log-empty">
                        <h3>No food logged.</h3>
                        <p>You haven't logged any food for this day.</p>
                    </div>
                ) : (
                    <div className="food-log-list">
                        {entries.map(entry => (
                            <FoodLogEntryCard key={entry._id} entry={entry} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default FoodLog;