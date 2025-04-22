from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Game
from .forms import GameForm
from django.contrib.auth.decorators import login_required 
from django.contrib.auth import login
from django.contrib.auth import logout
from .forms import RegistrationForm


def game_list(request):
    games = Game.objects.all()
    return render(request, 'games/game_list.html', {'games': games})

def game_detail(request, pk):
    game = get_object_or_404(Game, pk=pk)
    return render(request, 'games/game_detail.html', {'game': game})

@login_required
def game_create(request):
    if request.method == 'POST':
        form = GameForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('game_list')
    else:
        form = GameForm()
    return render(request, 'games/game_form.html', {'form': form})

def game_edit(request, pk):
    game = get_object_or_404(Game, pk=pk)
    if request.method == 'POST':
        form = GameForm(request.POST, instance=game)
        if form.is_valid():
            form.save()
            return redirect('game_detail', pk=game.pk)
    else:
        form = GameForm(instance=game)
    return render(request, 'games/game_form.html', {'form': form})

def game_delete(request, pk):
    game = get_object_or_404(Game, pk=pk)
    if request.method == 'POST':
        game.delete()
        return redirect('game_list')
    return render(request, 'games/game_confirm_delete.html', {'game': game})


def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)  # Don't save to the database yet
            user.set_password(form.cleaned_data['password'])  # Hash password
            user.save()  # Now save the user with the hashed password
            login(request, user)  # Log the user in
            return redirect('game_list')  # Redirect to the game list or another page
    else:
        form = RegistrationForm()

    return render(request, 'registration/register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')
