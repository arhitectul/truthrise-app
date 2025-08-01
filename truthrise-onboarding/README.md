# TruthRise Onboarding

Welcome to the TruthRise onboarding project! This project is designed to provide a seamless onboarding experience for new users of the TruthRise application. Below you will find an overview of the project structure, setup instructions, and details about the onboarding flow.

## Project Structure

```
truthrise-onboarding
├── src
│   ├── assets
│   │   ├── css
│   │   │   └── onboarding.css      # Styles specific to onboarding pages
│   │   └── js
│   │       └── onboarding.js        # JavaScript functionality for onboarding
│   ├── constitution.html            # Page for reading and acknowledging the Constitution
│   ├── location.html                # Page for inputting location details
│   ├── register.html                # Registration page for new users
│   └── components
│       └── header.html              # Header component for consistent design
├── package.json                     # npm configuration file
├── tsconfig.json                    # TypeScript configuration file
└── README.md                        # Project documentation
```

## Onboarding Flow

1. **TRUTHRISE Constitution**: Users will first be presented with the TRUTHRISE Constitution. They must read and acknowledge the document before proceeding. A button will allow them to agree and move to the next step.

2. **Location Details**: After acknowledging the Constitution, users will input their location details, including their country and city. This page will include form validation to ensure accurate data entry.

3. **Registration**: Finally, users will complete the registration process by entering their email, phone number, password, role, and how they heard about TRUTHRISE.io. This page will also include form validation and submission handling.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running:
   ```
   npm install
   ```
4. To start the development server, use:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to view the onboarding flow.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.