from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Course
from .serializers import CourseSerializer


class CourseView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

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