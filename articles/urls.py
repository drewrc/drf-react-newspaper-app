from django.urls import path
from .views import AdminRejectedListView, AdminArchivedListView, AdminArchivedDetailView, AdminDetailView, AdminSubmittedListView, UserArticleListCreateAPIView, ArticleListAPIView, UserDetailAPIView, UserDraftArticleListAPIView

app_name = 'articles'

urlpatterns = [
    #admin view URLS
    path('submitted/', AdminSubmittedListView.as_view(), name="articles_submitted"),
    path('submitted/<int:pk>/', AdminDetailView.as_view(), name="article_submitted"),

    path('archived/', AdminArchivedListView.as_view(), name='archived'),
    path('archived/<int:pk>/', AdminArchivedDetailView.as_view(), name='archived_edit'),

    path('rejected/', AdminRejectedListView.as_view(), name='rejected'),

    #auth user view URLS
    path('create/', UserArticleListCreateAPIView.as_view(), name="article_create"),
    path('edit/<int:pk>/', UserDetailAPIView.as_view(), name="article_edit"),
    path('drafts/', UserDraftArticleListAPIView.as_view(), name='user_draft_articles'),
    
    #unauth view URLS
    path('list/', ArticleListAPIView.as_view(), name="article_list"),
   
]

# api_v1/articles
# api_v1/user/articles
# api_v1/admin/articles
