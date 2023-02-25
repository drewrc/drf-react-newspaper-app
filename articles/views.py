from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly, IsAdminOrReadOnly
# VIEWS FOR UNAUTHENTICATED USER


class ArticleListAPIView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


# VIEWS FOR AUTHENTICATED USER
# CREATE AND VIEW USER (SELF) ARTICLES
class UserArticleListCreateAPIView(generics.ListCreateAPIView):
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)
#EDIT DETAIL VIEW 
# class UserDetailArticleView(generics)


# VIEWS FOR ADMIN


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# class ArticleListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
