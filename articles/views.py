from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly, AuthorOnly


################ VIEWS FOR AUTHENTICATED USER ###################
#################################################################

# CREATE AND VIEW -- users can CREATE and VIEW articles here --- >
class UserArticleListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)
# method is defined to return a queryset of Article objects
# where the author field matches the current authenticated user (self.request.user)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def update_phase(self, request, *args, **kwargs):
        article = self.get_object()
        phase = request.data.get('phase')
        if phase in ['DFT', 'SBM']:
            article.phase = phase
            article.save()
            serializer = self.get_serializer(article)
            return JsonResponse(serializer.data)
        return Response({'message': 'Invalid phase value'}, status=status.HTTP_400_BAD_REQUEST)

###################################################################
# EDIT, DELETE, SUBMIT OR SAVE -- 'USER DETAIL' VIEW HERE -------- >
###################################################################


class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)
# filter articles based off user // drf-built-in method

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)
# allows user to edit // drf-built-in method

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()

    def update_phase(self, request, *args, **kwargs):
        article = self.get_object()
        phase = request.data.get('phase')
        if phase in ['DFT', 'SBM']:
            article.phase = phase
            article.save()
            serializer = self.get_serializer(article)
            return JsonResponse(serializer.data)
        return Response({'message': 'Invalid phase value'}, status=status.HTTP_400_BAD_REQUEST)


class UserDraftArticleListAPIView(UserArticleListCreateAPIView):
    def get_queryset(self):
        # can use methods of super class
        queryset = super().get_queryset()
        return queryset.filter(phase='DFT')


###################### VIEWS FOR ADMIN ##########################
#################################################################
class AdminSubmittedListView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='SBM')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)


class AdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.filter(phase='SBM')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)

    def admin_update_phase(self, request, *args, **kwargs):
        article = self.get_object()
        phase = request.data.get('phase')
        if phase in ['PUB', 'REJ', 'ARC']:
            article.phase = phase
            article.save()
            serializer = self.get_serializer(article)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid phase value'})


class ArchivedListView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='ARC')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class UserRejectedListView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='REJ')
    serializer_class = ArticleSerializer
    permission_classes = (AuthorOnly,)


class UserRejectedDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.filter(phase='REJ')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class ArticleListAPIView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='PUB')
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


@api_view(['PUT'])
def admin_publish_api_endpoint(request, pk, category):
    try:
        instance = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    instance.category = category
    instance.phase = 'PUB'
    instance.save()
    serializer = ArticleSerializer(instance)
    return Response(serializer.data)


@api_view(['PUT'])
def admin_reject_api_endpoint(request, pk):
    try:
        instance = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    instance.phase = 'REJ'
    instance.save()
    serializer = ArticleSerializer(instance)
    return Response(serializer.data)
