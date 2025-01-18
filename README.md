# Credit Card Payment Checkout App

A React Native application that implements a complete credit card payment checkout flow with product selection, payment processing, and transaction status handling.

## Features

- Product catalog browsing and selection
- Credit card payment processing
- Support for multiple credit card types (Visa, MasterCard)
- Secure payment data handling
- Responsive design for various screen sizes
- State persistence and error handling
- Unit testing coverage > 80%

## Business Process Flow

1. **Splash Screen**: Custom branded loading screen
2. **Home of Products**: Product catalog with details and pricing
3. **Select Product**: Shopping cart functionality for multiple items
4. **Checkout**: Credit card payment initiation via backdrop
5. **Credit Card Info**: Validated card input with automatic card type detection
6. **Payment Summary**: Transaction overview with simulated API processing
7. **Final Status**: Transaction result display with return to home

## Technical Requirements

- React Native (latest stable version)
- Redux for state management
- Encrypted local storage for payment data
- Minimum screen size support: iPhone SE (2020) - 1334x750px
- Jest for unit testing
- Compiled mobile packages (.apk required, .ipa optional)

## Getting Started

### Prerequisites

Complete the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

### Installation

```bash
# Install dependencies
npm install
# OR
yarn install
```

## Development Server

### Start Metro Server

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Run Application

In a new terminal:

#### Android
```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS
```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Testing

Run the test suite:

```bash
npm test
# OR
yarn test
```

### Current Test Coverage

```
Coverage summary
---------------
Statements   : XX%
Branches     : XX%
Functions    : XX%
Lines        : XX%
```

## Security

- Payment data is encrypted before storage
- No sensitive data is persisted in plain text
- Redux state follows security best practices

## Build Information

Android APK and iOS IPA (optional) builds are available in the repository under the `builds` directory.

## Troubleshooting

If you encounter issues:

1. Ensure all dependencies are correctly installed
2. Verify your development environment setup
3. Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [Redux Documentation](https://redux.js.org)
- [Jest Testing Framework](https://jestjs.io)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
