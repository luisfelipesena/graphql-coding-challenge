# GraphQL coding challenge

## Getting Started

This project is a GraphQL coding challenge that involves parsing XML data, producing JSON, and creating a GraphQL endpoint for vehicle makes and types.

### Prerequisites

- Node.js (v20.12.0 or later)
- Docker (v20.12.0 or later)


### Installation and Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.sample` file to `.env`:
     ```
     cp .env.sample .env
     ```
   - Edit the `.env` file and fill in the necessary environment variables.

4. Generate and migrate the database schema:
   ```
   docker compose up -d
   npm run drizzle:generate
   npm run drizzle:migrate
   ```

5. Start the application:
   ```
   npm run start
   ```

6. (Optional) To view the database, run:
   ```
   npm run drizzle:studio
   ```

After completing these steps, you should be able to access the GraphQL playground and interact with the API.

### Running with Docker

If you prefer to use Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t graphql-challenge .
   ```

2. Run the Docker container:
   ```
   docker compose up -d
   docker run -p 3000:3000 graphql-challenge
   ```

The GraphQL playground will be available at `http://localhost:3000/`.



### Project Requirements

#### Hard Requirements:

1. Service must parse XML:
   - Parse all the Makes from: https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML
   - Get all the Vehicle Types per Make: https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/440?format=xml

2. Service must produce JSON:
   - Combine all the XML information into a single JSON object
   - Produce an array of objects with all the information from the XML endpoints

3. The JSON must look like the following:
   https://gist.github.com/malachigrant/d340c68bd8dbc54cb53214d42748bd5b

4. Service must save this transformed data into a persistent datastore

5. Service must expose a single GraphQL endpoint to access the transformed data:
   - Query all makes with all vehicle types (hint: look to improve performance)
   - Query a single make with vehicle types

6. Service must contain tests for each data transformation

7. Service must follow NodeJS best practices for project structure, and code

8. Service must use TypeScript

9. Service must be Dockerized

NOTE: If the service is unavailable, please use the attached dataset. For VehicleTypesforMakeId you may create fake data associated with each Make Id following the example provided.
