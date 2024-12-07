"""
URL mappings for the user API.
"""
from django.urls import path

from user import views


# CREATE_USER_URL = reverse('user:create')
app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
]
