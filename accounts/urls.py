from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('profiles/', views.ProfileCreateAPIView.as_view(), name="profile_add"),
    path('users/', views.UserListAPIView.as_view(), name="profile_list"),
    # path('get-username/', views.get_username, name='get_username'),
]