# 🌿 Green Meal

A vegetarian recipe website developed using **React**, **Vite**, **Tailwind CSS**, **React Router**, and **Axios**.

🌐 Live Demo
🔗 [Green Meal - Live Website](https://greenmeal.netlify.app/)

## 🚀 **Technologies Used**
- **[React](https://react.dev/)** - Library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Fast build tool for React
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Navigation management between pages
- **[Axios](https://axios-http.com/)** - HTTP requests to Spoonacular API
- **[Netifly](https://app.netlify.com/)** - Deployment

## 🛠️ **Installation**

### 1️⃣ **Clone the repository**

git clone https://github.com/brandijsen/green-meal
cd your-repo

2️⃣ Install dependencies

npm install

3️⃣ Run the project in development mode

npm run dev
The project will be available at http://localhost:5173/.

🔑 Environment Variables
Before running the project, create a .env file in the root directory and add the following:

VITE_SPOONACULAR_API_KEY=your_api_key_here  

Replace your_api_key_here with your actual Spoonacular API key.

☁️ Deployment
This project is deployed using Netlify.

For deployment, follow these steps:

1- Push your project to GitHub (or another Git provider).
2- Create an account on Netlify and link your repository.
3- Set the build command: npm run build  
4- Set the publish directory to dist.
5- Add environment variables in Netlify settings (e.g., VITE_SPOONACULAR_API_KEY).
6- Deploy! 🎉

📂 Project Structure

/src
 ├── /components    # Reusable components
 ├── /pages         # Main pages of the website
 ├── /services      # API calls with Axios and reusable functions
 ├── /assets        # logo images
 ├── App.jsx        # Main component
 ├── main.jsx       # Entry point of the project
 ├── App.css        # Global styles with Tailwind

🌍 Main Features
✅ Vegetarian recipes: Search and display recipes without meat or fish
✅ Autocomplete search bar: Suggest recipes based on ingredients or name
✅ Advanced filters: Filter by meal type, diet, calories amount, healtyness, ecc.
✅ Dynamic pages: Each recipe has a page with details and ingredients
✅ Modern design: Clean and responsive interface with Tailwind CSS

🔗 API Used
The project uses the Spoonacular API to retrieve recipe data.

🔗 API Documentation



