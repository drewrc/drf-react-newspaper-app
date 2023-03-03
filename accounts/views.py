from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer, TokenSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

User = get_user_model()

class ProfileCreateAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all();
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserListAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Profile.objects.all()

