from django.urls import path
from .views  import * 

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[ 
    path('Api/Participant/', ParticipantListCreateView.as_view(), name='Participant-list-create'),
    path('Api/Participant/<int:pk>/', ParticipantRetrieveUpdateDeleteView.as_view(), name='Participant-retrieve-update-delete'),
    path('Api/empty_participant/', empty_participant_table, name='empty_participant_table'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)