import pygame
from pygame.sprite import Sprite

class Bullet(Sprite):
    """A class to manage bullets fired from the ship."""

    def __init__(self, ai_game):
        """Create a bullet object at the ship's current position."""
        super().__init__()
        self.screen = ai_game.screen

        # Create a bullet rect at (0, 0) and set its position
        self.rect = pygame.Rect(0, 0, 3, 15)  # Bullet size: 3x15
        self.rect.centerx = ai_game.ship.rect.centerx
        self.rect.top = ai_game.ship.rect.top

        # Store the bullet's position as a float.
        self.y = float(self.rect.y)

        # Set bullet speed
        self.speed = 10

        # Create the bullet's image as a small rectangle (a filled color surface)
        self.image = pygame.Surface(self.rect.size)  # Create a surface with the size of the bullet rect
        self.image.fill((255, 0, 0))  # Fill the surface with red color (change as needed)

    def update(self):
        """Move the bullet up the screen."""
        self.y -= self.speed  # Move the bullet up
        self.rect.y = self.y  # Update the rect's position
