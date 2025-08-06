from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student, MealAttendance, SnackItem, Feedback, ImageGallery, Staff, MenuBoard, Note, Rule
from .serializers import (
    StudentSerializer, MealAttendanceSerializer, SnackItemSerializer,
    FeedbackSerializer, ImageGallerySerializer, StaffSerializer,
    MenuBoardSerializer, NoteSerializer, RuleSerializer, DailySummarySerializer
)
from django.db.models import Count
from datetime import date

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class MealAttendanceViewSet(viewsets.ModelViewSet):
    queryset = MealAttendance.objects.all()
    serializer_class = MealAttendanceSerializer

class SnackItemViewSet(viewsets.ModelViewSet):
    queryset = SnackItem.objects.all()
    serializer_class = SnackItemSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

class ImageGalleryViewSet(viewsets.ModelViewSet):
    queryset = ImageGallery.objects.all()
    serializer_class = ImageGallerySerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class MenuList(generics.ListCreateAPIView):
    queryset = MenuBoard.objects.all()
    serializer_class = MenuBoardSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer

class DailySummaryEmailView(APIView):
    def get(self, request):
        today = date.today()
        attendance_count = MealAttendance.objects.filter(date=today).count()
        menu = MenuBoard.objects.filter(date=today).first()
        data = {
            'total_attendance': attendance_count,
            'menu': menu.items if menu else 'No menu today'
        }
        return Response(DailySummarySerializer(data).data, status=status.HTTP_200_OK)