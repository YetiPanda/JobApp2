# JobApp - Job Application Tracker

A React Native mobile application for tracking job applications through the entire application process.

## Features

- **Dashboard**: View at-a-glance statistics of your job applications
- **Job Management**: Add, edit, and track job applications
- **Status Tracking**: Track applications through different stages (Bookmarked, Applying, Applied, Interviewing, Negotiating, Accepted, Declined)
- **Favorites**: Mark jobs as favorites for quick access
- **Notes**: Add detailed notes about each job opportunity
- **Interest Rating**: Rate your interest level in each position

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/jobapp.git
cd jobapp
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Run on your device or emulator:
```
npm run android
# or
npm run ios
```

## Technologies Used

- React Native
- Expo
- Redux (Redux Toolkit)
- React Navigation
- React Native Elements

## Project Structure

```
/assets          - Images and other static assets
/components      - Reusable UI components  
/features        - Feature-specific components and Redux slices
/redux           - Redux store configuration
/screens         - Main application screens
/shared          - Shared utilities and constants
```

## App Workflow

1. Browse and search for jobs in the directory
2. Add new job applications with detailed information
3. Track application status through the entire process
4. Mark favorite jobs for quick access
5. View application statistics on the dashboard

## Future Enhancements

- Calendar integration for interview scheduling
- Document storage for resumes and cover letters
- Job search integration
- Reminders for follow-ups
- Advanced analytics on application success rates

## License

MIT