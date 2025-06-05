# EventRail Platform

A modern web platform for discovering events and booking railway tickets across India.

## Features

- **Event Discovery**: Browse and search for cultural events, concerts, festivals, and conferences
- **Railway Booking**: Search and book train tickets with real-time availability
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Custom auth system with JWT
- **Database**: MongoDB with Mongoose
- **Email**: SMTP integration for notifications
- **Payment**: Stripe integration for secure payments

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- SMTP email service
- Stripe account (for payments)

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd eventrail-platform
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your environment variables in `.env.local`

5. Run the development server
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@eventrail.com or create an issue in the repository.
