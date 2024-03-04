## Concept

🌟 Attentive Pet: Connecting Hearts, Finding Homes 🐾

Meet Attentive Pet, your go-to platform for seamlessly creating and discovering lost or found pet announcements. We understand the deep bond you share with your furry companions, and we're here to make sure they find their way back home or into caring arms.

Key Features:

Effortless Announcements: Attentive Pet streamlines the process of creating and sharing lost or found pet announcements. A user-friendly interface guides you through the quick steps of providing essential details such as pet description, last seen location, and contact information.

Instant Visibility: Your announcements are immediately visible to our community of pet lovers. Whether you're desperately seeking your missing pet or have opened your heart and home to a found one, Attentive Pet ensures your message reaches the right eyes promptly.

Browse and Connect: Easily browse through a curated list of lost and found pet announcements in your area. Connect with fellow pet owners, sharing support, information, and solidarity during these emotionally challenging times.

Anonymous Reporting: Attentive Pet respects your privacy. If you've found a lost pet but wish to remain anonymous, you can still contribute to the community by sharing essential details without revealing your identity.

Impact:

Swift Reunions: Attentive Pet accelerates the process of reuniting lost pets with their families by providing a central hub for announcements and quick information exchange.

Community Support: By fostering a community where pet owners actively engage and support each other, Attentive Pet turns every user into a potential ally in the quest to bring pets back home.

No Pet Left Behind: With Attentive Pet, every lost or found pet has a chance to be seen, heard, and cared for, ensuring that no furry friend is left wandering alone.

Embrace the power of community and compassion with Attentive Pet. Let's make sure every paw finds its way to the warmth and love it deserves. 🏡🐾

### Windows users

Be sure to run these commands in a git terminal to avoid [issues with newline formats](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm install` on the frontend folder and backend folder
- Create environment files (`.env`) in both `backend` and `frontend`: you can copy `.env.sample` files as starters (**don't** delete them)

### Available Commands

- `db:migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools (will be executed on every _commit_, and refuse unclean code)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS

### About the database

The database is automaticaly deployed with the name of your repo. During the build of the projet (`docker-entry.sh`), the `node migrate.js` command is executed in the backend. If you want to seed automaticaly your database using the `seed.js` script, replace the command _build_ on you `backend/package.json` by `node migrate.js && node seed.js`.

### About public assets (pictures, fonts...)

Don't use any public folder on your frontend. This folder won't be accessible online. You may move your public assets in the `backend/public` folder. Prefer [static assets](https://vitejs.dev/guide/assets) when possible.
