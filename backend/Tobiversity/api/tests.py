from django.test import SimpleTestCase, TestCase
from django.urls import reverse, resolve
from django.contrib.auth.models import Group, Permission
from rest_framework.authtoken.models import Token

from api.views import CourseView
from api.models import Course, User

# Adapted from Medium tutorial 'Django: How To Set Up Tests And Testing URLs' by Prinsa Joshi.
class TestUrls(SimpleTestCase):

    def test_courses_url_uses_course_view(self):
        url = reverse("courses")
        self.assertEqual(resolve(url).func.view_class, CourseView)


# Adapted from GeeksforGeeks Tutorial: Running Individual Test Cases in Django with a Tests Directory.
class TestCourseViews(TestCase):

    def setUp(self):
        teacher_group = Group.objects.create(name="Teacher")
        student_group = Group.objects.create(name="Student")

        course_perms = Permission.objects.filter(
            content_type__app_label="api",
            codename__in=["add_course", "change_course", "delete_course", "view_course"]
        )

        student_perms = Permission.objects.filter(
            content_type__app_label="api", 
            codename="view_course"
        )

        teacher_group.permissions.set(course_perms)
        student_group.permissions.set(student_perms)

        self.teacher_a = User.objects.create_user(username="teacher_a", password="P455W0RD", role=User.TEACHER)
        self.teacher_b = User.objects.create_user(username="teacher_b", password="P455W0RD", role=User.TEACHER)
        self.student = User.objects.create_user(username="student_a", password="P455W0RD", role=User.STUDENT)

        self.teacher_a.groups.add(teacher_group)
        self.teacher_b.groups.add(teacher_group)
        self.student.groups.add(student_group)

        self.course = Course.objects.create(
            title="Test Subject", description="Get it? A subject on Tests...nevermind", teacher=self.teacher_a
        )
        self.token_one = Token.objects.create(user=self.teacher_a)
        self.token_two = Token.objects.create(user=self.teacher_b)
        self.token_student = Token.objects.create(user=self.student)


    def test_teacher_cannot_patch_another_teachers_course(self): # VS Generated code
        url = reverse("course_detail", args=[self.course.pk])

        response = self.client.patch(
            url,
            data={"title": "Hacked"},
            content_type="application/json",
            HTTP_AUTHORIZATION=f"Token {self.token_two.key}",
        )

        self.assertEqual(response.status_code, 403)
        self.course.refresh_from_db()
        self.assertEqual(self.course.title, "Test Subject")


    def test_teacher_can_patch_own_course(self): # my own test code
        url = reverse("course_detail", args=[self.course.pk])

        response = self.client.patch(
            url,
            data={"title": "Updated Test Subect"},
            content_type="application/json",
            HTTP_AUTHORIZATION=f"Token {self.token_one.key}",
        )

        self.assertEqual(response.status_code, 200)
        self.course.refresh_from_db()
        self.assertEqual(self.course.title, "Updated Test Subect")
