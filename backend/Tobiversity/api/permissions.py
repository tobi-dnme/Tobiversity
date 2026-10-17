# Adapted from testdriven.io post 'Custom Permission Classes in Django REST Framework' by Špela Giacomelli.
from rest_framework.permissions import BasePermission

class CoursePermission(BasePermission):
    def has_permission(self, request, view):
        needed = {
            "GET": "api.view_course",
            "POST": "api.add_course",
            "PATCH": "api.change_course",
            "DELETE": "api.delete_course",
        }
        perm = needed.get(request.method)
