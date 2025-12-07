# Deployment Guide - SNG Tournament Maker

## Quick Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Using GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select the `FCZ-tournament-table` repository
5. Click "Deploy"

Vercel will automatically detect Next.js and deploy your app!

## Environment Setup
The app is client-side only (uses localStorage), so no backend environment variables needed.

## Deployment Details
- **Framework**: Next.js 14
- **Runtime**: Node.js 18+
- **Build Command**: `next build`
- **Start Command**: `next start`
- **Output Directory**: `.next`

## After Deployment
Your app will be available at `https://your-project-name.vercel.app`

### Features Working on Vercel:
✅ Tournament creation and management  
✅ Team scoring (all data stored locally in browser)  
✅ Share tournaments with unique codes  
✅ QR code generation  
✅ Auth key system  
✅ Mobile responsive design  
✅ Cyberpunk theme  

### Note
All data is stored in the user's browser using localStorage. Each user will have their own separate tournaments and data.

## Alternative Hosts

### Deploy on Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy!

### Deploy on Railway
1. Connect GitHub account
2. Create new project from repository
3. Railway auto-detects Next.js configuration

### Deploy on Render
1. New → Web Service
2. Connect GitHub repository
3. Build command: `npm run build`
4. Start command: `npm run start`

## Troubleshooting

**Issue**: Build fails with "Module not found"
- Solution: Run `npm install` locally and verify all imports

**Issue**: Data not persisting after refresh
- Solution: Check browser localStorage settings aren't disabled

**Issue**: Port already in use locally
- Solution: Change port with `npm run dev -- -p 3001`

## Support
For issues, create an issue on the [GitHub repository](https://github.com/hackio162000-tech/FCZ-tournament-table)
