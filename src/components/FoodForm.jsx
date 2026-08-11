import { useState } from "react";

function FoodForm() {

    const initialState = {
        name: "",
        brand: "",
        servingAmount: "",
        servingUnit: "",
        calories: 0,
        protein: null,
        carbohydrates: null,
        fat: null,
    }

    const [formData, setFormData] = useState(initialState)

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
    }


    return (
        <main>
            <h1>All Food Info</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} />
            </form>
        </main>
    );
}

export default FoodForm;