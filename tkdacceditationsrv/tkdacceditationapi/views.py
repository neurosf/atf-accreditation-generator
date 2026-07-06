from django.shortcuts import render

from .signals import delete_image_file
from .models import *
from .serializers import *
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from django.http import HttpResponse

class ParticipantListCreateView(ListCreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

class ParticipantRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

    def perform_destroy(self, instance):
        delete_image_file(sender=Participant, instance=instance)
        instance.delete()

def empty_participant_table(request):
    # Get all participants
    participants = Participant.objects.all()

    # Delete images associated with each participant
    for participant in participants:
        delete_image_file(sender=Participant, instance=participant)

    # Now, delete all Participant instances
    participants.delete()

    return HttpResponse("Participant table has been emptied.")