# Tournament Points Maker - Cyberpunk Edition

A modern web application for creating and managing tournament points tables with a stunning cyberpunk theme. Perfect for tournaments, competitions, and games!

**Status:** ✅ Production Ready | Deployed on Vercel

## Features

✨ **Cyberpunk Theme** - Neon-glowing interface with futuristic design
📱 **Mobile Responsive** - Works perfectly on desktop, tablet, and mobile devices
🎯 **Easy Score Management** - Click to edit wins, losses, and custom scores
📊 **Real-time Leaderboard** - Automatic sorting by points
🔗 **Share Tournaments** - Generate unique share codes and QR codes
💾 **Persistent Storage** - Your tournaments are saved locally
📥 **Import/Export** - Download and backup your tournament data
🎨 **Beautiful UI** - Modern Tailwind CSS styling with neon effects

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Usage

1. **Create Tournament** - Start by creating a new tournament
2. **Add Teams** - Enter team names and add them to the tournament
3. **Update Scores** - Click on wins/losses/custom score columns to edit
4. **View Leaderboard** - See teams automatically sorted by points
5. **Share** - Generate a share link or QR code to share with friends
6. **Export** - Download your tournament data as a backup

## Scoring System

- **Wins**: 3 points each
- **Losses**: 1 point each
- **Custom Score**: Any value you want to track

Teams are ranked by total points in descending order.

## Sharing

- Generate unique share codes for each tournament
- Share via link or QR code
- Friends can view the live leaderboard
- All changes sync automatically

## Technologies Used

- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **QR Code** - For easy sharing

## Mobile Features

- Responsive grid layout
- Touch-friendly buttons and inputs
- Optimized for small screens
- Full functionality on mobile devices

## Data Storage

Tournament data is automatically saved to browser's localStorage and persists across sessions.

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
