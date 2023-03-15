from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from models import Profile
from models import User
from rest_framework.exceptions import ValidationError,NotFound
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect,name='dispatch')
class SignupView(APIView):
    permission_classes=(permissions.Allowany,)

    def post(self,request,format=None):
        data=self.request.data
        username=data['username']
        password=data['password']
        re_password=data['re_password']
        if password==re_password:
            if User.objects.filter(username=username).exixts():
                raise ValidationError("Email ekziston") 
        user=User.objects.create_user(username=username,password=password)
        user.save
        user=User.objects.get(username=username)
        user_profile=Profile(user,emri='',mbiemri='',titulli='Dr',departamenti=1)
        user_profile.save()
        return Response({"success":"user created"})

@method_decorator(ensure_csrf_cookie,name="dispatch")
class GetCSRFToken(APIView):
    permissions_classes=(permissions.AllowAny,)
    def get(self,request,format=None):
        return Response({"success":"cookie set"})

        