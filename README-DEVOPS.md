# GigFlow DevOps Documentation

This document outlines the DevOps architecture, deployment strategies, and infrastructure management for the GigFlow application.

## 🏗 Architecture Overview

The application follows a standard N-tier architecture deployed on AWS EC2.

- **Frontend**: React (Vite) served as static files via Nginx.
- **Backend**: Node.js (Express) running managed by PM2.
- **Reverse Proxy**: Nginx handles all incoming traffic, serves static content, and proxies API requests to the backend.
- **Database**: MongoDB (managed Atlas or local), Redis (Caching).
- **CI/CD**: Jenkins pipeline for automated testing and deployment.

### Infrastructure Diagram
```mermaid
graph TD
    Client[User Browser] -->|HTTPS| Nginx[Nginx Reverse Proxy]
    Nginx -->|/ (Static)| Frontend[React Static Files]
    Nginx -->|/api/*| Backend[Node.js Backend (PM2)]
    Backend -->|Read/Write| DB[(MongoDB)]
    Backend -->|Cache| Redis[(Redis)]
```

## 🚀 Getting Started

### Prerequisites
- Node.js v20.x
- Nginx
- Redis
- PM2 (`npm install -g pm2`)

### Environment Setup
1.  Run the setup script to initialize environment variables:
    ```bash
    bash scripts/setup_env.sh
    ```
2.  Edit `backend/.env` and `frontend/.env` with your actual credentials (DB URI, API Keys, etc.).

## 🛠 Deployment

### Automated Deployment (Jenkins)
The `Jenkinsfile` in the root directory defines the CI/CD pipeline.
1.  **Checkout**: Pulls code from Git.
2.  **Install & Test**: Runs `npm install` and tests.
3.  **Build**: Builds the frontend (`npm run build`).
4.  **Deploy**: Executes the deployment script.

### Manual / Script Deployment
You can manually trigger a deployment on the server using the helper script:
```bash
sudo bash scripts/deploy.sh
```
This script will:
- Pull the latest code from `main` branch.
- Re-install dependencies.
- Rebuild the frontend.
- Reload the Backend PM2 process with zero downtime.

## ⚙️ Configuration Files

- **`Jenkinsfile`**: CI/CD Pipeline definition.
- **`devops/nginx.conf`**: Nginx configuration template.
- **`backend/ecosystem.config.js`**: PM2 configuration for process management and clustering.
- **`devops/aws/user_data.sh`**: Provisioning script for new EC2 instances.

## 🔍 Monitoring & Health Checks

- **Health Check Script**:
  Run `node scripts/health_check.js` to verify backend connectivity.
  
- **PM2 Monitoring**:
  Use `pm2 monit` to view real-time logs and metrics.

## 🔐 Security Best Practices
- **Firewall**: Only open ports 80, 443, and 22 (restricted IP).
- **Secrets**: Never commit `.env` files. Use the `setup_env.sh` script.
- **SSL**: Configure Let's Encrypt with Certbot (recommended for Nginx).
