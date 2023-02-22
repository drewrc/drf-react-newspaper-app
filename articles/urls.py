from django.urls import path
from .views import ArticleCreateAPIView, ArticleDetailAPIView, ArticleListAPIView

app_name = 'articles'

urlpatterns = [
    path('create/', ArticleCreateAPIView.as_view(), name="article_add"),
    path('articles/', ArticleListAPIView.as_view(), name="article_list"),
    path('articles/<int:pk>/', ArticleDetailAPIView.as_view(), name="article_list"),
]