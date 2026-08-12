const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`

const updateGoals = async (formData) => {
    const res = await fetch(`${BASE_URL}/users/goals`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.err);

    return data;
}

export {
    updateGoals,
}