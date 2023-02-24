from django.urls import include, path

app_name = "api_v1"

urlpatterns = [
    path('', include('accounts.urls', namespace="accounts")),
    path('articles/', include('articles.urls', namespace="articles")),
    #path('', include('articles.urls', namespace="articles")),
]