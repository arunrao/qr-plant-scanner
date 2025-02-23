// src/app/page.tsx
import QRScanner from '@/components/qr-scanner';

export default function Home() {
  return (
    <main className="container mx-auto">
      <QRScanner />
    </main>
  );
}
