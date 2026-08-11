import { createEntry } from "../services/foodLogService";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../utils/dateUtils";
import { formatTime } from "../utils/timeUtils";

function LogFoodForm({ food }) {

    const navigate = useNavigate();
    const today = new Date();

    const inititalState = {
        consumedAmount: food.servingAmount,
        consumedUnit: food.servingUnit,
        date: formatDate(today),
        time: formatTime(today)
    }

    const [formData, setFormDate] = useState(inititalState);

    function handleChange(e) {
        setFormDate({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await createEntry(formData);
        navigate("/food-log");
    }

    return (
        <div>
            <h1>Add {food.name}</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="consumedAmount">Consumed Amount</label>
                <input type="number" name="consumedAmount" id="consumedAmount" onChange={handleChange} value={formData.consumedAmount} />

                <label htmlFor="consumedUnit">Consumed Unit</label>
                <input type="text" id="consumedUnit" name="consumedUnit" value={formData.consumedUnit} />

                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />

                <label htmlFor="time">Time</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />

            </form>

        </div>
    );
}

export default LogFoodForm;