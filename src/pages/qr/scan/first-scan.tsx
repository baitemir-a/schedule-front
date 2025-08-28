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

  const [detected, setDetected] = useState(false);

  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();

    if (videoRef.current && readerRef.current) {
      const reader = readerRef.current;

      reader.decodeFromVideoDevice(undefined, videoRef.current, async (res: Result | undefined, _r, controls) => {
        if (controls && !controlsRef.current) controlsRef.current = controls;
        if (res) {
          const text = res.getText();
          setDetected(true);
          setTimeout(() => setDetected(false), 1000);

          try {
            await journalService.first(text);
            navigate("/scan/second", { state: { code: text } });
          } catch (e) {
            toast.error((e as { message: string }).message, {
              toastId: "first scan error"
            });
          }
        }
      }).catch(e => console.error("Failed to start scanner:", e));
    }

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
      const v = videoRef.current;
      const s = v?.srcObject as MediaStream | null;
      s?.getTracks().forEach(t => t.stop());
    };
  }, [navigate]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>First Scan</h1>

      <div className={`${styles.videoContainer} ${detected ? styles.detected : ""}`}>
        <video ref={videoRef} className={styles.video} muted playsInline />
      </div>
    </div>
  );
}
