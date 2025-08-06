from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from mess.views import (
    StudentViewSet, MealAttendanceViewSet, SnackItemViewSet,
    FeedbackViewSet, ImageGalleryViewSet, StaffViewSet,
    MenuBoardViewSet, NoteViewSet, RuleViewSet, DailySummaryEmailView
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'attendance', MealAttendanceViewSet)
router.register(r'snacks', SnackItemViewSet)
router.register(r'feedback', FeedbackViewSet)
router.register(r'gallery', ImageGalleryViewSet)
router.register(r'staff', StaffViewSet)
router.register(r'menu', MenuBoardViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'rules', RuleViewSet)

def home(request):
    return HttpResponse("Welcome to the Smart Mess Management System API. Access /api/ for endpoints or /admin/ for admin interface.")

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/daily-summary/', DailySummaryEmailView.as_view(), name='daily-summary'),
]