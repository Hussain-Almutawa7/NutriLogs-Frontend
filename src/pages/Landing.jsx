import { Link } from "react-router";

function Landing() {
    return (
        <div className="landing">
            <h1>NutriLogs</h1>
            <p>
                Track your food, nutrition goals, and daily progress
                in one simple place. Sign in or create an account to begin.
            </p>

            <div className="landing-actions">
                <Link to="/sign-up">
                    <button>Create Account</button>
                </Link>

                <Link to="/sign-in">
                    <button className="secondary-button">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;