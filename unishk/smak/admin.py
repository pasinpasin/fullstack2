from django.contrib import admin
from .models import Fakulteti,Departamenti,Programi,Profile




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

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'atesia', 'photo', 'roli', 'departamenti']
    raw_id_fields = ['user']
