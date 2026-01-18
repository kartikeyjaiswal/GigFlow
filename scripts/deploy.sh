#!/bin/bash

# Directory Variables
APP_DIR="/var/www/gigflow"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"

echo "Starting Deployment..."

# Navigate to App Directory
cd $APP_DIR || exit

# Pull Latest Code
echo "Pulling latest code from Git..."
git pull origin main

# Backend Deployment
echo "Deploying Backend..."
cd $BACKEND_DIR
npm install --omit=dev
# Update PM2 process
pm2 reload gigflow-backend || pm2 start ecosystem.config.js --env production

# Frontend Deployment
echo "Deploying Frontend..."
cd $FRONTEND_DIR
npm install
npm run build

echo "Deployment Finished!"
