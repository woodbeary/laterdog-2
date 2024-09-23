



# Later.dog

Later.dog is a cutting-edge web application built with Next.js, TypeScript, React, Shadcn, NextAuth.js, and Firebase. It serves as a platform to connect developers, manage internships, and facilitate seamless interactions through a modern, responsive interface.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Authentication**: Secure login using Twitter and GitHub via NextAuth.js.
- **Real-time Database**: Leveraging Firebase Firestore for real-time data updates and offline caching.
- **Responsive Design**: Optimized for both mobile and desktop using Tailwind CSS and Shadcn UI components.
- **Interactive UI**: Includes 3D models with Three.js, swipe functionality with framer-motion, and dynamic components.
- **Developer Profiles**: Showcases GitHub contributions and real-time statistics.
- **Matchmaking**: Connects developers based on coding preferences and GitHub data.
- **Security**: Implements strict security measures using Firestore rules and environment variables.
- **Operational Excellence**: Server-side rendering with Next.js and environment-specific configurations for optimal performance.

## Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **Yarn** or **npm**: Package managers
- **Firebase Account**: For Firestore database
- **GitHub & Twitter Accounts**: For OAuth integrations

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/later.dog.git
   cd later.dog
   ```

2. **Install Dependencies**

   Using Yarn:

   ```bash
   yarn install
   ```

   Or using npm:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   TWITTER_CLIENT_ID=your_twitter_client_id
   TWITTER_CLIENT_SECRET=your_twitter_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the Development Server**

   Using Yarn:

   ```bash
   yarn dev
   ```

   Or using npm:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Project Structure
later.dog/
├─ app/
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ [...nextauth]/
│  │  │     ├─ authOptions.ts
│  │  │     └─ route.ts
│  │  ├─ check-env/
│  │  │  └─ route.ts
│  │  ├─ env-test/
│  │  │  └─ route.ts
│  │  ├─ fetchgit/
│  │  │  └─ route.ts
│  │  └─ user/
│  │     └─ route.ts
│  ├─ components/
│  │  ├─ FirestoreCounter.tsx
│  │  ├─ TweetCarousel.tsx
│  │  ├─ landing-page.tsx
│  │  └─ ChatComponent.tsx
│  ├─ providers.tsx
│  ├─ dot/
│  │  └─ page.tsx
│  ├─ waitlist/
│  │  └─ page.tsx
│  ├─ profile/
│  │  └─ page.tsx
│  ├─ swipe/
│  │  └─ page.tsx
│  └─ firestore-test/
│     └─ page.tsx
├─ components/
│  └─ ui/
│     ├─ button.tsx
│     ├─ input.tsx
│     ├─ textarea.tsx
│     ├─ dropdown-menu.tsx
│     └─ alert-dialog.tsx
├─ docs/
│  ├─ architecture.md
│  ├─ api-routes.md
│  └─ components/
│     ├─ FirestoreCounter.md
│     └─ TweetCarousel.md
├─ hooks/
│  ├─ useAuthRedirect.ts
│  ├─ useLocalStorage.ts
│  └─ useCanSwipe.ts
├─ lib/
│  ├─ firebase.ts
│  ├─ messageGenerator.ts
│  ├─ mockData.ts
│  └─ utils.ts
├─ public/
│  └─ images/
│     ├─ profile1.jpg
│     └─ profile2.jpg
├─ styles/
│  └─ globals.css
├─ types/
│  ├─ user.ts
│  └─ json-schema.d.ts
├─ .env.local
├─ next.config.js
├─ package.json
├─ tsconfig.json
└─ README.md


## Documentation

For detailed explanations of individual components, API routes, and the overall architecture, please refer to the `docs/` directory.

- **[Architecture Overview](./docs/architecture.md)**
- **[API Routes Documentation](./docs/api-routes.md)**
- **[Component Documentation](./docs/components/ComponentName.md)**
  - Example: [FirestoreCounter Component](./docs/components/FirestoreCounter.md)
- **[Other Features](./docs/other-features.md)**

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes. Ensure that your code follows the existing code style and passes all linting checks.

## License

[MIT](./LICENSE)