from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os
from .models import Participant

@receiver(pre_delete, sender=Participant)
def delete_image_file(sender, instance, **kwargs):
    image_path = instance.Photo.path

    if os.path.exists(image_path):
        os.remove(image_path)
        