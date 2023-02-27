from rest_framework import generics,viewsets,permissions
from rest_framework import status
from .models import Fakulteti,Departamenti,Programi,Profile
from .serializers import FakultetiSerializer,DepartamentiSerializer,MyTokenObtainPairSerializer,RegisterSerializer,ProgramiSerializer,ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404



class VerboseCreateModelMixin(object):
    """
    Create a model instance and return either created object or the validation errors.
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
            
        



class FakultetiViewSet(viewsets.ModelViewSet):
    queryset = Fakulteti.objects.all()
    serializer_class = FakultetiSerializer





class DepartamentiViewSet(VerboseCreateModelMixin,viewsets.ModelViewSet):
    queryset = Departamenti.objects.all()
    serializer_class = DepartamentiSerializer

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            departamentet = Departamenti.objects.order_by('updated').filter(fakulteti=id)
            serializer = self.get_serializer(departamentet, many=True)
            return Response(serializer.data)
        else:
            departamentet = Departamenti.objects.order_by('updated')
            serializer = self.get_serializer(departamentet, many=True)
            return Response(serializer.data)
        
    def create(self, request, *args, **kwargs):
        fakulteti=request.data.get('fakulteti')
        fakid=Fakulteti.objects.get(emertimi=fakulteti).id
        
        data = {
            "emertimi": request.data.get('emertimi'),
            "fakulteti": fakid,
            }
        _serializer = self.serializer_class(data=data)  # NOQA
        if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  #
        
    
        
        
   
    
   
   
"""  def create(self, request, *args, **kwargs):
        fak = request.data.get('fakulteti')
        
        emertimi = request.data.get('emertimi')
        print(emertimi)

        if fak is None or emertimi is None:
                
            raise ValidationError("mungon fakulteti ose emertimi i departamentit")
            
        if Departamenti.objects.filter(emertimi=emertimi).exists():

            raise ValidationError("Fakulteti me kete emer ekziston")
        try:
                instance = Fakulteti.objects.get(emertimi=fak).id

                print(instance)
                
               
        except Fakulteti.DoesNotExist:
                raise ValidationError("Nuk ekziston nje fakultet i tille")
        data = {
            'emertimi': request.POST.get('emertimi', None),
            
            
        }

        serializer = self.serializer_class(data=data, context={'fakulteti_id': instance})
                
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        
         """
            
        
        
class ProgramiViewSet(viewsets.ModelViewSet):
    queryset = Programi.objects.all()
    serializer_class = ProgramiSerializer

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            programet = Programi.objects.order_by('updated').filter(departamenti_id=id)
            serializer = self.get_serializer(programet, many=True)
            return Response(serializer.data)
        else:
            programet = Programi.objects.order_by('updated')
            serializer = self.get_serializer(programet, many=True)
            return Response(serializer.data)
        
class UsersViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            pedagoget = Profile.objects.filter(departamenti_id=id)
            serializer = self.get_serializer(pedagoget, many=True)
            return Response(serializer.data)
        else:
            pedagoget = Profile.objects.order_by('updated')
            serializer = self.get_serializer(pedagoget, many=True)
            return Response(serializer.data)
        


    
            




    
