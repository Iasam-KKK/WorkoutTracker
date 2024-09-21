from django.urls import path
from .views import UserSignUpView, UserLoginView, CurrentUserView

urlpatterns = [

    path('signup/', UserSignUpView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
]