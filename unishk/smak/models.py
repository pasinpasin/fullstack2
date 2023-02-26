from django.db import models
from django.conf import settings

class Fakulteti(models.Model):
    
    emertimi = models.CharField(max_length=250,unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-updated']
    def __str__(self):
        return self.emertimi

class Departamenti(models.Model):
    emertimi = models.CharField(max_length=250,unique=True)
    fakulteti = models.ForeignKey(Fakulteti,
                             on_delete=models.CASCADE,
                             related_name='iperketfakultetit')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-updated']
    def __str__(self):
        return self.emertimi

class Programi(models.Model):
    emertimi = models.CharField(max_length=500,unique=True)
    departamenti = models.ForeignKey(Departamenti,
                             on_delete=models.CASCADE,
                             related_name='iperketdepartamentit')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-updated']
        indexes = [
            models.Index(fields=['-emertimi']),
        ]
    def __str__(self):
        return self.emertimi


class Profile(models.Model):
    class Titulli(models.TextChoices):
        MSC = 'Msc', 'Msc.'
        Dr = 'Dr', 'Dr'
        ProfDr = 'Prof.Dr', 'Prof.Dr'
        Doc = 'Doc', 'Doc'
    class Roli(models.TextChoices):
        Pedagog = 'Pedagog', 'Pedagog'
        Shef = 'ShefDep', 'ShefDep'
        Dekan = 'Dekan', 'Dekan'
        Rektor = 'Rektor', 'Rektor'
        Kurrikula = 'Kurrikula', 'Kurrikula'
        Admin= 'Admin', 'Admin'
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)

    photo = models.ImageField(upload_to='users/%Y/%m/%d/', blank=True)
    atesia= models.CharField(max_length=250,blank=True)
    titulli = models.CharField(max_length=10,
                              choices=Titulli.choices,
                              blank=False)
    roli = models.CharField(max_length=10,
                              choices=Roli.choices,
                              default=Roli.Pedagog)
    departamenti = models.ForeignKey(Departamenti,
                             on_delete=models.CASCADE,
                             related_name='dep_pedagog')
    def __str__(self):
        return f'Profile of {self.user.username}'


    