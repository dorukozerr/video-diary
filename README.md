# Video Diary

A React Native application that enables users to select and crop videos for their personal video diary.

## Tech Stack

- [React Native](https://reactnative.dev/) - Framework for building native apps
- [Expo](https://expo.dev/) - Platform for universal native apps
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing for Expo
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) - Local database storage
- [Expo Video](https://docs.expo.dev/versions/latest/sdk/video/) - Video playback component
- [TanStack Query](https://tanstack.com/query/latest) - Powerful data synchronization
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [FFmpeg](https://ffmpeg.org/) - Video processing library

## Development Prerequisites

- `yarn` - Package manager
- `watchman` - File watching service
- `pod` - CocoaPods dependency manager

## Local Development Setup

Since this project uses FFmpeg with native modules, prebuild is required. Follow these steps to run the app on iOS simulator:

```bash
git clone git@github.com:dorukozerr/video-diary.git &&
cd video-diary &&
yarn &&
npx expo prebuild &&
cd ios &&
pod install &&
cd .. &&
yarn ios
```

## Known Issue

There is a current limitation where video file URIs become invalid after restarting the development server. This occurs because the application folder paths may change between builds, causing the saved video URIs to point to incorrect locations. When developing locally, be aware that you may need to re-create entries after restarting the development server. This issue is being investigated.
