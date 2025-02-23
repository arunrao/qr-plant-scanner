# QR Code Plant Scanner - Setup Instructions

## Project Setup

1. Create a new Next.js project with the following command:
```bash
npx create-next-app@latest qr-plant-scanner --typescript --tailwind --eslint
cd qr-plant-scanner
```

2. Install additional dependencies:
```bash
npm install html5-qrcode @radix-ui/react-slot @radix-ui/react-toast class-variance-authority clsx tailwind-merge lucide-react
```

3. Create the following directory structure:
```
qr-plant-scanner/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── plants/
│   │   │       └── route.ts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── button.tsx
│   │   └── qr-scanner.tsx
│   └── lib/
│       └── data.ts
├── public/
└── package.json
```

4. After creating all the files, run the development server:
```bash
npm run dev
```

5. Open your browser to http://localhost:3000 

## Testing the QR Code Scanner

1. The scanner will automatically start when you load the page
2. To test, you can use any QR code generator to create codes with the following format:
   - Create a QR code with text "PLT001" (or any ID from PLT001 to PLT010)
   - You can use websites like https://www.qr-code-generator.com/
3. When scanned, it will display the plant information for that ID
4. You can also manually search by grid location (e.g., "A1", "B2", etc.)

## Troubleshooting

- Make sure to allow camera access when prompted by your browser
- If the scanner doesn't start, check your browser's console for any errors
- The scanner works best with good lighting and a stable camera view
