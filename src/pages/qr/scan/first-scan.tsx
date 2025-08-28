import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";
import { useNavigate } from "react-router-dom";
import styles from "./scan.module.scss";
import journalService from "../../../services/journal-service";
import { toast } from "react-toastify";

export default function FirstScan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const navigate = useNavigate();

  const [isRunning, setIsRunning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [detected, setDetected] = useState(false);

  // init
  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();
    return () => { readerRef.current = null; };
  }, []);

  // start/stop
  useEffect(() => {
    if (!isRunning || !videoRef.current || !readerRef.current) return;

    const reader = readerRef.current;
    reader.decodeFromVideoDevice(undefined, videoRef.current, async (res: Result | undefined, _r, controls) => {
      if (controls && !controlsRef.current) controlsRef.current = controls;
      if (res) {
        const text = res.getText();
        setScanResult(prev => (prev === text ? prev : text));
        setDetected(true);
        setTimeout(() => setDetected(false), 1000);

        try {
          await journalService.first(scanResult||text);
          toast.success("First scan ✅");
          navigate("/scan/second", { state: { code: text } }); // передаём код во второй шаг
        } catch (e) {
          toast.error((e as { message: string }).message, {
            toastId:"first scan error"
          });
        }
      }
    }).catch(e => console.error("Failed to start scanner:", e));

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
      const v = videoRef.current;
      const s = v?.srcObject as MediaStream | null;
      s?.getTracks().forEach(t => t.stop());
    };
  }, [isRunning, navigate]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>First Scan</h1>

      <div className={`${styles.videoContainer} ${detected ? styles.detected : ""}`}>
        <video ref={videoRef} className={styles.video} muted playsInline />
      </div>

      <div className={styles.controls}>
        {!isRunning ? (
          <button onClick={() => { setScanResult(null); setIsRunning(true); }}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Stop</button>
        )}
      </div>
    </div>
  );
}
