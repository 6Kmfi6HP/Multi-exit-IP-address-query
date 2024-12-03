# Multi-Exit IP Checker

[中文文档](README.zh-CN.md)

A modern web application built with Next.js that allows you to check and monitor IP addresses across multiple global servers. This tool helps identify and verify IP addresses through different exit nodes, making it useful for network testing and monitoring.

## Features

- **Real-time IP Checking**: Utilizes WebSocket connections to check IP addresses across multiple servers simultaneously
- **Global Server Coverage**: Connects to various SpeedTest servers worldwide to provide comprehensive IP checking
- **Parallel Processing**: Implements batch processing with controlled concurrency for efficient IP checking
- **Interactive UI**: Modern, responsive interface built with Radix UI components and Tailwind CSS
- **Progress Tracking**: Real-time progress indication for ongoing IP checks
- **Collapsible Results**: Organized display of results with expandable details for each server
- **Error Handling**: Robust error handling and timeout management for unreliable connections

## Tech Stack

- **Framework**: Next.js 13.5+
- **Language**: TypeScript
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Network Protocol**: WebSocket

## Project Structure

```
mult-exit-ip/
├── app/                  # Next.js app directory
├── components/          
│   ├── IPChecker.tsx    # Main IP checking component
│   └── ui/              # Reusable UI components
├── lib/
│   ├── types.ts         # TypeScript type definitions
│   └── websocket.ts     # WebSocket connection handling
└── hooks/               # Custom React hooks
```

## Key Components

### IPChecker
The main component that orchestrates the IP checking process. Features include:
- Batch processing of server checks
- Progress tracking
- Results management and display
- Error handling and retry functionality

### WebSocket Handler
Manages WebSocket connections to servers with features like:
- Timeout handling
- Connection error management
- IP address extraction from server responses

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- **Development Mode**: `npm run dev`
- **Build**: `npm run build`
- **Production Start**: `npm run start`
- **Linting**: `npm run lint`

## Dependencies

- Next.js and React
- Radix UI Component Library
- Tailwind CSS for styling
- Various UI utilities and helpers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not open for public distribution.
