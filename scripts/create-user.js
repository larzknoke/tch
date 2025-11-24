#!/usr/bin/env node

const { PrismaClient } = require("../generated/prisma");
const sha256 = require("crypto-js/sha256");

const prisma = new PrismaClient();

const hashPassword = (password) => {
  return sha256(password).toString();
};

async function createUser() {
  // Get command line arguments
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error("Usage: npm run create-user <email> <password> <name>");
    console.error(
      "Example: npm run create-user user@example.com mypassword 'John Doe'"
    );
    process.exit(1);
  }

  const [email, password, name] = args;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(`❌ User with email '${email}' already exists!`);
      process.exit(1);
    }

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword(password),
      },
    });

    console.log("✅ User created successfully!");
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Created: ${user.createdAt}`);
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
