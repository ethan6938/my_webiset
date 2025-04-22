from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=100)

    description = models.TextField()

    genre = models.CharField(max_length=50)
    
    release_date = models.DateField()

    def __str__(self):
        return self.title