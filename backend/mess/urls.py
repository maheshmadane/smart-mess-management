from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('mess.urls')),
    path('api/menu/', views.MenuList.as_view(), name='menu-list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
