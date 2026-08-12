import FoodForm from "../../components/food/FoodForm";

function CreateFood() {
    return (
        <main className="create-food">
            <section className="create-food-header">
                <h1>Create Custom Food</h1>
                <p>Add your own food and nutrition information.</p>
            </section>

            <section className="create-food-form">
                <FoodForm mode="create" />
            </section>
        </main>
    );
}

export default CreateFood;