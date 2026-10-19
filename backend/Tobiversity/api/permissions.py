from rest_framework.permissions import BasePermission, SAFE_METHODS

# Adapted from testdriven.io post 'Custom Permission Classes in Django REST Framework' by Špela Giacomelli.
class CoursePermission(BasePermission):
    def has_permission(self, request, view):

        needed = {
            "GET": "api.view_course",
            "POST": "api.add_course",
            "PATCH": "api.change_course",
            "DELETE": "api.delete_course",
        }

        perm = needed.get(request.method)
        return bool(perm and request.user.has_perm(perm))


    def has_object_permission(self, request, view, obj):
        
        if request.method in SAFE_METHODS:
            return True

        if request.user.has_perm("api.change_user"):
            return True

        if "teacher" in request.data:
            return False

        return obj.teacher_id == request.user.pk



# Adapted from GeeksForGeeks tutorial 'Object Level Permissions - Django REST Framework'
PROTECTED = {"role", "is_staff", "is_superuser", "is_active", "groups", "user_permissions"}


class UserPermission(BasePermission):
    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False
                
        needed = {
            "GET": "api.view_user",
            "POST": "api.add_user",
            "PATCH": "api.change_user",
            "DELETE": "api.delete_user",
        }

        perm = needed.get(request.method)
        if not perm:
            return False

        if request.user.has_perm(perm):
            return True

        url_pk = view.kwargs.get("pk")
        if not url_pk:
            return False

        is_self = str(url_pk) == str(request.user.pk)
        if not is_self:
            return False

        if request.method in SAFE_METHODS:
            return True

        if request.method == "PATCH":
            attempted_fields = set(request.data.keys())
            if attempted_fields & PROTECTED:
                return False 
            
            return True 

        return False



class IsSelfOrAdmin(BasePermission):
    def has_object_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.has_perm("api.view_user"):
            return True

        url_id = view.kwargs.get("id")
        if not url_id:
            return False

        return str(url_id) == str(request.user.pk)

        