from django.urls import path
from .views import ArticleDetailAPIView, UserArticleListCreateAPIView, ArticleListAPIView, UserDetailAPIView, UserDraftArticleListAPIView

app_name = 'articles'

urlpatterns = [
    # path('create/', ArticleCreateAPIView.as_view(), name="article_add"),
    path('create/', UserArticleListCreateAPIView.as_view(), name="article_create"),
    path('edit/<int:pk>/', UserDetailAPIView.as_view(), name="article_edit"),
    path('<int:pk>/', ArticleDetailAPIView.as_view(), name="article_admin"),
    path('list/', ArticleListAPIView.as_view(), name="article_list"),
    path('drafts/', UserDraftArticleListAPIView.as_view(), name='user_draft_articles'),
]

# api_v1/articles
# api_v1/user/articles
# api_v1/admin/articles
