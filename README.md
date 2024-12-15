# CineBase

Welcome to **CineBase** – your ultimate streaming platform! CineBase allows users to watch, discover, rate, and explore movies and series with advanced search options and user-friendly features. With secure authentication, personalized accounts, and seamless payments, CineBase offers a top-tier user experience.

---

## 🌐 Live Application

The CineBase platform is live at: [https://cinebase.pl](https://cinebase.pl)

---

## 🛠️ Features

### User Authentication

- **Registration and Login**: Secure user authentication with email verification.
- **Password Reset**: Easily reset your password via email.
- **Account Verification**: Confirm your account through an email link.
- **Third-Party Providers**: Login using credentials or third-party providers like Google.

### User Profile

- **Custom Avatars**: Choose from a variety of pre-designed avatars.
- **Ratings**: Rate movies and series, with personal ratings visible on your dashboard.
- **Support**: Send messages to support directly from your account.

### Search and Discovery

- **Search by Query**: Find movies, series, and actors quickly by query.
- **Advanced Filters**: Refine search results with advanced filters for genres, release years, ratings, and more.

### Movie and Series Details

- Access detailed information about movies and series, including cast, reviews, and runtime.
- Integration with **TMDb API** and **OMDb API** for up-to-date and comprehensive data.

### Payments

- **Stripe Integration**: Secure and seamless payment system for subscriptions and premium content.
- **Test Mode**: Payments are currently in test mode. Use the following test card details:
  - **Card Number**: 4242 4242 4242 4242
  - **Expiration Date**: Any future date
  - **CVC**: Any 3-digit number

---

## 🚀 Planned Features

- **Admin Panel**: Manage subscription plans, user accounts, and platform settings.
- **User Reviews**: Add a section for users to write and view reviews for movies and series.
- **Public Profiles**: Allow user profiles to be visible to others, showcasing lists and personal information.
- **Personal Lists**: Enable users to browse and manage their favorite movies and watchlists.

---

## 📈 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **Backend**: Prisma + PostgreSQL
- **Authentication**: Auth.js
- **APIs**: TMDb API, OMDb API
- **Payments**: Stripe
- **Validation**: Zod ensures robust data validation.
- **Providers**: Login via credentials and third-party providers like Google.
- **Deployment**: Vercel

**Database**

PostgreSQL: Robust relational database.

Prisma: Efficient ORM for managing data.

---

### Of course app is fully responsive, for example:

### Desktop Version

![Homepage Desktop](https://i.imgur.com/A5pT6az.png)

### Tablet Version

![Homepage Tablet](https://i.imgur.com/v3GWeYZ.png)

### Mobile Version

![Homepage Mobile](https://i.imgur.com/g1bIOJ4.png)

---

## 🌐 Installation

To run CineBase locally, follow these steps:

### Prerequisites

- Postgres database
- Stripe account for payment integration
- TMDb API and OMDb API keys

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cinebase.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cinebase
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add the following environment variables:

   ```env
   DATABASE_URL=your_DB_URL
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

5. Migrate the database:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Visit the application at `http://localhost:3000`.

---

## 🛠️ Development

### Key Commands

- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Lint and Format Code**:
  ```bash
  npm run lint
  ```

---

## 📀 License

This project is licensed under the MIT License.

---

## 🔧 Support

If you encounter any issues or have questions, please contact us via the support feature available on the platform or open an issue on GitHub.

---

## 💡 Acknowledgments

- **TMDb API**: For providing rich movie and TV data.
- **OMDb API**: For additional data.
- **Stripe**: For enabling secure payments.
- **Prisma**: For making database management seamless.

---

## 🎓 About the Project

This project was created as the final project for **Akademia Samouka**.

I hope you enjoy using CineBase! If you like the project, please give it a ⭐ on GitHub!
