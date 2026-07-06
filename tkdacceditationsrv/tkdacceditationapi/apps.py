from django.apps import AppConfig


class TkdacceditationapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tkdacceditationapi'

    def ready(self):
        import tkdacceditationapi.signals 