# Later.dog Project Status

## Project Overview
Later.dog is a mobile-first dating app for developers, leveraging GitHub commit data and Twitter profiles for a unique matching experience with a terminal hacker aesthetic.

## Current Status
- Initial project setup complete
- Authentication with NextAuth implemented for Twitter (X)
- Basic profile setup page created
- Successfully capturing Twitter user data and storing in Firestore
- Implemented error handling for missing email addresses
- Added GitHub linking option in profile setup
- Implemented local storage for temporary data caching during setup process
- Enhanced NextAuth configuration to capture more Twitter-specific data
- Updated Firestore rules for development (open access)
- Configured Next.js to allow images from Twitter and GitHub domains
- Added "Delete Account" functionality in profile setup page
- Added confirmation modal for account deletion
- Implemented user data download functionality before account deletion
- Added feedback option via Twitter during account deletion process
- Refined the account deletion modal for a more streamlined user experience
- Implemented data extraction functionality for user account data
- Refined user data download functionality to include only essential, non-sensitive information

## Next Steps (Priority Order)
1. Complete GitHub account linking functionality
2. Enhance profile setup page with auto-population from X and GitHub data
3. Implement image selection functionality (choose between Twitter and GitHub profile pictures)
4. Create user profile data model in Firebase
5. Develop API endpoints for user data CRUD operations
6. Implement real-time data synchronization between client and Firebase
7. Enhance profile page to display real user data
8. Update swipe functionality to use real user data
9. Implement matching algorithm based on GitHub and Twitter data

## Immediate Tasks
1. Finish implementing GitHub OAuth flow in profile setup
2. Update profile setup page to include GitHub data display
3. Implement logic to combine Twitter and GitHub data in user profile
4. Create a complete user profile page that displays all gathered data
5. Test and refine the "Delete Account" functionality, including the new confirmation modal, data download feature, and feedback option
6. Enhance data extraction feature to include more relevant user data
7. Implement proper error handling and user feedback for data extraction

## Notes
- Ensure proper error handling for GitHub authentication flow
- Implement proper data validation for user inputs
- Consider implementing progressive profile completion to improve user experience
- Add confirmation dialog before deleting account to prevent accidental deletions
- Ensure the data download functionality only includes non-sensitive user information (name and usernames)
- Consider adding more detailed explanations about what data is being stored and how it's used in the account deletion process
- Monitor and analyze feedback received through the Twitter feedback option during account deletion
- Consider implementing a more comprehensive data export feature in the future
- Ensure all extracted data complies with data protection regulations

## Open Questions
- How to handle users who don't have a GitHub account? Should it be mandatory?
- What specific GitHub data should we prioritize for the matching algorithm?
- How to implement Grok AI or an alternative for the profile roasting feature?
- What additional data should be included in the user data download?
- Should we implement a grace period for account deletion, allowing users to recover their account within a certain timeframe?