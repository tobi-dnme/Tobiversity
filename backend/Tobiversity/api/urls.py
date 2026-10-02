# your_app_name/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("courses/", views.CourseView.as_view(), name="courses"),
    path("courses/<int:pk>/", views.CourseView.as_view(), name="course_detail"),

    path("users/", views.UserView.as_view(), name="users"),
    path("users/<int:pk>/", views.UserView.as_view(), name="user_detail"),

    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
]