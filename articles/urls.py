from django.urls import path
from .views import ArticleDetailAPIView, ArticleListCreateAPIView

app_name = 'articles'

urlpatterns = [
    # path('create/', ArticleCreateAPIView.as_view(), name="article_add"),
    path('', ArticleListCreateAPIView.as_view(), name="article_list"),
    path('articles/<int:pk>/', ArticleDetailAPIView.as_view(), name="article_list"),
]