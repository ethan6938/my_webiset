from django.urls import path
from .views import logout_view


urlpatterns = [
    path('game/', views.game_list, name='game_list'),

    path('game/<int:pk>/', views.game_detail, name='game_detail'),

    path('game/new/', views.game_create, name='game_create'),

    path('game/<int:pk>/edit/', views.game_edit, name='game_edit'),

    path('game/<int:pk>/delete/', views.game_delete, name='game_delete'),

    path('accounts/register/', views.register, name='register'),
    
    path('logout/', logout_view, name='logout'),
]
