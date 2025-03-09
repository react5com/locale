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

export const useLocale = () => {
  const locale = useContext(LocaleContext);
  return { locale };
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
