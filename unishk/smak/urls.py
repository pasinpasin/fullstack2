from django.urls import path,include
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'smak'

router = routers.DefaultRouter()
router.register('fakulteti', views.FakultetiViewSet)
router.register('fakulteti/(?P<id>\d+/departamenti)', views.DepartamentiViewSet)
router.register('departamenti', views.DepartamentiViewSet)

urlpatterns = [
    
    #path('fakultetet/',views.FakultetiListView.as_view(),name='fakulteti_list'),
    #path('fakulteti/<pk>/',views.FakultetiDetailView.as_view(),name='fakulteti_detail'),
    #path('departamentet/',views.DepartamentiListView.as_view(),name='departamenti_list'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', include(router.urls)),


    ]