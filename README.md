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

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#getting-started)
5. 🔗 [Links](#links)

## <a name="introduction">🤖 Introduction</a>
**It's an event management app where users can quickly create an account and start using it.**<br/>

## 🔋Features
- Easy to organize an event, with quick image uploading with Cloudinary ☁️
- 

## <a name="getting-started">🤸 Getting Started</a>

Clone the repository by running this command in your CLI
```bash
git clone https://github.com/mhmitas/mh-events.git
```

create a `.env.local` file in the root of the project, and fill in the below variables
```env
MONGODB_URI=""

GMAIL_ID=""
GMAIL_APP_PASSWORD=""

APP_URL=

# run `npx auth secret` to generate this variable
AUTH_SECRET=""

# Go to your Google account and create a app 
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
