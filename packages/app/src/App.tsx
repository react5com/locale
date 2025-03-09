import { useEffect } from 'react';
import './App.css'
import { useLocale, getAvailableLocales, getAvailableTimeZones } from '@react5/lib'
import { Calendar } from './components';

function App() {
  const { locale } = useLocale();
  useEffect(() => {
    locale.setLocale('fr-CA');
    locale.setTimeZone('Europe/Athens');
  }, [locale]);

  console.log("languages", getAvailableLocales())
  console.log("tz", getAvailableTimeZones())
  return (
    <>
      <h1>App</h1>
      <Calendar/>
    </>
  )
}
export default App
