# User Management Scripts

## Create User

Creates a new user in the database with email, password, and name.

### Usage

**Option 1: Using npm script (recommended)**

```bash
npm run create-user <email> <password> <name>
```

**Option 2: Using shell script directly**

```bash
./scripts/create-user.sh <email> <password> <name>
```

**Option 3: Using Node.js directly**

```bash
node scripts/create-user.js <email> <password> <name>
```

### Examples

```bash
# Create a user with npm
npm run create-user admin@example.com securepass123 "Admin User"

# Create a user with shell script
./scripts/create-user.sh john@example.com mypassword "John Doe"

# Create a user with Node.js
node scripts/create-user.js jane@example.com pass456 "Jane Smith"
```

### Notes

- Email must be unique
- Password will be hashed using SHA-256 before storage
- Name can contain spaces (use quotes)
- Script will exit with error if email already exists
- Requires the database to be accessible and Prisma to be properly configured

### Error Handling

The script will fail and show an error message if:

- Missing required arguments (email, password, or name)
- User with the email already exists
- Database connection fails
- Invalid data provided
