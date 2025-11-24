#!/bin/bash

# Create User Script
# Usage: ./scripts/create-user.sh <email> <password> <name>

if [ "$#" -lt 3 ]; then
    echo "❌ Error: Missing required arguments"
    echo ""
    echo "Usage: ./scripts/create-user.sh <email> <password> <name>"
    echo "Example: ./scripts/create-user.sh user@example.com mypassword 'John Doe'"
    exit 1
fi

EMAIL=$1
PASSWORD=$2
NAME=$3

echo "Creating user..."
echo "  Email: $EMAIL"
echo "  Name: $NAME"
echo ""

node scripts/create-user.js "$EMAIL" "$PASSWORD" "$NAME"
