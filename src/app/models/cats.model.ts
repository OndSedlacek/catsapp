/**
 * Kompletní struktura modelu vygenerovaná podle response z https://app.quicktype.io/
 *
 * Využívá se pouze pro našeptávání dat uvnitř aplikace, nemá žádnou logiku, jedná se pouze o interface a nikoliv class
 */

export interface Cats {
  id:     string;
  url:    string;
  width:  number;
  height: number;
}

export interface Weather {
  coord: Coord;
  weather: WeatherN[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Sys {
  sunrise: number;
  sunset: number;
}

export interface WeatherN {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
