# NutriLogs

*A full-stack nutrition tracking application that allows users to log food, monitor daily nutrition, set nutrition goals, search USDA foods, create custom foods, and manage a personal food library.*

<img width="2327" height="1352" alt="image" src="https://github.com/user-attachments/assets/f482b656-59ea-4f60-81f8-8a2f557bfa7a" />

## Getting Started

### Deployed Application

[NutriLogs Live Website](YOUR_DEPLOYED_FRONTEND_URL)

### GitHub Repositories

[NutriLogs Frontend Repository](https://github.com/Hussain-Almutawa7/NutriLogs-Frontend)

[NutriLogs Backend Repository](https://github.com/Hussain-Almutawa7/NutriLogs-Backend)

## Features

### Authentication

* Create an account.
* Sign in and sign out securely.
* JWT-based authentication.
* Protected frontend and backend functionality.
* Users can only access and modify their own data.

### Dashboard

* View today's calories, protein, carbohydrates, and fat.
* Compare consumed nutrition against personal daily goals.
* View remaining nutrition for the day.
* View weekly calorie activity.

### Nutrition Goals

* Set daily goals for:

  * Calories
  * Protein
  * Carbohydrates
  * Fat
* Update goals at any time.
* Dashboard progress automatically uses the updated goals.

### Browse and USDA Search

* Browse saved foods.
* Search foods using USDA FoodData Central.
* View USDA food nutrition details.
* Favorite USDA foods to save them to the personal library.
* Unfavorite saved foods.
* Add USDA foods directly to the Food Log.

### Custom Foods

* Create custom foods.
* View custom food details.
* Edit custom foods.
* Delete custom foods.
* Favorite and unfavorite custom foods.

### Food Log

* Add saved or USDA foods to the Food Log.
* Enter consumed amount, date, and time.
* View food entries for a selected date.
* View individual food log details.
* Edit food log entries.
* Delete food log entries.
* Automatically calculate calories and macronutrients based on the consumed amount.

### Library

The Library contains:

* **Favorite Foods:** Custom and USDA foods marked as favorites.
* **My Foods:** Foods created manually by the user.

## How to Use

1. Open NutriLogs.
2. Create an account or sign in.
3. View the Dashboard to monitor daily nutrition.
4. Update daily nutrition targets from **Edit Goals**.
5. Open **Browse** to search USDA foods or view saved foods.
6. Favorite a USDA food to save it to the Library.
7. Select **Add to Log** to record a food you consumed.
8. Enter the consumed amount, date, and time.
9. Open **Food Log** to view, edit, or delete logged foods.
10. Open **Library** to manage favorite and custom foods.
11. Select **Create Custom Food** to add your own food.

## Installation

NutriLogs uses separate frontend and backend projects.

### Frontend

Clone the frontend repository:

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
cd NutriLogs-Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

### Backend

Clone the backend repository:

```bash
git clone https://github.com/Hussain-Almutawa7/NutriLogs-Backend.git
cd NutriLogs-Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
USDA_API_KEY=your_usda_api_key
PORT=3000
```

Start the backend:

```bash
npm run dev
```

The backend normally runs at:

```text
http://localhost:3000
```

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript
* React
* React Router
* Vite

### Backend

* Node.js
* Express.js
* REST API
* USDA FoodData Central API

### Database

* MongoDB
* Mongoose

### Authentication and Packages

* JSON Web Token (JWT)
* bcrypt
* cors
* dotenv
* morgan

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* Nodemon

## Application Architecture

NutriLogs follows a MERN-style architecture with separate React frontend and Express backend applications.

### Frontend

* **Pages:** Main application screens.
* **Components:** Reusable UI elements and forms.
* **Services:** Communicate with the backend API.
* **Utilities:** Handle reusable date and time formatting.
* **React Router:** Handles client-side navigation.

### Backend

* **Models:** Define MongoDB data using Mongoose.
* **Controllers:** Handle application logic and responses.
* **Middleware:** Handles JWT authentication.
* **Services:** Communicate with USDA FoodData Central.
* **Routes:** Connect HTTP requests to controller functions.

## Database Structure

NutriLogs uses three main models:

### User

Stores:

* Username
* Hashed password
* Calorie goal
* Protein goal
* Carbohydrate goal
* Fat goal

### Food

Stores custom and saved USDA foods, including:

* Owner
* USDA external ID
* Source
* Name
* Brand
* Serving information
* Calories
* Protein
* Carbohydrates
* Fat
* Favorite status

### FoodLogEntry

Stores a snapshot of consumed food, including:

* User
* Food reference
* Food name and brand
* Source
* Date and time
* Consumed amount and unit
* Nutrition per base serving
* Total calories and macronutrients

Nutrition values are stored directly in each log entry so historical logs remain accurate even if the original Food is later edited or deleted.

## CRUD Functionality

### Food CRUD

* **Create:** Create custom foods.
* **Read:** Browse and view foods.
* **Update:** Edit owned custom foods.
* **Delete:** Delete owned custom foods.

### Food Log CRUD

* **Create:** Add foods to the Food Log.
* **Read:** View daily logs and individual entries.
* **Update:** Edit consumed amount, date, or time.
* **Delete:** Remove entries.

Nutrition totals are calculated using:

```text
multiplier = consumedAmount / baseAmount
```

The multiplier is applied to calories, protein, carbohydrates, and fat.

## USDA Integration

NutriLogs uses the USDA FoodData Central API to retrieve:

* Food names
* Brands
* Calories
* Protein
* Carbohydrates
* Fat
* Serving information

The USDA API key is stored only on the backend.

USDA data is normalized before being returned to the React frontend.

When a USDA food is favorited, NutriLogs stores a local Food record linked to its USDA external ID.

## Error Handling and User Feedback

NutriLogs includes:

* Loading indicators.
* USDA search loading feedback.
* Empty Food Log states.
* Empty Library states.
* Empty search results.
* API error messages.
* Delete confirmation dialogs.
* A custom 404 page.

## Responsive Design

NutriLogs uses a responsive dark interface with:

* Reusable cards.
* Responsive food grids.
* Flexible dashboard layouts.
* Mobile-friendly forms.
* Hover transitions and animations.
* Consistent colors and spacing.

## Future Enhancements

* Add meal categories such as breakfast, lunch, dinner, and snacks.
* Add monthly nutrition reports.
* Add weight tracking.
* Add recipe creation.
* Add nutrients such as fiber, sugar, and sodium.
* Add unit conversion.
* Add barcode scanning.
* Add USDA search pagination.
* Add account settings and password recovery.

## Credits

Food and nutrition data is provided by [USDA FoodData Central](https://fdc.nal.usda.gov/).

NutriLogs was developed using React, Node.js, Express, MongoDB, and the USDA FoodData Central API.
