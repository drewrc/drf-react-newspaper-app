from rest_framework import permissions


# custom permissions
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # if get, put, post, delete... is a SAFE_METHOD, return True
        if request.method in permissions.SAFE_METHODS:
            return True
        # if not safe method....
        # author = person making request = True //request allowed
        # if author != person making request = False//request will not be allowed
        return obj.author == request.user
        # put phase here ...


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff
