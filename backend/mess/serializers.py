from rest_framework import serializers
from .models import Student, MealAttendance, SnackItem, Feedback, ImageGallery, Staff, MenuBoard

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['student_id', 'name', 'class_name', 'email', 'language']

class MealAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealAttendance
        fields = ['id', 'student', 'date', 'breakfast', 'lunch', 'dinner', 'reason']

class SnackItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnackItem
        fields = ['snack_id', 'name', 'price', 'date']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'student', 'meal_type', 'feedback_text', 'date']

class ImageGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageGallery
        fields = ['id', 'image_url', 'category']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['staff_id', 'name', 'role', 'contact']

class MenuBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuBoard
        fields = ['id', 'date', 'meal_type', 'items']
