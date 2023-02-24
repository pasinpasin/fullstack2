from rest_framework import generics,viewsets,permissions
from rest_framework import status
from .models import Fakulteti,Departamenti
from .serializers import FakultetiSerializer,DepartamentiSerializer,MyTokenObtainPairSerializer,RegisterSerializer
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
            
        



class FakultetiListView(generics.ListAPIView):
    #authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Fakulteti.objects.all()
    serializer_class = FakultetiSerializer

class FakultetiViewSet(viewsets.ModelViewSet):
    queryset = Fakulteti.objects.all()
    serializer_class = FakultetiSerializer
    

class DepartamentiViewSet(viewsets.ModelViewSet):
    queryset = Departamenti.objects.all()
    serializer_class = DepartamentiSerializer

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            departamentet = Departamenti.active.order_by('updated').filter(fakulteti=id)
            serializer = self.get_serializer(departamentet, many=True)
            return Response(serializer.data)
        else:
            departamentet = Departamenti.active.order_by('updated')
            serializer = self.get_serializer(departamentet, many=True)
            return Response(serializer.data)




    
