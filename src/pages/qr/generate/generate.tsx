import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { EventSourcePolyfill } from 'event-source-polyfill';

import styles from "./generate.module.scss";

export default function Generate() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const getTodayString = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  useEffect(() => {
    setText(getTodayString());

    const baseUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, "");
    const eventSource = new EventSourcePolyfill(
      `${baseUrl}/events/subscribe`,
      { withCredentials: true }
    );
    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "NEW_JOURNAL" && data.payload?.uuid) {
          setLoading(true);
          setTimeout(() => {
            setText(data.payload.uuid);
            setLoading(false);
            setTimeout(() => {
              setText(getTodayString());
            }, 30_000);
          }, 1000);
        }
      } catch (err) {
        console.error("Ошибка парсинга события:", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>QR code</h1>

      <div className={styles.qrBox}>
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <QRCodeCanvas value={text} size={200} level="H" />
        )}
      </div>
    </div>
  );
}
