from django.db import models
from django.contrib.auth.models import AbstractUser

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.title

# Adapted from Django documentation: 'Customizing authentication in Django.'
class User(AbstractUser):

    STUDENT = 'student'
    TEACHER = 'teacher'
    ADMIN = 'admin'

    ROLE_CHOICES = [
        (STUDENT, 'Student'),
        (TEACHER, 'Teacher'),
        (ADMIN, 'Admin'),
    ]

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=STUDENT
    )

    courses = models.ManyToManyField(
        Course,
        blank=True
    )

    def __str__(self):
        return self.username