# Architecture Overview

Later.dog is designed with a modular architecture that leverages the strengths of Next.js, React, and Firebase. This structure ensures scalability, maintainability, and a seamless developer experience.

## Core Technologies

- **Next.js (App Router)**: Handles both frontend and backend routing, enabling server-side rendering (SSR) and API route management.
- **React**: Facilitates building reusable UI components.
- **TypeScript**: Adds static typing for enhanced code reliability and developer tooling.
- **Shadcn**: Provides a collection of pre-built, accessible UI components styled with Tailwind CSS.
- **Firebase Firestore**: Manages real-time data storage, supporting offline capabilities and real-time listeners.
- **NextAuth.js**: Manages authentication, integrating OAuth providers like Twitter and GitHub.
- **Framer Motion**: Powers smooth animations and interactive UI elements.

## System Components

### 1. **Authentication**

- **API Routes**: Located in `app/api/auth/[...nextauth]/`, these routes configure NextAuth.js for OAuth authentication.
- **Providers**: Twitter and GitHub are set up as OAuth providers, enabling users to sign in using their existing accounts.
- **Session Management**: User sessions are managed securely, with session data stored and accessible across the application.

### 2. **Database Management**

- **Firebase Firestore**: Serves as the primary database, storing user information, matchmaking queues, and other dynamic data.
- **Real-time Updates**: Utilizes Firestore's `onSnapshot` for real-time data synchronization, ensuring users receive the latest information without manual refreshes.

### 3. **Frontend Components**

- **Reusable UI Components**: Found in the `components/` directory, these include buttons, inputs, modals, and other interactive elements built with Shadcn and styled using Tailwind CSS.
- **3D Models**: Integrated using Three.js, enhancing the visual appeal of pages like the landing page.
- **Swipe Functionality**: Implemented using Framer Motion, allowing users to interact through swiping gestures.

### 4. **API Routes**

- **Data Fetching**: API routes like `app/api/fetchgit/route.ts` handle fetching data from external services (e.g., GitHub) and processing it for frontend consumption.
- **Environment Checks**: Routes like `app/api/check-env/route.ts` and `app/api/env-test/route.ts` are used for verifying environment configurations during development and deployment.

### 5. **User Management**

- **Profiles**: Users have profiles that showcase their GitHub contributions, coding statistics, and personal information.
- **Matchmaking**: The system pairs users based on coding preferences, GitHub data, and other criteria, facilitating meaningful connections.
- **Chat Functionality**: Matched users can communicate through integrated chat features, fostering collaboration and networking.

## Data Flow

1. **User Authentication**:
   - Users authenticate via Twitter or GitHub.
   - Upon successful authentication, user data is stored in Firestore.

2. **Data Storage & Retrieval**:
   - User profiles, matchmaking queues, and other data are stored in Firestore.
   - Frontend components fetch and listen to Firestore data in real-time using `onSnapshot`.

3. **UI Rendering**:
   - React components render dynamic data based on Firestore snapshots.
   - Interactive features like swiping and real-time counters update UI seamlessly.

4. **API Interactions**:
   - API routes handle backend logic, data fetching from external APIs, and data processing.
   - Secure interactions ensure data integrity and user privacy.

## Security Measures

- **Environment Variables**: Critical configurations and API keys are stored securely in `.env.local`, preventing accidental exposure.
- **Firestore Security Rules**: Defined to enforce read/write permissions, ensuring only authorized access to sensitive data.
- **Server-side Handling**: Sensitive operations are managed on the server-side to prevent exposure of business logic or data.

## Conclusion

Later.dog's architecture emphasizes modularity, scalability, and security, leveraging modern web development technologies to deliver a robust and interactive platform for developers.

For more detailed information on specific components or API routes, refer to the respective documentation files in the `docs/` directory.