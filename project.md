# Later.dog Project Status

## Project Overview
Later.dog is a mobile-first dating app for developers, leveraging GitHub commit data and Twitter profiles for a unique matching experience with a terminal hacker aesthetic.

## Current Status
- Initial project setup complete
- Authentication with NextAuth implemented
- Basic profile setup and viewing pages created
- Swipe page implemented with mock data and enhanced features
- Added off-canvas menu for improved mobile navigation and settings access
- Implemented "Report a Problem" feature
- Enhanced overall mobile responsiveness
- Implemented game-like settings modal with premium membership, mod application, and advanced filters
- Added gamification elements (badges) for commit activity and open-source contributions
- Redesigned swipe page layout for better user experience
- Added beta features in settings: Grok Roast level adjustment, Anonymous Mode, and Light Mode
- Redesigned settings page for improved mobile responsiveness and simplified UI
- Implemented custom toggle switches for better UI consistency
- Implemented light mode for swipe and profile pages
- Added tooltip explanation for anonymous mode in settings
- Implemented match simulation with Grok's humorous compatibility roasts
- Added match celebration effects (modal and confetti)
- Integrated direct messaging via X for matched profiles
- Updated swipe page to always mask usernames until a match occurs
- Simplified contact button text in match modal
- Implemented a "normie" filter page to ensure users are developers or tech enthusiasts
- Added a notification option for non-developers interested in future access
- Improved readability and user flow in the "normie" filter page
- Adjusted tooltip placement for better user experience
- Integrated matches display into the main profile page
- Removed separate matches page for a more streamlined user experience
- Implemented clickable matches in the profile page, leading to individual user profiles
- Created a new page to display individual user profiles when clicked from matches
- Removed public profile pages for enhanced privacy
- Implemented match preview modal in the profile page

## TODO List (Priority Order)
1. Implement GitHub OAuth for profile linking and commit data retrieval
2. Develop user profile display with GitHub commit grid as a central feature
3. Integrate real user data into the swiping functionality
4. Create basic matching algorithm using GitHub data (languages, commit frequency)
5. Integrate Grok AI or similar for profile roasting feature
6. Develop premium filters (verified X accounts, GitHub activity levels)
7. Set up payment system for premium features
8. Implement messaging system
9. Implement functionality for user settings (distance, languages, commits)
10. Create commit grid component and integrate it into profile and swipe pages
11. Implement premium membership system with Stripe integration
12. Create mod application process and admin privileges
13. Integrate new filters (distance, languages, frequency, experience) into matching algorithm
14. Implement real-time badge calculation based on actual GitHub data
15. Create a badge system with more diverse achievements
16. Implement functionality for beta features (Grok Roast levels, Anonymous Mode, Light Mode)
17. Create a system for generating different levels of Grok Roasts
18. Develop Anonymous Mode functionality to hide personal information until match
19. Implement Light Mode theme option

## Notes
- Using Next.js 14 with App Router for frontend
- NextAuth implemented for authentication
- Firebase integration pending for backend services
- Focus on mobile-first design, simplicity, and speed to market

## Decisions Made
- Tech Stack: Next.js 14, TypeScript, NextAuth
- Authentication: X OAuth for signup, GitHub OAuth for profile linking (to be implemented)
- Core Feature: GitHub commit grid as main profile attraction (to be implemented)
- Monetization: Premium filters for verified accounts and activity levels (to be implemented)
- Design Approach: Mobile-first, with interactive landing page preview
- Navigation: Implemented off-canvas menu for better mobile experience
- Swipe Page Layout: Redesigned to focus on key information and improve user experience

## Upcoming Tasks
- Replace mock data in the swipe page with real user data
- Implement the commit grid component for both profile and swipe pages
- Create a backend API to handle user matching and data retrieval
- Develop the matching algorithm based on GitHub data
- Connect settings to backend and use them in the matching algorithm
- Implement functionality for user settings in the game-like settings modal
- Ensure smooth transitions and animations for the off-canvas menu
- Implement GitHub OAuth and data retrieval
- Develop the profile roasting feature using Grok AI or an alternative
- Implement Stripe payment for premium lifetime deal
- Create admin dashboard for mod management
- Adjust matching algorithm to consider new filter options
- Integrate real GitHub data for badges
- Implement a system to track and update user achievements
- Create a detailed view for badges and achievements on the profile page
- Integrate beta features into the main app functionality
- Develop algorithm for generating different levels of Grok Roasts
- Implement Anonymous Mode logic in the matching system
- Create and apply Light Mode theme styles
- Extend light mode to all pages and components
- Implement anonymous mode functionality
- Further refine UI components for better mobile interaction
- Implement responsive design patterns across all pages
- Optimize touch interactions for mobile users
- Refine and potentially expand custom UI components for a more cohesive look
- Refine match algorithm and increase variety of Grok's roasts
- Implement real-time matching with backend integration
- Enhance match celebration effects and animations
- Implement real-time revealing of usernames only upon successful matching
- Ensure all instances of usernames are properly masked throughout the app until a match occurs
- Implement actual notification system for interested non-developers
- Refine the filter process and consider additional qualifying questions
- Continue refining UI/UX based on user feedback
- Implement A/B testing for different filter page layouts
- Implement real-time updates for matches on the profile page
- Develop a more sophisticated matching algorithm based on GitHub data and user preferences
- Create a notification system for new matches and messages
- Implement real data fetching for individual user profiles
- Enhance the individual user profile page with more details and interactivity
- Implement privacy controls to manage what information is shared with matches
- Develop a secure way to exchange more detailed profile information after mutual interest is established

## Open Questions
- Specific implementation of Grok AI or alternative for profile roasting
- Pricing strategy for premium features (filters, advanced matching)
- Legal considerations for using GitHub and X data in a dating app
- Best practices for mobile-optimized animations and transitions
- Scalability considerations for matching algorithm and real-time updates
- What additional badges or achievements could be meaningful for developers?
- How to encourage users to maintain their GitHub activity for better matches?
- How to balance anonymity with providing enough information for meaningful matches?
- What criteria should be used to generate different levels of Grok Roasts?
- How to implement Light Mode in a way that maintains the app's unique aesthetic?
- How to balance feature richness with simplicity in mobile UI?
- What additional mobile-specific features could enhance user experience?
- How to balance user privacy (masked usernames) with providing enough information for meaningful swipes?
- What additional information can we show on profiles to compensate for the masked usernames?
- How to balance user privacy with providing enough information for meaningful connections?
- What additional security measures can be implemented to protect user data in a web-based dating app?