from rest_framework.permissions import BasePermission

class IsValidated(BasePermission):
    """
    Custom permission to only allow access to validated users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_active)