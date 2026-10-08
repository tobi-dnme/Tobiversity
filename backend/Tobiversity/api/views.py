from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Course, User
from .serializers import CourseSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

# Adapted from Medium article "Setting Up a Django API with Django REST Framework (DRF): A Beginner’s Guide" by Michal Dróżdż
class CourseView(APIView): 

    permission_classes = [IsAuthenticated]  #From DRF Documentation — Authentication: Setting the authentication scheme

    def get(self, request, pk=None):
        if not pk:
            courses = Course.objects.all()
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)

        try:
            course = Course.objects.get(pk=pk)
            serializer = CourseSerializer(course)
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response(
                {"error": "Don't think we have that course here"}, 
                status=status.HTTP_404_NOT_FOUND
                )

    def post(self, request):
        serializer = CourseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def patch(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "I'm gonna need your Course ID"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            course = Course.objects.get(id=pk)
        except Course.DoesNotExist:
            return Response(
                {"error": "Don't think we have that course here"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = CourseSerializer(course, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "I'm gonna need your Course ID"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            course = Course.objects.get(id=pk)
        except Course.DoesNotExist:
            return Response(
                {"error": "Don't think we have that course here"},
                status=status.HTTP_404_NOT_FOUND
            )

        course.delete()
        return Response(
            {"message": "Course deleted"},
            status=status.HTTP_204_NO_CONTENT
        )



class UserView(APIView):

    permission_classes = [IsAuthenticated]  #From DRF Documentation — Authentication: Setting the authentication scheme

    def get(self, request, pk=None):
        if not pk:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"error": "That's not a real User"}, 
                status=status.HTTP_404_NOT_FOUND
                )


    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "I'm gonna need your User ID"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response(
                {"error": "That's not a real User"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "I'm gonna need your User ID"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response(
                {"error": "That's not a real User"},
                status=status.HTTP_404_NOT_FOUND
            )

        user.delete()
        return Response(
            {"message": "User deleted"},
            status=status.HTTP_204_NO_CONTENT
        )


# Adapted from Medium article 'How to Implement Token-Based Authentication in Django REST Framework' by Samuel Getachew.
class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Welcome aboard, User!"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Adapted from Medium article 'How to Implement Token-Based Authentication in Django REST Framework' by Samuel Getachew.
class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful",
                "token": token.key
            })
        return Response(
            {"error": "Try again, User"},
            status=status.HTTP_400_BAD_REQUEST
        )


# Adapted from Stack Overflow threads: 
    # - Django filter based in joined table
    # - Filtering data from joining table in Django by foreign key
    # - How to efficiently clear nested many to many relationship in Django.
class StudentCourseView(APIView):

    permission_classes = [IsAuthenticated]  #From DRF Documentation — Authentication: Setting the authentication scheme
    
    def get(self, request, id):
        joiner = User.courses.through.objects.filter(user_id=id)
        course_ids = joiner.values_list('course_id', flat=True)
        courses = Course.objects.filter(id__in=course_ids)

        serializer = CourseSerializer(courses, many=True)

        return Response(serializer.data)



class TeacherCourseView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        courses = Course.objects.filter(teacher_id=id)

        serializer = CourseSerializer(courses, many=True)

        return Response(serializer.data)