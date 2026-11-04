/* Adapted from tutorial "How to Integrate Axios and React Query for Data Fetching" by Rifky Alfarez */
import client from "./client";
import type { Course } from "../types";

export async function getCourses() {
  const response = await client.get<Course[]>("/courses/");
  return response.data;
}

export async function getCourse(id: number) {
  const response = await client.get<Course>("/courses/" + id + "/");
  return response.data;
}

export async function getStudentCourses(userId: number) {
  const response = await client.get<Course[]>("/users/" + userId + "/courses/");
  return response.data;
}

export async function getTeacherCourses(teacherId: number) {
  const response = await client.get<Course[]>("/teachers/" + teacherId + "/courses/");
  return response.data;
}