# your_app_name/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("courses/", views.CourseView.as_view(), name="courses"),
    path("courses/<int:pk>/", views.CourseView.as_view(), name="cours_detail"),
]