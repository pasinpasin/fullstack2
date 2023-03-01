from django.urls import path,include
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = 'smak'

router = routers.DefaultRouter()
router.register('departamenti', views.DepartamentiViewSet,basename='pafakultet')
router.register('fakulteti', views.FakultetiViewSet)
router.register('programi', views.ProgramiViewSet,basename='programi')
router.register('departamenti/(?P<id>\d+)/programi', views.ProgramiViewSet,basename='meprogram')
router.register('departamenti/(?P<id>\d+)/users', views.UsersViewSet,basename='meusers')
router.register('fakulteti/(?P<id>\d+)/departamenti', views.DepartamentiViewSet,basename='mefakultet')
router.register('users', views.UsersViewSet,basename='users')


urlpatterns = [
    
    #path('fakultetet/',views.FakultetiListView.as_view(),name='fakulteti_list'),
    #path('fakulteti/<pk>/',views.FakultetiDetailView.as_view(),name='fakulteti_detail'),
    #path('departamentet/',views.DepartamentiListView.as_view(),name='departamenti_list'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', include(router.urls)),


    ]