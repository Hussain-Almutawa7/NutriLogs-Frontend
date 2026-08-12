import { useState } from "react";
import { createFood, editFood } from "../services/foodService";
import { useNavigate } from "react-router";

function FoodForm({ mode, foodId, food }) {

    const navigate = useNavigate();

    let initialState;

    if (mode === "edit") {
        initialState = {
            name: food.name,
            brand: food.brand ?? "",
            servingAmount: food.servingAmount,
            servingUnit: food.servingUnit,
            calories: food.calories,
            protein: food.protein ?? "",
            carbohydrates: food.carbohydrates ?? "",
            fat: food.fat ?? "",
        }
    } else {
        initialState = {
            name: "",
            brand: "",
            servingAmount: "",
            servingUnit: "",
            calories: "",
            protein: "",
            carbohydrates: "",
            fat: "",
        }
    }

    const [formData, setFormData] = useState(initialState)

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const foodData = {
                ...formData,
                servingAmount: Number(formData.servingAmount),
                calories: Number(formData.calories),
                protein: formData.protein === "" ? null : Number(formData.protein),
                carbohydrates: formData.carbohydrates === "" ? null : Number(formData.carbohydrates),
                fat: formData.fat === "" ? null : Number(formData.fat),
            };

            if (mode === "edit") {
                await editFood(foodId, foodData);
                navigate(`/foods/${foodId}`)
            } else {
                await createFood(foodData);
                navigate("/library");
            }
        } catch (e) {
            console.log(e.message);
        }
    }


    return (
        <div className="form-card">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} required />

                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" onChange={handleChange} value={formData.brand} />

                <label htmlFor="servingAmount">Serving Amount</label>
                <input type="number" name="servingAmount" id="servingAmount" onChange={handleChange} value={formData.servingAmount} required min={0.01} step={0.01} />

                <label htmlFor="servingUnit">Serving Unit</label>
                <input type="text" name="servingUnit" id="servingUnit" onChange={handleChange} value={formData.servingUnit} required />

                <label htmlFor="calories">Calories</label>
                <input type="number" name="calories" id="calories" onChange={handleChange} value={formData.calories} required min={0} step={0.01} />

                <label htmlFor="protein">Protein</label>
                <input type="number" name="protein" id="protein" onChange={handleChange} value={formData.protein} min={0} step={0.01} />

                <label htmlFor="carbohydrates">Carbohydrates</label>
                <input type="number" name="carbohydrates" id="carbohydrates" onChange={handleChange} value={formData.carbohydrates} min={0} step={0.01} />

                <label htmlFor="fat">Fat</label>
                <input type="number" name="fat" id="fat" onChange={handleChange} value={formData.fat} min={0} step={0.01} />

                <button type="submit">
                    {mode === "edit" ? "Save Changes" : "Add Food"}
                </button>

            </form>
        </div>
    );
}

export default FoodForm;