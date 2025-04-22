from django import forms
from .models import Game
from django.contrib.auth.models import User

class GameForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = ['title', 'description', 'genre', 'release_date']
        labels = {
            'title': 'Game Title',  # Set custom label for title field

            'description': 'Game Description',  # Custom label for description

            'genre': 'Game Genre',  # Custom label for genre
            
            'release_date': 'Release Date (yyyy-mm-dd)',  # Custom label for release_date
        }


class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email']

    def clean_password_confirm(self):
        password = self.cleaned_data.get('password')
        password_confirm = self.cleaned_data.get('password_confirm')

        if password != password_confirm:
            raise forms.ValidationError("Passwords do not match.")
        return password_confirm