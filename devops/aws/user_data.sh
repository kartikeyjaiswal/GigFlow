#!/bin/bash

# Update and Install Essentials
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx build-essential

# Install Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Install PM2 globally
sudo npm install -g pm2

# Setup App Directory
sudo mkdir -p /var/www/gigflow
sudo chown -R $USER:$USER /var/www/gigflow

# Setup Nginx
# (Assuming the nginx.conf is copied later via CI/CD or manually)
# But for now, ensuring the service is running
sudo systemctl enable nginx
sudo systemctl start nginx

# Install cleanup
sudo apt autoremove -y

echo "Server Provisioning Complete!"
