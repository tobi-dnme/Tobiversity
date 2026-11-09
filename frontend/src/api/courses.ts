/* Adapted from tutorial "How to Integrate Axios and React Query for Data Fetching" by Rifky Alfarez
... and mentor's notes */

import client from "./client";
import type { Course } from "../types";

export async function getCourses() {
  const response = await client.get<Course[]>("/courses/");

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("ERROR " + response.status + ": Sorry, couldn't get you the courses");
  }
}

export async function getCourse(id: number) {
  const response = await client.get<Course>("/courses/" + id + "/");

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("ERROR " + response.status + ": Sorry, couldn't get you that course");
  }
}

export async function getStudentCourses(userId: number) {
  const response = await client.get<Course[]>("/users/" + userId + "/courses/");

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("ERROR " + response.status + ": Sorry Student, couldn't get your courses");
  }
}

export async function getTeacherCourses(teacherId: number) {
  const response = await client.get<Course[]>("/teachers/" + teacherId + "/courses/");

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("ERROR " + response.status + ": Sorry Teacher, couldn't get your courses");
  }
}