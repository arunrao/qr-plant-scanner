'use client'

// src/components/qr-scanner.tsx
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QRScanner() {
    const [scannedData, setScannedData] = useState(null);
    const [gridSearch, setGridSearch] = useState('');
    const [plantData, setPlantData] = useState(null);
    
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        scanner.render(success, error);
        
        function success(result) {
            scanner.clear();
            fetch(`/api/plants?id=${result}`)
                .then(res => res.json())
                .then(data => setScannedData(data))
                .catch(err => console.error('Error fetching plant data:', err));
        }
        
        function error(err) {
            console.warn(err);
        }

        // Cleanup function
        return () => {
            scanner.clear();
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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
            <div id="qr-reader" className="mb-4" />
            
            <div className="mb-4">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Enter grid location (e.g., A1)"
                        value={gridSearch}
                        onChange={(e) => setGridSearch(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Search</Button>
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
