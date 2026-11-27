import client from "./client";
import { getStudentCourses } from "./courses";
import type { User } from "../types";

async function getMyCourseIds(userId: number) {
  const courses = await getStudentCourses(userId);
  return courses.map((course) => course.id);
}

async function saveCourseIds(userId: number, courseIds: number[]) {
    const response = await client.patch<User>("/users/" + userId + "/", {
        courses: courseIds,
    })

    if (response.status === 200) {
        return response.data
    } else {
        throw new Error("Could not update your courses (status " + response.status + ")" ); 
    }
}

export async function enrolInCourse(userId: number, courseId: number) {
  const currentIds = await getMyCourseIds(userId);

  let newIds = currentIds;
  if (!currentIds.includes(courseId)) {
    newIds = [...currentIds, courseId];
  }

  return saveCourseIds(userId, newIds);
}

export async function leaveCourse(userId: number, courseId: number) {
  const currentIds = await getMyCourseIds(userId);
  const newIds = currentIds.filter((id) => id !== courseId);

  return saveCourseIds(userId, newIds);
}

export async function getUsers() {
  const response = await client.get<User[]>("/users/");

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Could not load users (status " + response.status + ")");
  }
}