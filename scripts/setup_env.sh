#!/bin/bash

echo "Setting up Environment variables..."

# Check Backend .env
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env from example..."
    if [ -f backend/.env.example ]; then
        cp backend/.env.example backend/.env
    else
        echo "No backend/.env.example found. Creating empty .env"
        touch backend/.env
    fi
else
    echo "backend/.env already exists."
fi

# Check Frontend .env
if [ ! -f frontend/.env ]; then
    echo "Creating frontend/.env from example..."
    if [ -f frontend/.env.example ]; then
        cp frontend/.env.example frontend/.env
    else
        echo "No frontend/.env.example found. Creating empty .env"
        touch frontend/.env
    fi
else
    echo "frontend/.env already exists."
fi

echo "Environment setup complete. Please edit .env files with real credentials."
