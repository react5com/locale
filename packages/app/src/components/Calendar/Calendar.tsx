import { useEffect, useState } from "react";
import { useLocale } from "@react5/lib";

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function formatTime(date: Date, locale: string, timeZone: string) {
  return date.toLocaleTimeString(locale, { timeZone });
}
export const Calendar = () => {
  const { locale } = useLocale();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    const date = new Date();
    setTime(formatTime(date, locale.locale, locale.timeZone));
    setDate(formatDate(date, locale.locale));
  }, [locale]);

  return <>
    <h3>Calendar</h3>
    <div>{date}</div>
    <div>{time}</div>
  </>;
}
