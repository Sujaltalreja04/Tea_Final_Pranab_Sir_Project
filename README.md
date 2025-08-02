# Tea Expert Project

A comprehensive tea industry platform featuring a website for tea enthusiasts and an admin panel for tea experts and administrators.

## 🌟 Features

### Tea Connect Expert Website
- **User Authentication**: Secure login and registration system
- **Tea Services**: Browse and book tea consultation services
- **Event Management**: View and participate in tea-related events
- **Expert Profiles**: Detailed profiles of tea experts
- **Responsive Design**: Modern UI built with React and Tailwind CSS

### Admin Panel
- **Dashboard**: Comprehensive analytics and overview
- **Booking Management**: Handle client bookings and appointments
- **Expert Management**: Manage tea expert profiles and reviews
- **User Management**: Administer user accounts and permissions
- **Notifications**: Real-time notification system

## 🚀 Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL (schema included)
- **Authentication**: JWT-based authentication
- **State Management**: React Context API

## 📁 Project Structure

```
Tea-expert/
├── Admin_panel/                 # Admin panel React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Routing configuration
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   ├── server/                # Backend server
│   └── package.json
├── Tea-Connect-Expert-Website-main/  # Main website
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/            # Page components
│   │   ├── routes/           # Routing
│   │   ├── services/         # API services
│   │   └── utils/            # Utilities
│   ├── server/               # Backend server
│   └── package.json
└── db_schema.sql             # Database schema
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd Tea-Connect-Expert-Website-main/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   mysql -u your_username -p your_database < ../../db_schema.sql
   ```

4. Configure environment variables (create `.env` file):
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=tea_expert_db
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

#### Main Website
1. Navigate to the website directory:
   ```bash
   cd Tea-Connect-Expert-Website-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

#### Admin Panel
1. Navigate to the admin panel directory:
   ```bash
   cd Admin_panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🌐 Access Points

- **Main Website**: http://localhost:5173
- **Admin Panel**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📊 Database Schema

The project includes a comprehensive database schema (`db_schema.sql`) with tables for:
- Users and authentication
- Tea experts and their profiles
- Bookings and appointments
- Events and services
- Reviews and ratings

## 🔧 Configuration

### Environment Variables
Create `.env` files in both server directories with the following variables:
- `DB_HOST`: Database host
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Sujal Talreja** - *Initial work* - [Sujaltalreja04](https://github.com/Sujaltalreja04)

## 🙏 Acknowledgments

- Tea industry experts for domain knowledge
- React and Node.js communities
- All contributors and testers

---

**Note**: This is a comprehensive tea industry platform designed to connect tea enthusiasts with expert consultants and provide administrative tools for managing the ecosystem. 