# Next.js Auth Setup

A comprehensive authentication setup package for Next.js applications that provides complete authentication functionality, including Google OAuth, email verification, and password management.

### Note: Use TypeScript and src folder while creating a new next application

---

## Features

- **🔐 Complete authentication system**
- **🌐 Google OAuth integration**
- **✉️ Email verification with OTP**
- **🔑 Password management with validation**
- **📱 Responsive UI components**
- **🎯 TypeScript support**
- **🗄️ MongoDB integration**
- **🛡️ Protected routes with middleware**

---

## Installation

## First install a nextjs project

```bash
npx create-next-app@latest
```
Note: Use TypeScript and src directory while creating a new next application

## Then install the package

```bash
npm i nextjs-auth-kit
```
or
```bash
npm i nextjs-auth-kit --legacy-peer-deps
```
---

## Prerequisites

Ensure you have the following before getting started:

1. **Node.js and npm installed**
2. **MongoDB database** (local or cloud instance)
3. **Google OAuth credentials** (Client ID and Secret)
4. **SMTP email service credentials** (e.g., Gmail, SendGrid, etc.)

---

## Setup Steps

### 1. Install the Package

Run the following command in your Next.js project:

```bash
npm i nextjs-auth-kit
```
or
```bash
npm i nextjs-auth-kit --legacy-peer-deps
```

### 2. Configure Environment Variables

Edit the `.env` file in your project root and add the following:

```env
MONGODB_URI=your_mongoDB_URI
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
### Refer this link for Google client and secret id 
https://www.balbooa.com/help/gridbox-documentation/integrations/other/google-client-id

### Refer this link for Gmail App Password
https://www.getmailbird.com/gmail-app-password/

### 3. Start Your Development Server

Run the development server with:

```bash
npm run dev
```

## Authentication Flow

### Email/Password Signup

1. User enters email and password.
2. Password validation checks:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character
3. OTP is sent to the provided email for verification.
4. Upon successful verification, the user is redirected to the dashboard.

### Google OAuth

1. User clicks "Continue with Google."
2. Google login dialog appears for authorization.
3. Upon success:
   - New users are automatically registered.
   - Existing users are linked to their Google account.
4. The user is redirected to the dashboard.

---

## Security Features

1. **Password Hashing**: Secure passwords using bcrypt.
2. **OTP Expiration**: Automatically invalidates OTP after a set time.
3. **Protected API Routes**: Ensures restricted access via middleware.
4. **Session Management**: Secure sessions with NextAuth.js.
5. **CSRF Protection**: Prevents cross-site request forgery attacks.

---

## Contributing

To contribute to the project:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

---

## License

This project is licensed under the **MIT License**.

---

## Authors

- **Sany**
- **Kaviyarasan**

---

## Support

For any questions or support, you can:

- Open an issue on [GitHub](https://github.com/kaviyarasan2865/nextjs-auth-kit.git).
- Connect on LinkedIn:
  - [Sany's LinkedIn Profile](https://www.linkedin.com/in/asany/)
  - [Kaviyarasan's LinkedIn Profile](https://www.linkedin.com/in/kaviyarasan--g/)


---

## Acknowledgments

Special thanks to the following technologies:

- **Next.js**
- **NextAuth.js**
- **MongoDB**
- **Tailwind CSS**

