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
#router.register('programi/(?P<id>\d+)/plani', views.PlaniViewSet,basename='meplan')
#router.register('departamenti/(?P<id>\d+)/programi', views.ProgramiViewSet,basename='meprogram')
#router.register('departamenti/(?P<id>\d+)/users', views.UsersViewSet,basename='meusers')
#router.register('fakulteti/(?P<id>\d+)/departamenti', views.DepartamentiViewSet,basename='mefakultet')
router.register('users', views.UsersViewSet,basename='users')
router.register('plani', views.PlaniViewSet,basename='plani')
router.register('plani/(?P<id>\d+)/planpermbajtja', views.PlanpermbajtjaViewSet,basename='plnanimeid')
router.register(r'planpermbajtja', views.PlanpermbajtjaViewSet,basename='planpermbajtja')
#router.register(r'lendemezgjedhje', views.LendeMeZgjedhjeViewSet,basename='LendeMeZgjedhje')




urlpatterns = [
    
    #path('fakultetet/',views.FakultetiListView.as_view(),name='fakulteti_list'),
    #path('fakulteti/<pk>/',views.FakultetiDetailView.as_view(),name='fakulteti_detail'),
    #path('departamentet/',views.DepartamentiListView.as_view(),name='departamenti_list'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('changepassword/', views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('lendemezgjedhje_plani/<int:pid>/', views.LendeMeZgjedhjeListAPI.as_view(),name='zgjedhje2'),
    path('lendemezgjedhje/<int:pk>/', views.LendeMeZgjedhjeView.as_view()),
   # path('resetpasswordbyadmin/<int:pk>/',views.ChangePasswordByAdmin.as_view(),name='resetpasswordbyadmin'),
    path('user/<int:pk>/delete/',views.Deleteuser.as_view(),name='deleteuser'),
    
   #path('fakulteti/<int:id>/departamenti/', views.DepartamentiViewSet.as_view(),name='mefakultet'),
   #path('departamenti/', views.DepartamentiViewSet.as_view(),name='pafakultet'),
    path('', include(router.urls)),


    ]