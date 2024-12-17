#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Get the actual project root
const projectRoot = process.env.INIT_CWD || process.cwd();

const installDependencies = () => {
  const dependencies = [
    "next-auth@^4.24.5",
    "mongoose@^8.0.0",
    "bcryptjs@^2.4.3",
    "jsonwebtoken@^9.0.0",
    "nodemailer@^6.9.0",
    "mongodb@^6.0.0",
    "clsx@^2.0.0",
    "tailwind-merge@^2.0.0"
  ];
  
  try {
    // Create a temporary package.json if it doesn't exist
    const pkgPath = path.join(projectRoot, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      fs.writeFileSync(pkgPath, JSON.stringify({
        name: "temp-package",
        version: "1.0.0",
        private: true
      }));
    }

    console.log('Installing dependencies...');
    execSync(`npm install ${dependencies.join(' ')} --save --legacy-peer-deps`, {
      stdio: 'inherit',
      cwd: projectRoot
    });
  } catch (error) {
    console.error("Error installing dependencies:", error);
    // Don't exit process on dependency installation failure
    console.log("Continuing with file creation...");
  }
};

const createFile = (filePath, content) => {
  try {
    const fullPath = path.join(projectRoot, filePath); // Use project root
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, "utf8");
    console.log(`Created: ${fullPath}`);
  } catch (error) {
    console.error(`Error creating ${filePath}:`, error);
    throw error;
  }
};

const readTemplate = (templatePath) => {
  try {
    // Get the directory where the package is installed
    const packageRoot = path.resolve(__dirname, '..');
    const templateDir = path.join(packageRoot, 'templates');
    const fullPath = path.join(templateDir, templatePath);
    
    if (!fs.existsSync(fullPath)) {
      // Try alternative path for npm installation
      const npmPath = path.join(projectRoot, 'node_modules', 'nextjs-auth-setup-final', 'templates', templatePath);
      if (fs.existsSync(npmPath)) {
        return fs.readFileSync(npmPath, "utf8");
      }
      throw new Error(`Template not found: ${fullPath}`);
    }
    
    return fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading template ${templatePath}:`, error);
    throw error;
  }
};

const setupFiles = () => {
  console.log('Starting setup in:', projectRoot);
  
  const templateFiles = [
    // API Routes
    { 
      dest: "src/app/api/auth/[...nextauth]/route.ts",
      src: "api/auth/[...nextauth]/route.ts"
    },
    { 
      dest: "src/app/api/auth/[...nextauth]/auth.ts",
      src: "api/auth/[...nextauth]/auth.ts"
    },
    { 
      dest: "src/app/api/auth/check-auth-provider/route.ts",
      src: "api/auth/check-auth-provider/route.ts"
    },
    { 
      dest: "src/app/api/auth/check-user/route.ts",
      src: "api/auth/check-user/route.ts"
    },
    { 
      dest: "src/app/api/auth/forgot-password/route.ts",
      src: "api/auth/forgot-password/route.ts"
    },
    { 
      dest: "src/app/api/auth/login/route.ts",
      src: "api/auth/login/route.ts"
    },
    { 
      dest: "src/app/api/auth/send-otp/route.ts",
      src: "api/auth/send-otp/route.ts"
    },
    { 
      dest: "src/app/api/auth/setup-password/route.ts",
      src: "api/auth/setup-password/route.ts"
    },
    { 
      dest: "src/app/api/auth/signup/route.ts",
      src: "api/auth/signup/route.ts"
    },
    { 
      dest: "src/app/api/auth/verify/route.ts",
      src: "api/auth/verify/route.ts"
    },
    { 
      dest: "src/app/api/auth/verify-otp/route.ts",
      src: "api/auth/verify-otp/route.ts"
    },
    { 
      dest: "src/app/api/auth/verify-reset-token/route.ts",
      src: "api/auth/verify-reset-token/route.ts"
    },

    // App Pages
    { 
      dest: "src/app/signup/page.tsx",
      src: "signup/page.tsx"
    },
    { 
      dest: "src/app/login/page.tsx",
      src: "login/page.tsx"
    },
    { 
      dest: "src/app/dashboard/page.tsx",
      src: "dashboard/page.tsx"
    },
    { 
      dest: "src/app/page.tsx",
      src: "page.tsx"
    },

    // Lib Files
    { 
      dest: "src/lib/utils/passwordValidation.ts",
      src: "lib/utils/passwordValidation.ts"
    },
    { 
      dest: "src/lib/email.ts",
      src: "lib/email.ts"
    },
    { 
      dest: "src/lib/mongodb.ts",
      src: "lib/mongodb.ts"
    },
    { 
      dest: "src/lib/nodemailer.ts",
      src: "lib/nodemailer.ts"
    },
    { 
      dest: "src/lib/utils.ts",
      src: "lib/utils.ts"
    },

    // Models
    { 
      dest: "src/models/User.ts",
      src: "models/User.ts"
    },

    // Types
    { 
      dest: "src/types/bcryptjs.d.ts",
      src: "types/bcryptjs.d.ts"
    },
    { 
      dest: "src/types/nodemailer.d.ts",
      src: "types/nodemailer.d.ts"
    },

    // Root Files
    { 
      dest: "src/middleware.ts",
      src: "middleware.ts"
    },
    { 
      dest: ".env",
      src: "env"
    }
  ];

  try {
    // Create each file
    for (const file of templateFiles) {
      try {
        const content = readTemplate(file.src);
        createFile(file.dest, content);
      } catch (error) {
        console.error(`Failed to create ${file.dest}:`, error);
        throw error;
      }
    }

    console.log('Installing dependencies...');
    installDependencies();
    
    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
};

// Modify the postinstall check
if (process.env.npm_lifecycle_event === 'postinstall') {
  // Ensure we're not in a subdependency installation
  const parentDir = path.dirname(projectRoot);
  const isSubDependency = parentDir.includes('node_modules');
  
  if (!isSubDependency) {
    try {
      setupFiles();
    } catch (error) {
      console.error('Setup failed but files may have been created:', error);
      // Don't exit with error code to prevent npm install failure
      process.exit(0);
    }
  }
}

// Export for manual running if needed
module.exports = setupFiles;
