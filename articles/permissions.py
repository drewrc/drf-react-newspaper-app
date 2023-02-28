from rest_framework import permissions
from .models import Article

# custom permissions
# class ReadOnly(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user in permissions.SAFE_METHODS

class IsUnauthenticatedReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user 

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class AuthorOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            return True
        
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        return request.user.is_staff or request.user.is_superuser

# class IsAdminUser(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.is_superuser