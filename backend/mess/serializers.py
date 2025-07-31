from rest_framework import serializers
from .models import Student, MealAttendance, SnackItem, Feedback, ImageGallery, Staff, MenuBoard, Note, Rule

from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'phone_number']

class MealAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealAttendance
        fields = ['id', 'student', 'date', 'meal_type', 'present']

class SnackItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SnackItem
        fields = ['id', 'name', 'price', 'date']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'student', 'rating', 'comment', 'created_at']

class ImageGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageGallery
        fields = ['id', 'photo', 'caption']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id', 'name', 'role', 'email', 'phone', 'photo']

class MenuBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuBoard
        fields = ['id', 'date', 'items']

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'created_at']

class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ['id', 'title', 'description']

class DailySummarySerializer(serializers.Serializer):
    total_attendance = serializers.IntegerField()
    menu = serializers.CharField()