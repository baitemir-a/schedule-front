import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Result } from "@zxing/library";
import styles from "./scan.module.scss";
import journalService from "../../../services/journal-service";
import { toast } from "react-toastify";

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [detected, setDetected] = useState(false);
  const [firstScan, setFirstScan] = useState(false);
  const [secondScan, setSecondScan] = useState(false);

  // чтобы чистить setTimeout при смене кода/размонтировании
  const timerRef = useRef<number | null>(null);

  // init
  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();
    return () => { readerRef.current = null; };
  }, []);

  // start/stop camera
  useEffect(() => {
    if (!isRunning || !videoRef.current || !readerRef.current) return;
    const reader = readerRef.current;

    reader
      .decodeFromVideoDevice(undefined, videoRef.current, (res: Result | undefined, _r, controls) => {
        if (controls && !controlsRef.current) controlsRef.current = controls;
        if (res) {
          const text = res.getText();
          // не дёргай эффект, если строка не изменилась
          setScanResult(prev => (prev === text ? prev : text));
          setDetected(true);
          setTimeout(() => setDetected(false), 1000);
        }
      })
      .catch(e => console.error("Failed to start scanner:", e));

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
      const v = videoRef.current;
      const s = v?.srcObject as MediaStream | null;
      s?.getTracks().forEach(t => t.stop());
    };
  }, [isRunning]);

  // first -> (debounce 3s) -> second
  useEffect(() => {
    if (!scanResult) return;

    let cancelled = false;

    const run = async () => {
      try {
        await journalService.first(scanResult);
        if (cancelled) return;
        setFirstScan(true);

        // чистим прошлый таймер, если был
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }

        // дебаунс 3с перед second
        timerRef.current = window.setTimeout(async () => {
          toast(scanResult)
          try {
            await journalService.second(scanResult);
            setSecondScan(true);
          } catch (e) {
            toast.error((e as { message: string }).message, {
              theme: "light",
              position: "bottom-center",
              toastId: "scan-error-second",
            });
          }
        }, 3000);
      } catch (e) {
        toast.error((e as { message: string }).message, {
          theme: "light",
          position: "bottom-center",
          toastId: "scan-error-first",
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [scanResult]);

  const isUrl = scanResult?.startsWith("http");

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>QR Scanner</h1>

      <div className={`${styles.videoContainer} ${detected ? styles.detected : ""}`}>
        <video ref={videoRef} className={styles.video} muted playsInline />
      </div>

      <div className={styles.controls}>
        {!isRunning ? (
          <button className={styles.startBtn} onClick={() => {
            // опционально: сбрасываем состояние перед новым раном
            setFirstScan(false);
            setSecondScan(false);
            setScanResult(null);
            setIsRunning(true);
          }}>
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
          <strong>Last scan:</strong>{" "}
          {isUrl ? <a href={scanResult}>{scanResult}</a> : <span>{scanResult}</span>}
        </div>
      )}
      {firstScan && (
        <div className={styles.resultBox}>
          <strong>First scan ✅</strong>
        </div>
      )}
      {secondScan && (
        <div className={styles.resultBox}>
          <strong>Second scan ✅</strong>
        </div>
      )}
    </div>
  );
}
