from django.contrib import admin
from .models import Course, User
from django.contrib.auth.admin import UserAdmin

admin.site.register(Course)
admin.site.register(User, UserAdmin)