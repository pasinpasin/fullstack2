"""unishk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.views import exception_handler
from http import HTTPStatus
from typing import Any



    # Call REST framework's default exception handler first,
    # to get the standard error response.
    

urlpatterns = [
    path('admin/', admin.site.urls),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('__debug__/', include('debug_toolbar.urls')),
    path('',include('smak.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
