from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_added = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.title


class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    courses = models.ManyToManyField(Course, blank=True)

    def __str__(self):
        return self.username