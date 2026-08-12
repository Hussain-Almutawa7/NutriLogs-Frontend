import FoodForm from "../components/FoodForm";

function EditFood({}) {
    return (
        <main className="create-food">
            <section className="create-food-header">
                <h1>Create Custom Food</h1>
                <p>Add your own food and nutrition information.</p>
            </section>

            <section className="create-food-form">
                <FoodForm mode="edit" />
            </section>
        </main>
    );
}

export default EditFood;