import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";
import styles from "./scan.module.scss";

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [detected, setDetected] = useState(false);

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
          setScanResult(text);
          setDetected(true);
          setTimeout(() => setDetected(false), 1000);
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
    <div className={styles.wrapper}>
      <h1 className={styles.title}>QR Scanner</h1>

      <div className={`${styles.videoContainer} ${detected ? styles.detected : ""}`}>
        <video ref={videoRef} className={styles.video} muted playsInline />
      </div>

      <div className={styles.controls}>
        {!isRunning ? (
          <button className={styles.startBtn} onClick={() => setIsRunning(true)}>
            Start
          </button>
        ) : (
          <button className={styles.stopBtn} onClick={() => setIsRunning(false)}>
            Stop
          </button>
        )}
      </div>

      {scanResult && (
        <div className={styles.resultBox}>
          <strong>Last scan:</strong> <a href={scanResult}>{scanResult}</a>
        </div>
      )}
    </div>
  );
}
