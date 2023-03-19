from rest_framework import generics,viewsets,permissions
from rest_framework import status
from .models import Fakulteti,Departamenti,Programi,Profile,Planet,PlanPermbajtja,Lendemezgjedhje
from .serializers import FakultetiSerializer,DepartamentiSerializer,LendeMeZgjedhjeSerializer,UserSerializer,MyTokenObtainPairSerializer,RegisterSerializer,ProgramiSerializer,ProfileSerializer,PlaniSerializer,PlanpermbajtjaSerializer,ChangePasswordSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.exceptions import ValidationError,NotFound
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib import auth

""" @method_decorator(ensure_csrf_cookie,name="dispatch")
class GetCSRFToken(APIView):
    permissions_classes=(permissions.AllowAny,)
    def get(self,request,format=None):
        return Response({"success":"cookie set"})
    
@method_decorator(ensure_csrf_cookie,name="dispatch")
class CheckAuthenticatedView(APIView):
     def get(self,request,format=None):
          isauthenticated=User.is_authenticated
          if isauthenticated:
               return Response({"isAuthenticated":"success"})
          else:
               return Response({"isAuthenticated":"false"})
          
@method_decorator(ensure_csrf_cookie,name="dispatch")         
class LoginView(APIView):
     permission_classes=(permissions.AllowAny,)
     def post(self,request,format=None):
          data=self.request.data
          username=data['username']
          password=data['password']
          user=auth.authenticate(username=username,password=password)
          if user is not None:
               auth.login(request,user)
               return Response({"success":"user authenticated","username":username})
          else:
               return Response({"error":"error autenticating"})
          
#@method_decorator(ensure_csrf_cookie,name="dispatch")         
class LogoutView(APIView):
    # permission_classes=(permissions.IsAuthenticated,)
     def post(self,request,format=None):
          try:
               auth.logout(request)
               return Response({"success":"logged out"})
          except:
               return Response({"error":"Sth went wrong"})
         """


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
    
    def list(self, request, id=None):
        fakultetet = Fakulteti.objects.order_by('id')
        serializer = self.get_serializer(fakultetet, many=True)
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
       # try:
        #    return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        #except Exception as e:
        #    return Response({'message':'fail','error':True,'code':500,'result':{'totalItems':0,'items':[],'totalPages':0,'currentPage':0}})





class DepartamentiViewSet(VerboseCreateModelMixin,viewsets.ModelViewSet):
    
    serializer_class = DepartamentiSerializer
    def get_queryset(self):
         id=self.kwargs.get("id", None)
         userporfile=Profile.objects.get(user=self.request.user)
         if id!=None:
            print(id)
            #id = self.kwargs['id']
            return Departamenti.objects.order_by('updated').filter(fakulteti=id,emertimi=userporfile.departamenti.emertimi)
         else:
              print("pa id")
              return Departamenti.objects.order_by('updated').filter(emertimi=userporfile.departamenti.emertimi)

    def list(self, request, *args, **kwargs):
        deps = self.serializer_class(self.get_queryset(), many=True)
        return Response({'message':'success','error':False,'code':200,'result':{'items':deps.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
      
    """  
    serializer_class = DepartamentiSerializer
    serializer_class2=ProfileSerializer
    def get_queryset(self):
         id = (self.kwargs['id'],None)
         userporfile=Profile.objects.get(user=self.request.user)
         
         if id is not None:
              return Departamenti.objects.order_by('updated').filter(fakulteti=id,emertimi=userporfile.departamenti.emertimi)
         else:
              return Departamenti.objects.order_by('updated').filter(emertimi=userporfile.departamenti.emertimi)
              
              
         
    
    
    def list(self, request, *args, **kwargs):
        
        deps = self.serializer_class(self.get_queryset(), many=True)
        return Response({'message':'success','error':False,'code':200,'result':{'items':deps.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
      
     """
        
    
    def create(self, request, *args, **kwargs):
        fakulteti = request.data.get('fakulteti')
        
        emertimi = request.data.get('emertimi')
        #print(emertimi)

        if fakulteti is None or emertimi is None:
                
            raise ValidationError("mungon fakulteti ose emertimi i departamentit")
            
        if Departamenti.objects.filter(emertimi=emertimi).exists():

            raise ValidationError("Departamenti me kete emer ekziston")
        try:
                fid = Fakulteti.objects.get(id=fakulteti)

        except Fakulteti.DoesNotExist:
                raise ValidationError("Nuk ekziston nje fakultet i tille")
        
        data = {
            "emertimi": emertimi,
            "fakulteti": fakulteti,
            }

        _serializer = self.serializer_class(data=data)  # NOQA
        _serializer.is_valid(raise_exception=True)
        _serializer.save()
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(_serializer.data),'items':_serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        """  if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # """
        
    def update(self, request,pk=None, *args, **kwargs):

        fakulteti = request.data.get('fakulteti')
        
        emertimi = request.data.get('emertimi')
        instance = self.get_object()
        #print(emertimi)

        if fakulteti is None or emertimi is None:
                
            raise ValidationError("mungon fakulteti ose emertimi i departamentit")
        try:
                fid = Fakulteti.objects.get(emertimi=fakulteti).id

        except Fakulteti.DoesNotExist:
                raise ValidationError("Nuk ekziston nje fakultet i tille")
        
        if Departamenti.objects.filter(emertimi=emertimi,fakulteti_id=fid).exists():

            raise ValidationError("Departamenti me kete emer ekziston")
       
        
        data = {
            "emertimi": emertimi,
            "fakulteti": fid,
            }
        
        
        _serializer = self.serializer_class(instance=instance,data=data,partial=True)  # NOQA
        _serializer.is_valid(raise_exception=True)
        _serializer.save()
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(_serializer.data),'items':_serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)

    """  if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # """

        
        
         
            
        
        
class ProgramiViewSet(viewsets.ModelViewSet):
    queryset = Programi.objects.all()
    serializer_class = ProgramiSerializer

    def error404(request):
        raise NotFound(detail="Faqja nuk gjendet", code=404)

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            programet = Programi.objects.order_by('updated').filter(departamenti_id=id)
            serializer = self.get_serializer(programet, many=True)
            #return Response(serializer.data)
        else:
            programet = Programi.objects.order_by('updated')
            serializer = self.get_serializer(programet, many=True)
            #return Response(serializer.data)
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)

        
    def create(self, request, *args, **kwargs):
        departamenti = request.data.get('departamenti')
        
        emertimi = request.data.get('emertimi')
        
        #print(emertimi)

        if departamenti is None or emertimi is None:
                
            raise ValidationError("mungon departmenti ose emertimi i departamentit")
        
        if  len(emertimi)==0:
            raise ValidationError("Fushat nuk mund te jene bosh") 
            
        if Programi.objects.filter(emertimi=emertimi).exists():

            raise ValidationError("Programi me kete emer ekziston")
        try:
                instance = Departamenti.objects.get(id=departamenti)

        except Departamenti.DoesNotExist:
                raise ValidationError("Nuk ekziston nje Departament i tille")
        
        data = {
            "emertimi": emertimi,
            "departamenti": departamenti,
            }

        _serializer = self.serializer_class(data=data)  # NOQA
        _serializer.is_valid(raise_exception=True)
        _serializer.save()
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(_serializer.data),'items':_serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)

    """  if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            print(_serializer)
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  """
        
    def update(self, request,pk=None, *args, **kwargs):

        departamenti = request.data.get('departamenti')
        
        emertimi = request.data.get('emertimi')
        instance = self.get_object()
        #print(emertimi)

        if departamenti is None or emertimi is None:
                
            raise ValidationError("mungon departamenti ose emertimi i programit")
        try:
                did = Departamenti.objects.get(id=departamenti).id

        except Departamenti.DoesNotExist:
                raise ValidationError("Nuk ekziston nje departament i tille")
        
        if Departamenti.objects.filter(emertimi=emertimi,id=did).exists():

            raise ValidationError("Departamenti me kete emer ekziston ne fakultetin e shkruar")
       
        
        data = {
            "emertimi": emertimi,
            "departamenti": did,
            }
        
        
        _serializer = self.serializer_class(instance=instance,data=data,partial=True)  # NOQA
        _serializer.is_valid(raise_exception=True)
        _serializer.save()
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(_serializer.data),'items':_serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
    """   if _serializer.is_valid():
            _serializer.save()
            return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        else:
            return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # """
        
class UsersViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            pedagoget = Profile.objects.filter(departamenti_id=id)
            serializer = self.get_serializer(pedagoget, many=True)
            #return Response(serializer.data)
        else:
            pedagoget = Profile.objects.order_by('id')
            serializer = self.get_serializer(pedagoget, many=True)
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
      
  
        

    def create(self, request, *args, **kwargs):
        

        _serializer = self.serializer_class(data=request.data)  # NOQA
        #if
        _serializer.is_valid(raise_exception=True)
        _serializer.save()
           # return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(_serializer.data),'items':_serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
            
      
    def retrieve(self, request, *args, **kwargs):
      
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':1,'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)

class PlaniViewSet(viewsets.ModelViewSet):
    queryset = Planet.objects.all()
    serializer_class = PlaniSerializer
    def get_queryset(self):
         if ('id' in self.kwargs):
            id = self.kwargs['id']
            return  Planet.objects.filter(programi=id)
         else:
            print("ketu")
            return  Planet.objects.all() 
        

    def list(self, request,id=None):
            print("lista")
           # planet = Planet.objects.order_by('status')ù
            planet=self.get_queryset()
            serializer = self.get_serializer(planet, many=True)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK) 
    def retrieve(self, request, *args, **kwargs):
      
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':1,'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
    
class PlanpermbajtjaViewSet(viewsets.ModelViewSet):
    queryset = PlanPermbajtja.objects.all()
    serializer_class = PlanpermbajtjaSerializer
    def get_queryset(self):
         if ('id' in self.kwargs):
            id = self.kwargs['id']
            return  PlanPermbajtja.objects.filter(plani=id)
         else:
            print("ketu")
            return  PlanPermbajtja.objects.all() 
        

    def list(self, request,id=None):
            print("lista")
           # planet = Planet.objects.order_by('status')ù
            planpermbajtja=self.get_queryset()
            serializer = self.get_serializer(planpermbajtja, many=True)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK) 
    def retrieve(self, request, *args, **kwargs):
      
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':1,'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        

class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    
    serializer_class = ChangePasswordSerializer
    

    def get_object(self, queryset=None):
       # if queryset is None:
          #  queryset = self.get_queryset()
        obj = self.request.user
        return obj 
        
        
       # return queryset.get(pk=self.request.user.pk)

    def update(self, request, *args, **kwargs):
        instance = self.get_object() #per ke  do ta bash update
        print(instance)
        serializer = self.get_serializer(instance=instance,data=request.data)  
        print(serializer)
        #serializer = self.serializer_class(instance=instance,data=request.data,partial=True)  # NOQA
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':1,'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
            

class LendeMeZgjedhjeViewSet(viewsets.ModelViewSet):
    queryset = Lendemezgjedhje.objects.all()
    serializer_class = LendeMeZgjedhjeSerializer
    lookup_field = 'lenda__id'

    def list(self, request, *args, **kwargs):
            
           # planet = Planet.objects.order_by('status')ù
            lendemezgjedhje=self.get_queryset()
            serializer = self.get_serializer(lendemezgjedhje, many=True)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK) 
    def retrieve(self, request, *args, **kwargs):
      
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':1,'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        
class LendeMeZgjedhjeListAPI(generics.ListAPIView):
    model = Lendemezgjedhje
    serializer_class = LendeMeZgjedhjeSerializer
    def get_queryset(self):
         if ('pid' in self.kwargs):
            
            planiid=self.kwargs['pid']
            return  Lendemezgjedhje.objects.filter(lenda__plani__id=planiid)
    def list(self, request, *args, **kwargs):
            
           # planet = Planet.objects.order_by('status')ù
            lendemezgjedhje=self.get_queryset()
            serializer = self.get_serializer(lendemezgjedhje, many=True)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK) 

        
    
           





    
