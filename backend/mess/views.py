# from rest_framework import viewsets, status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.core.mail import send_mail
# from django.conf import settings
# from .models import Student, MealAttendance, SnackItem, Feedback, ImageGallery, Staff, MenuBoard
# from .serializers import (
#     StudentSerializer, MealAttendanceSerializer, SnackItemSerializer,
#     FeedbackSerializer, ImageGallerySerializer, StaffSerializer, MenuBoardSerializer
# )
# from datetime import date

# class StudentViewSet(viewsets.ModelViewSet):
#     queryset = Student.objects.all()
#     serializer_class = StudentSerializer

# class MealAttendanceViewSet(viewsets.ModelViewSet):
#     queryset = MealAttendance.objects.all()
#     serializer_class = MealAttendanceSerializer

# class SnackItemViewSet(viewsets.ModelViewSet):
#     queryset = SnackItem.objects.all()
#     serializer_class = SnackItemSerializer

# class FeedbackViewSet(viewsets.ModelViewSet):
#     queryset = Feedback.objects.all()
#     serializer_class = FeedbackSerializer

#     def perform_create(self, serializer):
#         feedback = serializer.save()
#         send_mail(
#             f'New Feedback for {feedback.meal_type}',
#             feedback.feedback_text,
#             settings.EMAIL_HOST_USER,
#             ['admin@example.com'],
#             fail_silently=True,
#         )

# class ImageGalleryViewSet(viewsets.ModelViewSet):
#     queryset = ImageGallery.objects.all()
#     serializer_class = ImageGallerySerializer

# class StaffViewSet(viewsets.ModelViewSet):
#     queryset = Staff.objects.all()
#     serializer_class = StaffSerializer

# class MenuBoardViewSet(viewsets.ModelViewSet):
#     queryset = MenuBoard.objects.all()
#     serializer_class = MenuBoardSerializer

# @api_view(['GET'])
# def daily_meal_summary(request):
#     today = date.today()
#     attendance = MealAttendance.objects.filter(date=today)
#     breakfast_count = attendance.filter(breakfast='Yes').count()
#     lunch_count = attendance.filter(lunch='Yes').count()
#     dinner_count = attendance.filter(dinner='Yes').count()
    
#     summary = f"""
#     Daily Meal Summary for {today}:
#     Breakfast: {breakfast_count} students
#     Lunch: {lunch_count} students
#     Dinner: {dinner_count} students
#     """
    
#     send_mail(
#         f'Meal Summary for {today}',
#         summary,
#         settings.EMAIL_HOST_USER,
#         ['admin@example.com'],
#         fail_silently=True,
#     )
    
#     return Response({
#         'breakfast': breakfast_count,
#         'lunch': lunch_count,
#         'dinner': dinner_count
#     })
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student, MealAttendance, SnackItem, Feedback, ImageGallery, Staff, MenuBoard
from .serializers import (
    StudentSerializer,
    MealAttendanceSerializer,
    SnackItemSerializer,
    FeedbackSerializer,
    ImageGallerySerializer,
    StaffSerializer,
    MenuBoardSerializer,
)
from django.core.mail import send_mail
from django.conf import settings
from datetime import date
from django.utils import timezone

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

class MenuBoardViewSet(viewsets.ModelViewSet):
    queryset = MenuBoard.objects.all()
    serializer_class = MenuBoardSerializer

class DailySummaryEmailView(APIView):
    def get(self, request):
        today = date.today()
        attendance = MealAttendance.objects.filter(date=today)
        feedback = Feedback.objects.filter(date_submitted__date=today)
        summary = f"Daily Summary for {today}:\n\nAttendance:\n"
        for record in attendance:
            summary += f"{record.student.name} - {record.meal_type}: {'Present' if record.is_present else 'Absent'}\n"
        summary += "\nFeedback:\n"
        for fb in feedback:
            summary += f"{fb.student.name}: {fb.comment} (Rating: {fb.rating})\n"
        send_mail(
            subject=f"Daily Mess Summary - {today}",
            message=summary,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        return Response({"message": "Summary email sent"}, status=status.HTTP_200_OK)