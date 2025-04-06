## Run Instructions
1. Clone the repository
2. Create a PostgreSQL database in a Docker container:
    1. Run the command `docker run --name lightsout-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=lightsout -p 5432:5432 -v lightsout_data:/var/lib/postgresql/data -d postgres:16`.
3. Start the backend:
    1. Navigate to the backend root directory (/com.example.lightsout)
    2. Run `mvn quarkus:dev` to start the backend server
4. Start the frontend:
    1. Navigate to the frontend root directory (/frontend)
    2. Run `npm install` to install the dependencies (node_modules)
    3. Run `npm start` to start the development server
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

