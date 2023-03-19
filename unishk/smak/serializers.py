from rest_framework import serializers
from .models import Fakulteti,Departamenti,Programi,Profile,Planet,PlanPermbajtja,Semestri,Vitiakademik,Lendemezgjedhje
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['id'] = user.id
        token['email'] = user.email
       
    
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs






    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user





class ItemRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        return value.render()

class FakultetiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fakulteti
        fields = '__all__'



class DepartamentiSerializer(serializers.ModelSerializer):
    
    fakulteti= FakultetiSerializer
    #userprofile= serializers.SerializerMethodField()
    
    class Meta:
        model = Departamenti
        fields = ('id', 'emertimi','fakulteti')
   
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['fakulteti'] = FakultetiSerializer(instance.fakulteti).data
     
       return ret    


    

class ProgramiSerializer(serializers.ModelSerializer):
    departamenti= DepartamentiSerializer
    
    class Meta:
        model = Programi
        fields = '__all__'
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['departamenti'] = DepartamentiSerializer(instance.departamenti).data
       return ret
    



class UserSerializer(serializers.ModelSerializer):
   
    confirmpassword = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = '__all__'
 
    def validate(self, attrs):
       
        #print (attrs)
        if not self.instance:
            print("valido pass")
            if  attrs['password'] != attrs['confirmpassword']:
                raise serializers.ValidationError("passw gabim"
                    )

        return attrs
    
    

        
    

class ProfileSerializer(serializers.ModelSerializer):
   
    user=UserSerializer()
    departamenti=DepartamentiSerializer()

    class Meta:
        model = Profile
        #fields = ['id', 'atesia','roli','departamenti','titulli','user']
        fields = '__all__'
       # extra_kwargs = {'user':{'password': {'error_messages': {'blank': 'Fjalekalimi eshte i detyrueshem'}}}}
        
    def validate(self, attrs):
        
        if (self.instance):
            print("ketu 1")
            qs=User.objects.filter(email=attrs['user']['email']).exclude(id=self.instance.user.id)
            if qs.exists(): 
                raise serializers.ValidationError("Not unique email")
        elif User.objects.filter(email=attrs['user']['email']).exists():
            print("ketu 2")
            raise serializers.ValidationError("Not unique email")
            

        return attrs
    
    

    def to_representation(self, instance):
       ret = super().to_representation(instance)
       #ret['departamenti'] = DepartamentiSerializer(instance.departamenti).data
       ret['user'] = UserSerializer(instance.user).data
       return ret
    def create(self, validated_data):
        extra_kwargs = {'phone': {'error_messages': {'blank': 'New blank error message'}}}
        # get principal fields
        #print(validated_data)
        user_data = validated_data.pop('user')
        user_data.pop('confirmpassword',None)
        validated_data['user'] = User.objects.create_user(**user_data)
        print(validated_data)
        
        profile = Profile.objects.create(**validated_data)
        return profile
        
    def update(self, instance, validated_data):
            user = self.context['request'].user
            if user.pk != instance.pk:
                raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
            
            # retrieve the User
            user_data = validated_data.pop('user', None)
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)

            # retrieve Profile
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            
            instance.user.save()
            instance.save()
            return instance
    


class PlaniSerializer(serializers.ModelSerializer):
    programi= ProgramiSerializer
    class Meta:
        model = Planet
        fields = '__all__'
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['programi'] = ProgramiSerializer(instance.programi).data
       return ret
    
class SemestriSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Semestri
        fields = '__all__'
class VitiakademikSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Vitiakademik
        fields = '__all__'
    
class PlanpermbajtjaSerializer(serializers.ModelSerializer):
    plani= PlaniSerializer
   
    class Meta:
        model = PlanPermbajtja
        fields = ( 'id', 'renditja','titullari','viti','emertimi','tipiveprimtarise','kredite','nrjavesem1','seminaresem1',
    'leksionesem1','praktikasem1','laboratoresem1','nrjavesem2','seminaresem2','leksionesem2','praktikasem2',
    'laboratoresem2','totleksione','totseminare','totlaboratore','totpraktika','plani','semestri1','semestri2')
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['plani'] = PlaniSerializer(instance.plani).data
      
       return ret
    
class LendeMeZgjedhjeSerializer(serializers.ModelSerializer):
   # plani= PlaniSerializer
    lenda=PlanpermbajtjaSerializer
   
    class Meta:
        model = Lendemezgjedhje
        fields = '__all__'
        depth = 1 
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       #ret['plani'] = PlaniSerializer(instance.plani).data
       ret['lenda'] = PlanpermbajtjaSerializer(instance.lenda).data
      
       return ret
    


class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(write_only=True,required=True)
    new_password = serializers.CharField(write_only=True,required=True)
    confirm_new_password = serializers.CharField(write_only=True,required=True)
    class Meta:
        model = User
        fields = ('old_password', 'password', 'confirm_new_password')
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError({"new_password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['new_password'])
        instance.save()

        return instance
    
   
        




        