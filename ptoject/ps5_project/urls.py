"""
URL configuration for ps5_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path ,include
from games.views import game_list, game_detail, game_create, game_edit, game_delete, register, logout_view
from django.contrib.auth.views import LoginView
from django.contrib.auth.views import LogoutView



urlpatterns = [
    path("admin/", admin.site.urls),

    path('accounts/login/', LoginView.as_view(), name='login'),  # URL for login

    path('logout/', logout_view, name='logout'),

    path('accounts/register/', register, name='register'),  # URL for login

    path('', game_list, name='home'),

    path("game/", game_list, name="game_list"),  # Ensure this exists

    path("game/<int:pk>/", game_detail, name="game_detail"),

    path("game/new/", game_create, name="game_create"),

    path("game/<int:pk>/edit/", game_edit, name="game_edit"),

    path("game/<int:pk>/delete/", game_delete, name="game_delete"),
]

