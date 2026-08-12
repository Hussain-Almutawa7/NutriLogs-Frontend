import { createEntry, editEntry } from "../services/foodLogService";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../utils/dateUtils";
import { formatTime } from "../utils/timeUtils";

function LogFoodForm({ food, foodId, externalId, entry, entryId, mode }) {

    const navigate = useNavigate();
    const today = new Date();

    let initialState;

    if (mode === "edit") {
        initialState = {
            consumedAmount: entry.consumedAmount,
            consumedUnit: entry.consumedUnit,
            date: entry.date,
            time: entry.time,
        };
    } else {
        initialState = {
            consumedAmount: food.servingAmount,
            consumedUnit: food.servingUnit,
            date: formatDate(today),
            time: formatTime(today),
        };
    }

    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const logData = { ...formData };

        try {
            if (mode === "edit") {
                await editEntry(entryId, logData);
                navigate(`/food-log/${entryId}`)
            } else {
                if (foodId)
                    logData.foodId = foodId;
                else
                    logData.externalId = externalId;

                await createEntry(logData);
                navigate("/food-log");
            }
        } catch (e) {
            console.log(e.mesage);
        }

    }

    return (
        <div>
            <h1>
                {mode === "edit" ? `Edit ${entry.foodName}` : `Add ${food.name}`}
            </h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="consumedAmount">Consumed Amount</label>
                <input type="number" name="consumedAmount" id="consumedAmount" onChange={handleChange} value={formData.consumedAmount} />

                <label htmlFor="consumedUnit">Consumed Unit</label>
                <input type="text" id="consumedUnit" name="consumedUnit" value={formData.consumedUnit} readOnly />

                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />

                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />

                <button type="submit">
                    {mode === "edit" ? "Save Changes" : "Log Food"}
                </button>

            </form>

        </div>
    );
}

export default LogFoodForm;