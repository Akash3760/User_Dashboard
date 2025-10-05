from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.signup, name='user-register'),  # signup
    path('login/', views.login, name='user-login'),         # login
    path('me/', views.current_user, name='current-user'),  # get current logged-in user
    path('roles/', views.get_roles, name='get_roles'),
    path('subroles/', views.get_subroles, name='get_subroles'),
]
