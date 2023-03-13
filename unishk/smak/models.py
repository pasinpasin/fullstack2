from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.postgres.fields import ArrayField


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
        MSc = 'Msc', 'Msc.'
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
    roli = ArrayField(
        models.CharField(max_length=32, blank=False)
       
       
    )
    departamenti = models.ForeignKey(Departamenti,
                             on_delete=models.CASCADE,
                             related_name='dep_pedagog')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'Profile of {self.user.email}'
    
    
class Planet(models.Model):
    class Status(models.TextChoices):
        Draft = 'Draft', 'Draft'
        Per_Miratim = 'Per miratim', 'Per miratim'
        Miratuar = 'Miratuar', 'Miratuar'
    periudha = models.CharField(max_length=500,blank=False)
    cikli = models.CharField(max_length=500,blank=False)
    status=models.CharField(max_length=20,
                              choices=Status.choices,
                              blank=False, default="Draft")
    programi = models.ForeignKey(Programi,
                             on_delete=models.CASCADE,
                             related_name='iperketprogramit')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-updated']
        indexes = [
            models.Index(fields=['-periudha','-programi'],),
        ]
    def __str__(self):
        return f'Viti {self.periudha} ne programin  {self.programi.emertimi}'
    
class Vitiakademik(models.Model):
    vitiakademik = models.CharField(max_length=500,blank=False, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.vitiakademik
    

class Semestri(models.Model):
    class SemestriCh(models.TextChoices):
        Semestri1 = 'Semestri 1', 'Semestri 1'
        Semestri2 = 'Semestri 2', 'Semestri 2'
    semestri=models.CharField(max_length=20,
                              choices=SemestriCh.choices,blank=False
                              )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.semestri
    
class PlanPermbajtja(models.Model):
    
    class TipiVeprimtarise(models.TextChoices):
        A = 'A', 'A'
        B = 'B', 'B'
        C = 'C', 'C'
        D = 'D', 'D'
        E = 'E', 'E'
        F = 'F', 'F'
        m= 'm', 'm'
    class PapoF(models.TextChoices):
        P = 'P', 'P'
        F = 'F', 'F'
        
    
    renditja = models.IntegerField(blank=False)
    titullari = models.CharField(max_length=500,blank=True)
    viti = models.IntegerField()
    emertimi = models.CharField(max_length=500,blank=False)
    tipiveprimtarise=models.CharField(max_length=20,
                              choices=TipiVeprimtarise.choices,
                              blank=False)
    kredite = models.DecimalField(max_digits = 3,decimal_places = 1,default=0)
    nrjavesem1=models.IntegerField(blank=False)
    seminaresem1=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    leksionesem1=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    praktikasem1=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    laboratoresem1=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    nrjavesem2=models.IntegerField(blank=False,default=0)
    seminaresem2=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    leksionesem2=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    praktikasem2=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
    laboratoresem2=models.DecimalField(max_digits = 2,decimal_places = 1,default=0)
   
    plani = models.ForeignKey(Planet,
                             on_delete=models.CASCADE,
                             related_name='iperketplanit')
    semestri1 = models.CharField(max_length=2,
                              choices=PapoF.choices,
                              blank=True)
    semestri2 = models.CharField(max_length=2,
                              choices=PapoF.choices,
                              blank=True)
    @property
    def totleksione(self):
        return self.nrjavesem1*self.leksionesem1+self.leksionesem2*self.nrjavesem2
    @property
    def totseminare(self):
        return self.nrjavesem1*self.seminaresem1+self.seminaresem2*self.nrjavesem2
    @property
    def totlaboratore(self):
        return self.nrjavesem1*self.laboratoresem1+self.laboratoresem2*self.nrjavesem2
    @property
    def totpraktika(self):
        return self.nrjavesem1*self.praktikasem1+self.praktikasem2*self.nrjavesem2
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['renditja']
        indexes = [
            models.Index(fields=['-plani'],),
        ]
    def __str__(self):
         return f' {self.plani.programi.emertimi} {self.plani.periudha}' or ''

    

    
   


    