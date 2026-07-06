from django.db import models

class Participant (models.Model):

    Nom = models.CharField(max_length=50)
    Prenom = models.CharField(max_length=50)
    IDp = models.CharField(max_length=15)
    Type = models.IntegerField()
    autoType = models.CharField(max_length=100,blank=True,null=True)
    Photo = models.ImageField(default="anonymous.png",null=True)