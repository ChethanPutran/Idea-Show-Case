# 💡 Idea Showcase

**A full-stack platform for creating, managing, and showcasing ideas.**

Idea Showcase is a web application designed for students, developers, entrepreneurs, investors, and technology enthusiasts to document and showcase their ideas in one place.

Users can create an account, maintain a profile, upload a profile image, create and manage ideas, track idea status and completion, and interact with an idea-oriented dashboard.

---

## ✨ Features

### 👤 User Management

* User registration and login
* Session-based authentication
* Password hashing with `bcrypt`
* User profile management
* Profile image upload and processing
* Account deletion
* Email and password validation
* Logout functionality
* Session persistence using MongoDB

### 💡 Idea Management

Users can create and manage their ideas with information such as:

* Title
* Description
* Technology/domain
* Current status
* Completion percentage
* Idea image
* Owner
* Creation and modification timestamps

Ideas can have one of three statuses:

* **Active**
* **Inactive**
* **Finished**

### 📊 Dashboard

The application provides a dashboard for managing ideas and user information.

The dashboard includes:

* Ideas grouped by status
* Idea counts
* Idea refresh functionality
* New idea creation
* User profile information
* Insights
* Viewers and suggestions sections
* Interactive UI components
* Notifications/snackbars

### 🖼️ Image Processing

Profile images are uploaded and processed on the server using **Sharp**.

The application:

1. Accepts an uploaded image.
2. Resizes it to `350 × 350`.
3. Converts it to PNG.
4. Stores the resulting image data in MongoDB.
5. Converts image data to a data URI when serving it to the frontend.

### 🔐 Authentication & Security

The backend uses:

* Express sessions
* MongoDB-backed session storage
* `bcrypt` password hashing
* Authentication middleware
* Input validation
* Protected user and idea routes

---

## 🏗️ Architecture

The application follows a traditional full-stack Node.js architecture.

```text
┌─────────────────────────────────────────────┐
│                 Browser                     │
│                                             │
│  Handlebars Views + Client-side JavaScript  │
│  CSS + UI Components                        │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTP / Form Requests
                       ▼
┌─────────────────────────────────────────────┐
│              Express Server                 │
│                                             │
│  Routes                                     │
│  ├── Authentication                         │
│  ├── User Management                        │
│  └── Idea Management                        │
│                                             │
│  Middleware                                 │
│  ├── Authentication                         │
│  ├── Sessions                               │
│  ├── Cookies                                │
│  └── Request Parsing                        │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 Mongoose                    │
│                                             │
│  User Model                                 │
│  Idea Model                                 │
│  Fund / Payment Model                       │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                  MongoDB                    │
│                                             │
│  Users                                      │
│  Ideas                                      │
│  Sessions                                   │
│  Related application data                   │
└─────────────────────────────────────────────┘
```

---

## 🧰 Technology Stack

### Backend

| Technology           | Purpose                   |
| -------------------- | ------------------------- |
| **Node.js**          | JavaScript runtime        |
| **Express.js**       | Web server and REST API   |
| **MongoDB**          | Database                  |
| **Mongoose**         | MongoDB ODM               |
| **Handlebars (HBS)** | Server-side rendering     |
| **Express Session**  | Session management        |
| **Connect Mongo**    | MongoDB session storage   |
| **bcrypt**           | Password hashing          |
| **Multer**           | File uploads              |
| **Sharp**            | Image processing          |
| **Validator**        | Input validation          |
| **SendGrid**         | Email functionality       |
| **dotenv**           | Environment configuration |

### Frontend

* HTML
* CSS
* JavaScript
* Handlebars
* Modular JavaScript components
* IndexedDB
* Browser Local Storage

---

## 📁 Project Structure

```text
Idea-Show-Case/
│
├── public/
│   └── App/
│       ├── Components/
│       │   ├── Backdrop/
│       │   ├── Idea/
│       │   ├── Insights/
│       │   ├── Loader/
│       │   ├── Modal/
│       │   ├── OptionModal/
│       │   ├── Prompt/
│       │   ├── Sidebar/
│       │   ├── Sidebox/
│       │   ├── Snackbar/
│       │   ├── Tab/
│       │   └── Tooltip/
│       │
│       ├── Utils/
│       │   ├── clientDBHandler.js
│       │   ├── helperClass.js
│       │   ├── move.js
│       │   └── requests.js
│       │
│       ├── pages/
│       │   ├── dashboard.js
│       │   └── home.js
│       │
│       └── resources/
│           ├── css/
│           └── images/
│
├── src/
│   ├── db/
│   │   └── mongoose.js
│   │
│   ├── emails/
│   │   └── emailSender.js
│   │
│   ├── middlewares/
│   │   └── authenticate.js
│   │
│   ├── modals/
│   │   ├── idea.js
│   │   ├── payments.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── ideaRoutes.js
│   │   ├── index.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   ├── fileHandler.js
│   │   ├── fileUpload.js
│   │   ├── objHandler.js
│   │   ├── parseForm.js
│   │   ├── parser.js
│   │   ├── passHandler.js
│   │   └── pngToDataUri.js
│   │
│   └── index.js
│
├── views/
│   ├── 404.hbs
│   ├── dashboard.hbs
│   ├── home.hbs
│   ├── ideas.hbs
│   ├── login.hbs
│   ├── signup.hbs
│   └── partials/
│
├── app.test.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔄 Application Flow

### 1. User Registration

```text
User
 │
 ▼
Signup Form
 │
 ▼
Express Route
 │
 ▼
Validate User Data
 │
 ▼
Hash Password
 │
 ▼
MongoDB
 │
 ▼
Account Created
```

### 2. Login

```text
User
 │
 ▼
Login
 │
 ▼
Find User
 │
 ▼
Compare Password
 │
 ▼
Create Session
 │
 ▼
Dashboard
```

### 3. Creating an Idea

```text
Dashboard
 │
 ▼
New Idea
 │
 ▼
Idea Form
 │
 ▼
POST /ideas/idea
 │
 ▼
Authentication
 │
 ▼
Create Idea
 │
 ▼
MongoDB
 │
 ▼
Dashboard Refresh
```

---

## 🔌 API Routes

### Authentication & General Routes

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| `GET`  | `/`           | Home page              |
| `GET`  | `/login`      | Login page             |
| `POST` | `/login`      | Authenticate user      |
| `GET`  | `/signup`     | Registration page      |
| `POST` | `/signup`     | Create user            |
| `GET`  | `/logout`     | End current session    |
| `POST` | `/logoutAll`  | End session            |
| `POST` | `/forgotPass` | Password recovery flow |

### User Routes

| Method   | Endpoint                 | Description            |
| -------- | ------------------------ | ---------------------- |
| `GET`    | `/user/:id`              | Retrieve user          |
| `GET`    | `/user/:id/avatar`       | Retrieve profile image |
| `GET`    | `/user/dashboard`        | User dashboard         |
| `POST`   | `/user/dashboard/avatar` | Upload profile image   |
| `DELETE` | `/user/dashboard/avatar` | Remove profile image   |
| `PATCH`  | `/user/dashboard`        | Update profile         |
| `DELETE` | `/user/dashboard`        | Delete account         |

### Idea Routes

| Method   | Endpoint          | Description              |
| -------- | ----------------- | ------------------------ |
| `GET`    | `/ideas`          | Retrieve ideas           |
| `POST`   | `/ideas/idea`     | Create an idea           |
| `GET`    | `/ideas/idea/:id` | Retrieve a specific idea |
| `PATCH`  | `/ideas/idea/:id` | Update an idea           |
| `DELETE` | `/ideas/idea/:id` | Delete an idea           |

> Some route implementations in the current codebase are still under development, so the documented API represents the intended application structure as well as the currently implemented endpoints.

---

## 🗃️ Data Models

### User

The `User` model contains:

```text
User
├── name
├── email
├── password
├── date of birth
├── designation
├── about
├── address
├── phone number
├── profile photo
└── timestamps
```

Users are associated with their ideas through a relationship between the `User` and `Idea` models.

### Idea

```text
Idea
├── title
├── description
├── idea image
├── field
├── status
├── owner
├── completion
├── partners
└── timestamps
```

Supported technology fields include areas such as:

* Information Technology
* Medical Technology
* Communications Technology
* Education Technology
* Aerospace Technology
* Biotechnology
* Artificial Intelligence
* Robotics
* Electronics
* Agriculture
* Environmental Technology
* Vehicle Technology
* 3D Printing
* Assistive Technology
* Sports Technology

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Git

The original project specifies Node.js `14.17.3` in `package.json`.

### Clone the repository

```bash
git clone https://github.com/ChethanPutran/Idea-Show-Case.git
cd Idea-Show-Case
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
API_KEY_EMAIL=your_sendgrid_api_key
```

Do not commit your `.env` file to Git.

### Start the application

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The server will run at:

```text
http://localhost:3000
```

---

## 🧪 Testing

The repository includes an `app.test.js` file for application testing.

Run the project's available test configuration according to the test setup in the repository.

---

## 🚀 Deployment

The project contains notes for deploying the application using Heroku.

Example:

```bash
heroku create idea-show-case
```

Configure environment variables:

```bash
heroku config:set PORT=3000 DB_URL=your_database_url SECRET=your_secret
```

View configured variables:

```bash
heroku config
```

Remove a variable:

```bash
heroku config:unset KEY
```

---

## 🔒 Environment Variables

The application expects configuration to be provided through environment variables.

| Variable        | Purpose                   |
| --------------- | ------------------------- |
| `PORT`          | Server port               |
| `DB_URL`        | MongoDB connection string |
| `SECRET`        | Express session secret    |
| `API_KEY_EMAIL` | SendGrid API key          |

Never expose credentials, database URLs, session secrets, or API keys in source control.

---

## 🧩 Design Highlights

### Modular Backend

The backend separates responsibilities into:

* Routes
* Models
* Middleware
* Database configuration
* Utilities
* Email services

This makes individual application components easier to maintain and extend.

### Session-Based Authentication

Authenticated users receive a server-side session, with session data persisted through MongoDB.

### Modular Frontend

The dashboard is organized into reusable JavaScript components such as:

```text
Ideas
├── IdeaList
├── IdeaItem
└── IdeaForm

Dashboard
├── Sidebar
├── Sidebox
├── Insights
├── Tabs
├── Modal
└── Snackbar
```

### Client-Side Storage

The project also contains an IndexedDB abstraction for storing and retrieving idea-related data locally in the browser.

---

## 🛣️ Future Improvements

Potential areas for further development include:

* Complete idea editing UI
* Complete idea deletion UI
* Idea image upload support
* Search and filtering
* Pagination
* Public idea discovery
* User-to-user collaboration
* Investor/creator workflows
* Idea funding functionality
* Notifications
* Password reset via email OTP
* Improved API validation
* Automated API testing
* Improved authorization and ownership checks
* Production deployment configuration
* Modernization of the Node.js and dependency versions

---

## 📌 Project Status

**Status: Prototype / Development**

The repository contains a working full-stack architecture with authentication, user management, idea management, dashboard components, MongoDB integration, image processing, and session management. Some features and routes remain incomplete or are still under development.

---

## 📄 License

This project currently uses the **ISC License**, as specified in `package.json`.
