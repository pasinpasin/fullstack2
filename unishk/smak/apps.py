from django.apps import AppConfig


class SmakConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'smak'

    def ready(self):
        #import smak.signals
        from . import signals
