import { createContext, useContext } from "react";

export class LocaleContextType {
  public locale: string = 'en-US';
  public timeZone: string = 'UTC';
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
}
export const LocaleContextProvider = ({children}: LocaleContextProps) => 
  <LocaleContext.Provider value={new LocaleContextType()} >{children}</LocaleContext.Provider>;

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

export function getCurrentLocale() {
  let l = Intl?.DateTimeFormat()?.resolvedOptions().locale;
  if (!l) {
    l = navigator.language;
  }
  return l ? l : 'en-US';
}
export function getCurrentTimeZone() {
  return Intl?.DateTimeFormat()?.resolvedOptions().timeZone;
}
