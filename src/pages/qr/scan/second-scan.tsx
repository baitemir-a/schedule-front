import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";
import styles from "./scan.module.scss";
import journalService from "../../../services/journal-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../../ui/button/button";

export default function SecondScan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [detected, setDetected] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();

    if (videoRef.current && readerRef.current) {
      const reader = readerRef.current;

      reader.decodeFromVideoDevice(undefined, videoRef.current, async (res: Result | undefined, _r, controls) => {
        if (controls && !controlsRef.current) controlsRef.current = controls;
        if (res) {
          const text = res.getText();
          setScanResult(prev => (prev === text ? prev : text));
          setDetected(true);
          setTimeout(() => setDetected(false), 1000);

          try {
            await journalService.second(text);
            toast.success("Вы отмечены ✅");
            navigate("/profile")
          } catch (e) {
            toast.error((e as { message: string }).message, {
              toastId: "second scan error"
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
  }, []);

  return (
    <div className='wrapper'>
      <h1 className={styles.title}>Second Scan</h1>

      <div className={`${styles.videoContainer} ${detected ? styles.detected : ""}`}>
        <video ref={videoRef} className={styles.video} muted playsInline />
      </div>

      {scanResult && (
        <div className={styles.resultBox}>
          <strong>Last scan:</strong> {scanResult}
        </div>
      )}
      <Button onClick={()=>navigate('/')} variant="secondary">Назад</Button>
    </div>
  );
}
