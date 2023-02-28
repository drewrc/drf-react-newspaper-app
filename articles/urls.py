from django.urls import path
from .views import admin_reject_api_endpoint, UserRejectedDetailView, UserRejectedListView, ArchivedListView, AdminDetailView, AdminSubmittedListView, UserArticleListCreateAPIView, ArticleListAPIView, UserDetailAPIView, UserDraftArticleListAPIView, admin_publish_api_endpoint

app_name = 'articles'

urlpatterns = [
    # admin view URLS
    path('submitted/', AdminSubmittedListView.as_view(), name="articles_submitted"),
    path('submitted/<int:pk>/', AdminDetailView.as_view(),
         name="article_submitted"),

    path('archived/', ArchivedListView.as_view(), name='archived'),
    # path('archived/<int:pk>/', AdminArchivedDetailView.as_view(),
    #      name='archived_edit'),

    path('publish/<str:category>/<int:pk>/', admin_publish_api_endpoint), # api_v1/articles/publish/abc/2/
    path('reject/<int:pk>/', admin_reject_api_endpoint),

    # auth user view URLS
    path('create/', UserArticleListCreateAPIView.as_view(), name="article_create"),
    path('edit/<int:pk>/', UserDetailAPIView.as_view(), name="article_edit"),
    path('drafts/', UserDraftArticleListAPIView.as_view(),
         name='user_draft_articles'),
    path('rejected/', UserRejectedListView.as_view(), name='rejected'),
    path('rejected/<int:pk>/', UserRejectedDetailView.as_view(), name="rejected_edit"),


    # unauth view URLS
    path('list/', ArticleListAPIView.as_view(), name="article_list"),

]
