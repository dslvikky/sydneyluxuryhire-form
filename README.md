# Sydney Luxury Hire Form

A Vue.js/TypeScript application for handling luxury vehicle hire bookings in Sydney.

## Overview

This application provides a booking form interface for Sydney Luxury Hire, allowing customers to submit vehicle rental requests. The form integrates with EmailJS for seamless email notifications.

## Tech Stack

- **Frontend Framework**: Vue.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Email Service**: EmailJS
- **Development Environment**: StackBlitz compatible

## Project Structure
sydneyluxuryhire-form/
├── src/
│ ├── types/
│ │ └── form.ts # TypeScript interfaces
│ └── utils/
│ └── emailjs.ts # EmailJS configuration
├── .env # Environment variables (not committed)
├── .env.example # Example environment variables
├── components.json # Component configuration
├── index.html # Entry point
└── various config files

## Environment Variables

The application requires the following environment variables:
env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id


Copy `.env.example` to `.env` and fill in your EmailJS credentials.

## Email Template Variables

The EmailJS template uses the following variables:

- `from_name`: Customer's name
- `to_name`: Recipient's name (preset in template)
- `email`: Customer's email
- `phone`: Phone number
- `pickup_date`: Requested pickup date
- `return_date`: Requested return date
- `vehicle`: Selected vehicle
- `message`: Additional requirements
- `pickup_location`: Pickup location

## Setup

1. Clone the repository:
bash
git clone https://github.com/dslvikky/sydneyluxuryhire-form.git

2. Install dependencies:
```bash
npm install
```

3. Install EmailJS:
```bash
npm install @emailjs/browser
```

4. Create and configure your `.env` file based on `.env.example`

5. Start the development server:
```bash
npm run dev
```

## EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template using the variables listed above
4. Copy your credentials to the `.env` file

## Development

The application uses TypeScript for type safety. Key interfaces include:

```typescript
interface EmailFormData {
  from_name: string;
  to_name: string;
  email: string;
  phone: string;
  pickup_date: string;
  return_date: string;
  vehicle: string;
  message: string;
  pickup_location: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)
Project Link: [https://github.com/dslvikky/sydneyluxuryhire-form](https://github.com/dslvikky/sydneyluxuryhire-form)

