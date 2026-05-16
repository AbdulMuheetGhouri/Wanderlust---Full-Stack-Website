# 🗺️ Wanderlust - Full Stack Travel & Rental Web Application

Wanderlust is a robust, dynamic full-stack web application that allows users to browse global travel accommodations, list new vacation properties, upload high-quality media, and leave constructive review ratings. The system is designed following strict production-ready security standards and modular MVC architecture patterns.

---

## 🚀 Key Features

* **Full CRUD Functionality**: Smooth creation, viewing, updating, and removal of rental property listings.
* **Review & Rating Matrix**: Implements interactive feedback loops allowing authenticated users to post star ratings (1-5) and text comments.
* **Secure Authentication**: End-to-end identity management featuring user signup, login, session persistence, and logout capabilities powered by Passport.js.
* **Strict Authorization Middlewares**: Route-level safeguards ensuring only designated resource owners hold privileges to edit or delete data.
* **Cloud-Native Media Processing**: Integrated stream handling using Multer and Cloudinary API wrappers for dynamic remote image storage.
* **Session Management Isolation**: Production-grade persistent session management using `connect-mongo` to prevent memory leaks and server state-loss.
* **Server-Side Data Schema Validation**: Implements Joi validation layers to filter incoming request objects before hitting the MongoDB cluster.

---

## 🛠️ Tech Stack Matrix


| Architectural Layer | Technology Used | Functional Description |
| :--- | :--- | :--- |
| **Frontend Layout** | HTML5, CSS3, Bootstrap 5 | Structural assembly, modern typography, and total UI responsiveness. |
| **Templating Engine** | EJS (Embedded JavaScript) | Render-side programmatic scripting with partial modular views via `ejs-mate`. |
| **Backend Framework** | Node.js, Express.js | Core API endpoint setups, HTTP handling, and middleware orchestration. |
| **Database Tier** | MongoDB Atlas, Mongoose | Scalable Document Object Mapper and cloud non-relational storage clusters. |
| **Security & Auth** | Passport.js, Passport-Local | Localized user session extraction, tokenization, and crypt-hashing layers. |
| **Media Cloud Storage** | Cloudinary API, Multer | Direct parsing, validation, and cloud storage allocation for multi-part file uploads. |

---

## 📁 System Architecture & Directory Tree

The workspace is segmented using a strict **Model-View-Controller (MVC)** structural pattern to guarantee system scalability:

```text
├── Controllers/       # Core business logic processing incoming parsed data arrays
├── Models/            # Mongoose Schemas definitions (Listing, Review, User blueprints)
├── public/            # Static static assets hosting production stylesheets, scripts, and media
├── routes/            # Isolated Express routers mapping precise API endpoints
├── utils/             # Express asynchronous error wrappers and custom fallback error classes
├── Views/             # Extensible EJS interface layouts and structural dynamic fragments
├── .env               # Sandboxed secret storage keys (Exempt from remote tracking)
├── app.js             # Root application script handling database attachment and configurations
└── schema.js          # Definitive server-side validation filters powered by Joi engine
```

---

## 🔐 Advanced Software Engineering and Security Measures

* **Credential Isolation**: Local environmental factors (`.env`) are strictly locked within local infrastructure boundaries via `.gitignore` maps to safeguard live MongoDB database chains and cloud infrastructure secrets.
* **State Management Security**: Session layers are detached from ephemeral internal memory blocks and decoupled via `connect-mongo@5` engines, handling active session strings within custom schemas safely.
* **Race Condition Prevention**: Employs structural standard asynchronous tracking blocks inside middleware chains using explicit `res.headersSent` evaluations to block accidental double-response crashes.

---

## 📸 Application Live Interface Preview


<img src="image.png" width="750" alt="Wanderlust Dashboard Interface Preview" />

---

## 💻 Local Installation and Development Guide

To install and initialize this workspace locally, follow these structured execution steps:

### 1. Clone the Remote Workspace
```bash
git clone https://github.com/AbdulMuheetGhouri/Wanderlust---Full-Stack-Website.git
cd "Full Stack Project"
```

### 2. Provision Native Library Modules
```bash
npm install --legacy-peer-deps
```

### 3. Setup Sandboxed Environment Keyrings
Generate a hidden `.env` text file within the root runtime hierarchy, populating it with precise keys:
```env
MONGO_ATLAS="your_mongodb_atlas_cluster_connection_uri_string"
STORE_SECRET="your_custom_production_session_store_secret_token"
SESSION_SECRET="your_custom_express_identity_session_secret_token"
CLOUD_NAME="your_production_cloudinary_account_cloud_name"
CLOUD_API_KEY="your_production_cloudinary_account_api_key"
CLOUD_API_SECRET="your_production_cloudinary_account_api_secret"
```

### 4. Populate Local Testing Environment (Data Seeding)
To automatically push default mock dataset components down to your active Mongo collection tree, seed the system:
```bash
node init/index.js
```

### 5. Initialize Live Development Lifecycle
```bash
npx nodemon app.js
```
The system will output operational signals down to your local terminal. Open your browser and point the navigation path to: `http://localhost:8080/listings`.

## 🔮 Future Roadmap & Scalability Updates

The following feature sets are planned for upcoming development phases to scale the application into a commercial-grade platform:

* **Geospatial Mapping Integration**: Integrating the Mapbox GL JS API to automatically convert text addresses into exact coordinates and display proximity markers on an interactive map layer.
* **Advanced Multi-Criteria Filtering**: Adding dynamic search query matrices to allow users to filter properties instantly by pricing thresholds, structural amenities, and specific categories (e.g., beachfront, trending, castles).
* **Payment Gateway Integration**: Embedding Stripe API infrastructure to process test checkout structures, handle booking reservations, and manage mock invoices.
* **Real-Time Websocket Chat Engine**: Setting up Socket.io channels to enable instant messaging threads between property owners and prospective renters.
* **Enhanced Admin Analytics Dashboard**: Building custom server-side data aggregation pipelines to track user signups, popular listings, and total traffic metrics inside a dedicated panel.


## Deployment
Configured for Render + MongoDB Atlas.

## Author
Abdul Muheet Ghouri
