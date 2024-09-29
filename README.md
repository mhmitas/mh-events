# MH EVENTS

<div align="center">
  <br />
    <a href="https://mhmitas.vercel.app/" target="_blank">
      <img src="https://github.com/mhmitas/mh-events/blob/edit-readme-file/public/images/Screenshot.png?raw=true" alt="Project Banner">
    </a>
  <br />

  <div>
   <img src="https://img.shields.io/badge/-React_JS-blue?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="React.js" />
    <img src="https://img.shields.io/badge/-Next_JS_14-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logoColor=white&logo=stripe&color=008CDD" alt="stripe" />
  </div>
</div>


## 📋 <a name="table">Table of Contents</a>

1. 💁‍♂️ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 😎 [Features](#features)
4. 🚎 [Quick Start](#getting-started)
5. 🔗 [Links](#links)

## <a name="introduction">💁‍♂️ Introduction</a>
**It's an event management app where users can quickly create an account and start using it.**<br/>

## <a name="tech-stack">⚙️ Tech Stack</a>
1. React.js
2. Next.js
3. Mongodb with Mongoose
4. Stripe
5. Tailswindcss
6. Shadncn/UI
7. ShadCn form with React Hook Form and Zod
8. Cloudinary
9. Auth.js

## <a name="features">😎 Features</a>

- Simplified event organization process.
- Effortless event booking with just a few clicks.
- Comprehensive dashboard for managing events and bookings.
- Advanced search and filtering options for easy event discovery.
- Secure payment integration via Stripe.
- Optimized for fast loading and performance with Next.js.


## <a name="getting-started">🚎 Getting Started</a>

Clone the repository by running this command in your CLI
```bash
git clone https://github.com/mhmitas/mh-events.git
```
To implement authentication follow the [Auth.js](https://authjs.dev/) docs

create a `.env.local` file in the root of the project, and fill in the below variables
```env
MONGODB_URI=""

# GMAIL_ID=""
# GMAIL_APP_PASSWORD=""

APP_URL=

# run `npx auth secret` to generate this variable
AUTH_SECRET=""

# Go to your [Google devlopers console](https://console.cloud.google.com/) and create a app 
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# create a Cloudinary account and take these credentials
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```


Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
