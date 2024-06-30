# GeoTrackr

GeoTrackr is an application designed to track a user's location and keep a record of their visited locations. Users can either add their current location to their timeline or search for any location and add it to their timeline.

## Features

- **Track Current Location**: Users can add their current location to their timeline with a single click.
- **Search and Add Locations**: Users can search for any location and add it to their timeline.
- **Timeline Management**: Keeps a chronological record of all the locations visited by the user.

## Technology Stack

### Frontend

- **React**: The user interface of GeoTrackr is built using React, a JavaScript library for building user interfaces.
- **@tanstack/react-query**: Data fetching and caching are handled by @tanstack/react-query, providing efficient data synchronization.
- **react-hook-form**: Forms are managed using react-hook-form, making form handling and data retrival simple and efficient.
- **styled-components**: Styling is done using styled-components allowing for CSS-in-JS.
- **Leaflet**: Interactive maps are provided by Leaflet and React Leaflet, an open-source JavaScript library for mobile-friendly maps.

### Backend (still in development application is currently running on a JSON server)

- **Node.js**: The backend server is built using Node.js, a JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: The web framework for Node.js used to build the backend API.
- **MongoDB**: A NoSQL database used for storing user data and location records.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model the application data.

## Future Plans

- **Feature Expansion**: More features will be added to enhance the user experience.
- **Authentication**: Implement user authentication to secure user data and provide personalized experiences.
- **Backend Development**: Continuously improving the backend to ensure scalability and performance.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone "URL"
   cd GeoTrackr
   ```

2. **Install dependencies**:

   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Run the JSON server**:

   ```bash
   cd client
   npm run server
   ```

4. **Run the frontend development server**:
   ```bash
   cd client
   npm run dev
   ```

## Credits

- **UI Design**: [Nsikan David](www.github.com/Daviddix)
