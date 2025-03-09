import { createContext, useContext } from "react";
import allLocales from "../../data/locales.json";

declare namespace Intl {
  type Key = "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit";

  function supportedValuesOf(input: Key): string[];
  const DateTimeFormat: any;
}
export class LocaleContextType {
  public constructor(locale?: string, timeZone?: string) {
    this.locale = locale || getCurrentLocale();
    this.timeZone = timeZone || getCurrentTimeZone();
  }
  public locale: string;
  public timeZone: string;
  public setLocale(locale: string) {
    this.locale = locale;
  }
  public setTimeZone(timeZone: string) {
    this.timeZone = timeZone;
  }
};
export const LocaleContext = createContext<LocaleContextType>(new LocaleContextType());
export interface LocaleContextProps {
  children: React.ReactNode;
  locale?: string;
  timeZone?: string;
}
export const LocaleContextProvider = ({children, locale, timeZone}: LocaleContextProps) => 
  <LocaleContext.Provider value={new LocaleContextType(locale, timeZone)} >{children}</LocaleContext.Provider>;

export function formatDate(d?: Date, locale?: string): string {
  return (d || new Date()).toLocaleDateString(locale);
}

export function combineDateAndTime(d?: Date, seconds?: number): Date {
  const datePart = d || new Date();
  const result = new Date(datePart.getFullYear(), datePart.getMonth(), datePart.getDate());
  result.setSeconds(seconds ?? 0);
  return result;
}

export function formatTime(seconds?: number, 
  skipSeconds: boolean = false, locale?: string, timeZone?: string): string {
  const d = combineDateAndTime(undefined, seconds);
  const formattedTime = d.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: skipSeconds ? undefined : 'numeric',
    timeZone
  });
  return formattedTime;
};

export const useLocale = () => {
  const locale = useContext(LocaleContext);
  return { locale, 
    formatTime: (seconds?: number, skipSeconds: boolean = false) => 
      (formatTime(seconds, skipSeconds, locale.locale, locale.timeZone)),
    formatDate: (d?: Date) => formatDate(d, locale.locale)
  };
}

export function getCurrentLocale(): string {
  let l = Intl?.DateTimeFormat()?.resolvedOptions().locale;
  if (!l) {
    l = navigator.language;
  }
  return l ? l : 'en-US';
}
export function getCurrentTimeZone(): string {
  return Intl?.DateTimeFormat()?.resolvedOptions().timeZone || "UTC";
}

export function getAvailableLocales(): string[] {
  return Intl?.DateTimeFormat?.supportedLocalesOf(allLocales) || [];
}

export function getAvailableTimeZones(): string[] {
  return Intl?.supportedValuesOf("timeZone") || [];
}