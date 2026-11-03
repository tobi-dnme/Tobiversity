/* Adapted from Medium article: "Intro to Typescript. Interface, type and enum." by Andrii Drozdov */

export interface Course {
  id: number;
  title: string;
  description: string;
  date_added: string;
  teacher: number | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  courses: number[];
}

export interface LoginResponse {
  message: string;
  role: string;
  id: number;
  token: string;
}