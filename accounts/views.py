from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer



User = get_user_model()

class ProfileCreateAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all();
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        #serializer.save(user=get_object_or_404(User, id=1))
        serializer.save(user=self.request.user)

# class ProfileListAPIView(generics.ListCreateAPIView):
#     queryset = Profile.objects.all();
#     serializer_class = ProfileSerializer