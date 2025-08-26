// Install: npm i @zxing/browser @zxing/library
// Simple QR scanner: scans QR codes and logs results to console.

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();
    return () => {
      readerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isRunning || !videoRef.current || !readerRef.current) return;

    const reader = readerRef.current;
    reader
      .decodeFromVideoDevice(undefined, videoRef.current, (res: Result | undefined, _, controls) => {
        if (controls && !controlsRef.current) controlsRef.current = controls;
        if (res) {
          const text = res.getText();
          console.log("QR Code result:", text);
          setScanResult(text);
        }
      })
      .catch(e => {
        console.error("Failed to start scanner:", e);
      });

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
      const v = videoRef.current;
      const s = v?.srcObject as MediaStream | null;
      s?.getTracks().forEach(t => t.stop());
    };
  }, [isRunning]);

  return (
    <div className="mx-auto max-w-md p-4 space-y-4">
      <h1 className="text-xl font-semibold">QR Scanner</h1>

      <div className="relative overflow-hidden rounded-2xl bg-black">
        <video ref={videoRef} className="w-full h-[300px] object-cover" muted playsInline />
        <div className="pointer-events-none absolute inset-0 ring-4 ring-white/20 rounded-2xl" />
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <button className="rounded-2xl px-4 py-2 bg-blue-600 text-white shadow" onClick={() => setIsRunning(true)}>
            Start
          </button>
        ) : (
          <button className="rounded-2xl px-4 py-2 bg-gray-800 text-white shadow" onClick={() => setIsRunning(false)}>
            Stop
          </button>
        )}
      </div>

      {scanResult && (
        <div className="rounded-2xl border p-3 text-sm break-words">
          <strong>Last scan:</strong> <a href={scanResult}>{scanResult}</a>
        </div>
      )}
    </div>
  );
}
