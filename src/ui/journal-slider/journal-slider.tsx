import { IJournal } from "../../types/journal-types";
import styles from "./journal-slider.module.scss";
import { useState, useEffect } from "react";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const weekday = weekdays[date.getDay()];

  return `${day}.${month}.${year} ${weekday}`;
};

const translateStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    ONTIME: "Вовремя",
    LATE: "Опоздание",
    ABSENT: "Отсутствовал",
  };

  return statusMap[status] || status;
};

const formatTotalTime = (timeString: string | null): string => {
  if (!timeString) return "0ч 0м";

  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + Math.round(seconds / 60);

  const hoursPart = Math.floor(totalMinutes / 60);
  const minutesPart = totalMinutes % 60;

  return `${hoursPart}ч ${minutesPart}м`;
};

const getStatusClass = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    ONTIME: "ontime",
    LATE: "late",
    ABSENT: "absent",
  };

  return statusMap[status] || "";
};

export const JournalSlider = ({ journal }: { journal: IJournal[] | null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sortedJournal = journal
    ? [...journal].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sortedJournal.length - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev < sortedJournal.length - 1 ? prev + 1 : 0));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [journal]);

  if (!sortedJournal || sortedJournal.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noData}>
          <p>Нет данных о посещениях</p>
        </div>
      </div>
    );
  }

  const currentJournal = sortedJournal[currentIndex];

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <button
          className={styles.arrowButton}
          onClick={goToPrevious}
          disabled={sortedJournal.length <= 1}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.slideContainer}>
          <div
            className={`${styles.journalCard} ${
              isTransitioning ? styles.transitioning : ""
            }`}
          >
            <h2 className={styles.date}>{formatDate(currentJournal.date)}</h2>

            <div className={styles.timeInfo}>
              <div className={styles.timeRow}>
                <span className={styles.label}>Приход:</span>
                <span className={styles.value}>
                  {currentJournal.arrival_time || "—"}
                </span>
              </div>
              <div className={styles.timeRow}>
                <span className={styles.label}>Уход:</span>
                <span className={styles.value}>
                  {currentJournal.departure_time || "—"}
                </span>
              </div>
              <div className={styles.timeRow}>
                <span className={styles.label}>Всего:</span>
                <span className={styles.value}>
                  {formatTotalTime(currentJournal.total_time)}
                </span>
              </div>
            </div>

            <div
              className={`${styles.status} ${
                styles[getStatusClass(currentJournal.status)]
              }`}
            >
              {translateStatus(currentJournal.status)}
            </div>

            {currentJournal.note && (
              <div className={styles.note}>{currentJournal.note}</div>
            )}
          </div>
        </div>

        <button
          className={styles.arrowButton}
          onClick={goToNext}
          disabled={sortedJournal.length <= 1}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.sliderInfo}>
        <span className={styles.slideCounter}>
          {currentIndex + 1} из {sortedJournal.length}
        </span>
      </div>
    </div>
  );
};
