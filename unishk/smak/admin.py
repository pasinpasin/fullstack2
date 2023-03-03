from django.contrib import admin
from .models import Fakulteti,Departamenti,Programi,Profile,Vitiakademik,Semestri,Planet,PlanPermbajtja
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin




@admin.register(Fakulteti)
class FakultetiAdmin(admin.ModelAdmin):
    list_display = ['emertimi', 'created','updated']
    list_filter = ['emertimi']
    search_fields = ['emertimi']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']

@admin.register(Departamenti)
class DepartamentiAdmin(admin.ModelAdmin):
    list_display = ['emertimi', 'created','updated','fakulteti']
    list_filter = ['emertimi','fakulteti']
    search_fields = ['emertimi','fakulteti']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']

@admin.register(Programi)
class ProgramiAdmin(admin.ModelAdmin):
    list_display = ['emertimi', 'created','updated','departamenti']
    list_filter = ['emertimi','departamenti']
    search_fields = ['emertimi','departamenti']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']

@admin.register(Vitiakademik)
class VitiakademikAdmin(admin.ModelAdmin):
    list_display = ['vitiakademik', 'created','updated']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']

@admin.register(Semestri)
class SemestriAdmin(admin.ModelAdmin):
    list_display = ['semestri', 'created','updated']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']

class PlanpermbajtjaInline(admin.TabularInline):
    model=PlanPermbajtja
    list_display = ['renditja','emertimi','titullari','tipiveprimtarise','kredite','nrjavesem1',
    'seminaresem1',
    'leksionesem1',
    'praktikasem1',
    'laboratoresem1',
    'nrjavesem2',
    'seminaresem2',
    'leksionesem2',
    'praktikasem2',
    'laboratoresem2', 'semestri','created','updated']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']

@admin.register(Planet)
class PlaniAdmin(admin.ModelAdmin):
    list_display = ['periudha','cikli','status','programi', 'created','updated']
    list_filter = ['periudha','cikli','programi']
    search_fields = ['programi','periudha']
    date_hierarchy = 'created'
    ordering = ['updated', 'created']
    inlines=[PlanpermbajtjaInline]





@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'atesia', 'photo', 'roli', 'departamenti']
    raw_id_fields = ['user']




