import { useEffect, useState } from "react";

function Dashboard({ user }) {

    return (
        <>
            <h1>Hello {user.username}</h1>
            <p>Your nutrition dadhboard will be here.</p>
        </>
    )
}

export default Dashboard;