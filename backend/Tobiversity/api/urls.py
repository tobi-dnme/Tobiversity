from django.urls import path
from . import views

urlpatterns = [
    path("courses/", views.CourseView.as_view(), name="courses"),
    path("courses/<int:pk>/", views.CourseView.as_view(), name="course_detail"),

    path("users/", views.UserView.as_view(), name="users"),
    path("users/<int:pk>/", views.UserView.as_view(), name="user_detail"),
    
    path("users/<int:id>/courses/", views.StudentCourseView.as_view(), name="user_courses"),
    path("teachers/<int:id>/courses/", views.TeacherCourseView.as_view(), name="teacher_courses"),

    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
   
]