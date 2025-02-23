'use client'

import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QRScanner() {
    const [scannedData, setScannedData] = useState(null);
    const [gridSearch, setGridSearch] = useState('');
    const [plantData, setPlantData] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [scannerReady, setScannerReady] = useState(false);
    
    useEffect(() => {
        // Check for camera permission
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setHasPermission(true);
                initializeScanner();
            })
            .catch((err) => {
                console.error('Camera permission denied:', err);
                setHasPermission(false);
            });

        function initializeScanner() {
            // Make scanner responsive based on screen size
            const width = Math.min(window.innerWidth - 40, 640); // Max width of 640px, with 20px padding on each side
            const qrboxSize = Math.min(width - 40, 250); // QR box size based on container width
            
            const scanner = new Html5QrcodeScanner("qr-reader", {
                fps: 10,
                qrbox: qrboxSize,
                aspectRatio: 1,
                showTorchButtonIfSupported: true,
                showZoomSliderIfSupported: true,
                defaultZoomValueIfSupported: 2
            });

            scanner.render(success, error);
            setScannerReady(true);
        }
        
        function success(result) {
            fetch(`/api/plants?id=${result}`)
                .then(res => res.json())
                .then(data => setScannedData(data))
                .catch(err => console.error('Error fetching plant data:', err));
        }
        
        function error(err) {
            if (err !== 'No QR code found') { // Don't log the common "no QR found" message
                console.warn(err);
            }
        }

        // Cleanup function
        return () => {
            if (scannerReady) {
                const scanner = Html5QrcodeScanner.getScanner();
                if (scanner) {
                    scanner.clear();
                }
            }
        };
    }, []);

    const handleSearch = () => {
        if (!gridSearch.trim()) return;
        
        fetch(`/api/plants?grid=${gridSearch}`)
            .then(res => res.json())
            .then(data => setPlantData(data))
            .catch(err => console.error('Error fetching plant data:', err));
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Plant QR Scanner</h1>
            
            {!hasPermission && (
                <Card className="mb-4 bg-yellow-50">
                    <CardContent>
                        <p className="text-amber-800">⚠️ Camera access is required for QR scanning. Please allow camera access and reload the page.</p>
                    </CardContent>
                </Card>
            )}

            <div id="qr-reader" className="mb-4 mx-auto overflow-hidden rounded-lg shadow-md" />
            
            <div className="mb-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        type="text"
                        placeholder="Enter grid location (e.g., A1)"
                        value={gridSearch}
                        onChange={(e) => setGridSearch(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleSearch} className="w-full sm:w-auto">Search</Button>
                </div>
            </div>

            {scannedData && (
                <Card className="mb-4">
                    <CardContent>
                        <h2 className="text-xl font-semibold">Scanned Plant Details</h2>
                        <p><strong>ID:</strong> {scannedData.id}</p>
                        <p><strong>Grid Location:</strong> {scannedData.grid}</p>
                        <p><strong>Species:</strong> {scannedData.species}</p>
                        <p><strong>Batch:</strong> {scannedData.batch}</p>
                        <p><strong>Date:</strong> {scannedData.date}</p>
                    </CardContent>
                </Card>
            )}

            {plantData && (
                <Card className="mb-4">
                    <CardContent>
                        <h2 className="text-xl font-semibold">Search Results</h2>
                        <p><strong>ID:</strong> {plantData.id}</p>
                        <p><strong>Grid Location:</strong> {plantData.grid}</p>
                        <p><strong>Species:</strong> {plantData.species}</p>
                        <p><strong>Batch:</strong> {plantData.batch}</p>
                        <p><strong>Date:</strong> {plantData.date}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
