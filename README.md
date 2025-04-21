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

```
Components:
Redux Store for local persistent storage (...redux/store.js)
Job Management features such as job listing, filtering, and tracking.
Dashboard with status counts and recent applications
Drawer navigation system (from Nucampsite mobile app)

Key files:
HomeScreen.js: Dashboard with status overview
DirectoryScreen.js: Job listings view
JobInfoScreen.js: Detailed job view
AddJobScreen.js: Form for adding new jobs (manual process)
jobsSlice.js: Job data
favoritesSlice.js: Favorites

```

## License

MIT
