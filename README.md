## CACTUS ROOM CONFIGURATION

This application is a 3D room configurator built with Next.js and TypeScript. It allows users to select materials for different parts of a room through an interactive interface.

## Demo

[Live Demo](https://cactus-room-configuration.vercel.app/)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Links](#links)

## Tech Stack

- Next.js
- TypeScript
- Firebase
- TailwindCSS

## Run Locally

Clone the project

```bash
git clone https://github.com/andresfernandez89/cactus-room-configuration.git
```

Go to the project directory

```bash
  cd cactus-room-configuration
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your **`.env.local`** file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

## Scripts

- **dev:** Start the development server.
- **build:** Build the application.
- **start:** Start the production server.
- **lint:** Lint the code.

## Links

- [@andresfernandez89](https://github.com/andresfernandez89)
