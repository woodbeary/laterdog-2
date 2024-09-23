# API Routes Documentation

Later.dog utilizes Next.js API routes to handle server-side operations, including authentication, data fetching, and user management. This document provides a detailed overview of each API endpoint, its purpose, and how it interacts with other parts of the system.

## Table of Contents

- [Authentication Routes](#authentication-routes)
  - [`authOptions.ts`](#authoptionsts)
  - [`route.ts`](#routets)
- [Environment Routes](#environment-routes)
  - [`check-env/route.ts`](#check-envroute-ts)
  - [`env-test/route.ts`](#env-testroute-ts)
- [GitHub Data Fetching](#github-data-fetching)
  - [`fetchgit/route.ts`](#fetchgtroute-ts)
- [User Data Management](#user-data-management)
  - [`user/route.ts`](#userroute-ts)

## Authentication Routes

### `authOptions.ts`

**Path**: `app/api/auth/[...nextauth]/authOptions.ts`

**Description**: Configures NextAuth.js for handling authentication using Twitter and GitHub as OAuth providers. Manages callbacks for sign-in, JWT token customization, and session handling.

**Key Features**:

- **Providers**:
  - **Twitter**: Enables users to sign in using their Twitter accounts.
  - **GitHub**: Allows users to authenticate via GitHub, accessing their repositories and profile information.

- **Callbacks**:
  - **signIn**: Processes additional user data upon successful authentication and stores it in Firestore.
  - **jwt**: Customizes JWT tokens to include user-specific data such as GitHub access tokens.
  - **session**: Enhances session objects with necessary user information for client-side access.

**Integration with Firestore**: Upon authentication, user data is stored or updated in Firestore, ensuring that profiles are maintained and linked correctly across authentication providers.

### `route.ts`

**Path**: `app/api/auth/[...nextauth]/route.ts`

**Description**: Initializes the NextAuth.js handler to process authentication-related HTTP requests. Acts as the main entry point for authentication operations.

**Functionality**:

- **GET & POST Requests**: Handles both GET and POST requests for authentication flows, managing login, logout, and session retrieval.

**Usage**: This route is essential for setting up authentication flows, handling redirections, and maintaining user sessions throughout the application.

## Environment Routes

### `check-env/route.ts`

**Path**: `app/api/check-env/route.ts`

**Description**: Provides an endpoint to verify that essential environment variables are correctly set. Useful for debugging and deployment validations.

**Response Example**:
json
{
"message": "Environment check endpoint"
}


**Purpose**: Ensures that the application has access to necessary configurations and secrets, preventing runtime errors due to missing environment variables.

### `env-test/route.ts`

**Path**: `app/api/env-test/route.ts`

**Description**: Tests specific environment configurations to ensure all services are operational.

**Response Example**:


json
{
"NEXTAUTH_URL": "http://localhost:3000",
"TWITTER_CLIENT_ID_EXISTS": true,
"TWITTER_CLIENT_SECRET_EXISTS": true,
"NODE_ENV": "development"
}


**Usage**: Helps in verifying that all critical environment variables are present and correctly set, assisting in diagnostics during development and deployment.

## GitHub Data Fetching

### `fetchgit/route.ts`

**Path**: `app/api/fetchgit/route.ts`

**Description**: Fetches authenticated user's GitHub data, including user details, repositories, and commit activity. This data is utilized to showcase user profiles and drive matchmaking algorithms.

**Key Operations**:

1. **Authentication Verification**: Ensures that the user is authenticated and has a valid GitHub access token.
2. **Data Retrieval**:
   - **User Information**: Fetches authenticated user's profile information.
   - **Repositories**: Retrieves a list of repositories with commit activity statistics.
3. **Commit Data Processing**: Gathers commit activity data for each repository to analyze user contributions.

**Response Example**:
json
{
"user": { / GitHub user data / },
"repos": [ / List of repositories / ],
"commitData": [ / Commit activity statistics / ]
}


**Error Handling**: In case of failures during data fetching, appropriate error responses are returned with status codes and error messages.

**Integration Points**:

- **Frontend Components**: Components like `TweetCarousel` and `ProfilePage` consume this API to display GitHub-related information.
- **Matchmaking Logic**: Uses commit data and repository information to evaluate developer compatibility.

## User Data Management

### `user/route.ts`

**Path**: `app/api/user/route.ts`

**Description**: Handles CRUD operations for user profiles in Firestore. Ensures that user data is securely managed and updated based on client interactions.

**Key Operations**:

- **POST Requests**: Creates or updates user data based on incoming requests. Accepts partial user profiles and merges them with existing data.

**Request Body Example**:


json
{
"bio": "Full-stack developer passionate about React and Node.js.",
"codingInterests": "React, Node.js",
"setupComplete": true
}



**Response Example**:
json
{
"message": "User data saved successfully"
}


**Security Measures**:

- **Authentication Check**: Verifies that the user is authenticated before allowing data modifications.
- **Firestore Rules**: Ensures that users can only modify their own profiles, preventing unauthorized access.

**Integration Points**:

- **Profile Setup**: During user onboarding, data is sent to this endpoint to complete profile information.
- **Frontend Components**: Components like `ProfilePage` interact with this API to display and update user information.

## Conclusion

These API routes form the backbone of Later.dog's server-side functionality, handling everything from authentication to data management. Proper understanding and maintenance of these routes are crucial for the seamless operation of the application.

For more detailed explanations, refer to the individual component documentation in the `docs/components/` directory.
(coming soon)
---


