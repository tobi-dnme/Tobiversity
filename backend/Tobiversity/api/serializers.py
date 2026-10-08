from rest_framework import serializers
from .models import Course, User


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


# Adapted from DEV article 'Multi-Role User Authentication in Django Rest Framework' by Forhad Khan
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )

        courses = validated_data.get('courses')
        if courses:
            user.courses.set(courses)

        user.save()
        return user