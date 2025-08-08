import { useState } from "react";
import { Column } from "../../Shared/Column";
import { css } from "@emotion/react";

export interface CalendarCardProps {
  title?: string;
  cssStyles?: string;
}

export function CalendarCard({ title = "Calendar", cssStyles }: CalendarCardProps) {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendarDays = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Add day headers
    dayNames.forEach((day) => {
      days.push(
        <div
          key={`header-${day}`}
          css={css`
            padding: 8px;
            text-align: center;
            font-weight: bold;
            color: #666;
            font-size: 12px;
          `}
        >
          {day}
        </div>,
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          css={css`
            padding: 8px;
          `}
        />,
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate();
      const isSelected = selectedDate && day === selectedDate.getDate();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          css={css`
            padding: 8px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.2s;
            ${isToday &&
            css`
              background-color: #007bff;
              color: white;
              font-weight: bold;
            `}
            ${isSelected &&
            !isToday &&
            css`
              background-color: #e3f2fd;
              color: #1976d2;
            `}
            &:hover {
              background-color: ${isToday ? "#0056b3" : "#f5f5f5"};
            }
          `}
        >
          {day}
        </div>,
      );
    }

    return days;
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
      <Column gap="8px">
        <div
          css={css`
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 16px;
          `}
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
          `}
        >
          {renderCalendarDays()}
        </div>
        {selectedDate && (
          <div
            css={css`
              margin-top: 16px;
              padding: 12px;
              background-color: #f8f9fa;
              border-radius: 8px;
              text-align: center;
            `}
          >
            <div
              css={css`
                font-weight: bold;
                margin-bottom: 4px;
              `}
            >
              Selected: {selectedDate.toLocaleDateString()}
            </div>
            <div
              css={css`
                font-size: 14px;
                color: #666;
              `}
            >
              No events scheduled for this date
            </div>
          </div>
        )}
      </Column>
    </div>
  );
}
