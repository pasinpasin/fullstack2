from rest_framework import generics,viewsets,permissions
from rest_framework import status
from .models import Fakulteti,Departamenti,Programi,Profile,Planet,PlanPermbajtja
from .serializers import FakultetiSerializer,DepartamentiSerializer,MyTokenObtainPairSerializer,RegisterSerializer,ProgramiSerializer,ProfileSerializer,PlaniSerializer,PlanpermbajtjaSerializer,ChangePasswordSerializer
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
    queryset = Departamenti.objects.all()
    serializer_class = DepartamentiSerializer

    def list(self, request, id=None):
        if id:
            #fakid = Departamenti.active.filter(fakulteti=id)
            departamentet = Departamenti.objects.order_by('updated').filter(fakulteti=id)
            serializer = self.get_serializer(departamentet, many=True)
            #return Response(serializer.data)
        else:
            departamentet = Departamenti.objects.order_by('updated')
            serializer = self.get_serializer(departamentet, many=True)
            #return Response(serializer.data)
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        """ try:
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'fail','error':True,'code':500,'result':{'totalItems':0,'items':[],'totalPages':0,'currentPage':0}}) """
        
    
        
    
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
      
    """  try:
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'fail','error':True,'code':500,'result':{'totalItems':0,'items':[],'totalPages':0,'currentPage':0}}) """
        

    def create(self, request, *args, **kwargs):
        

        _serializer = self.serializer_class(data=request.data)  # NOQA
        #if
        _serializer.is_valid(raise_exception=True)
        _serializer.save()
           # return Response(data=_serializer.data, status=status.HTTP_201_CREATED)  # NOQA
        return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(_serializer.data),'items':_serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
            
       # else:
           # print(_serializer)
           # return Response(data=_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           # return 
    def retrieve(self, request, *args, **kwargs):
      
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':1,'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK)
        
    """ def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except Exception as e:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            #any additional logic
            serializer = self.get_serializer(instance)
            return Response({'message':'success','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data,'totalPages':'null','currentPage':0}},status=status.HTTP_200_OK) """
    
    """ def update(self, request):
        data = self.request.data
        user = self.request.user
        if user.is_authenticated and user.has_perm("meals.change_menu"):
            
            if request.method == 'PUT':
                serializer = MealItemSerializer(instance=self.get_object(), data=data, partial=True )
                
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response({"Success": "Your meal was updated"}) """

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
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_new_password = request.data.get('confirm_new_password')
        if new_password != confirm_new_password:
                
            raise ValidationError("Shkruani 2 here fjalekalimin njesoj")
        
        if  not self.object.check_password(old_password):
             raise ValidationError("Passwordi i vjeter gabim")
        self.object.set_password(new_password)
        self.object.save()

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        





    
