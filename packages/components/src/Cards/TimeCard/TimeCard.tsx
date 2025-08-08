import { useState, useEffect } from "react";
import { Column } from "../../Shared/Column";
import { css } from "@emotion/react";

export interface TimeCardProps {
  title?: string;
  showDate?: boolean;
  showSeconds?: boolean;
  timezone?: string;
  cssStyles?: string;
}

export function TimeCard({ title = "Current Time", showDate = true, showSeconds = true, timezone = "local", cssStyles }: TimeCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
      hour12: true,
    };

    if (timezone !== "local") {
      options.timeZone = timezone;
    }

    return date.toLocaleTimeString("en-US", options);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (timezone !== "local") {
      options.timeZone = timezone;
    }

    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      css={css`
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        ${cssStyles}
      `}
    >
      <div
        css={css`
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #333;
        `}
      >
        {title}
      </div>
      <Column gap="8px" alignItems="center">
        <div
          css={css`
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--ha-A400, #007bff);
            text-align: center;
            font-family: "Courier New", monospace;
          `}
        >
          {formatTime(currentTime)}
        </div>

        {showDate && (
          <div
            css={css`
              font-size: 1rem;
              color: var(--ha-S200-contrast, #666);
              text-align: center;
            `}
          >
            {formatDate(currentTime)}
          </div>
        )}

        {timezone !== "local" && (
          <div
            css={css`
              font-size: 0.8rem;
              color: var(--ha-S200-contrast, #999);
              text-align: center;
              margin-top: 4px;
            `}
          >
            {timezone}
          </div>
        )}
      </Column>
    </div>
  );
}
