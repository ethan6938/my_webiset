import pygame
from pygame.sprite import Sprite

class AlienBullet(Sprite):
    """A class to manage bullets fired by aliens."""

    def __init__(self, ai_game, x_position, y_position):
        """Create a bullet object at the given position."""
        super().__init__()
        self.screen = ai_game.screen
        self.settings = ai_game.settings
        self.color = (255, 0, 0)  # Red bullet for the aliens
        self.speed = 1 # Slowed down the speed of the alien bullets

        # Create a bullet surface (image) and set the correct color.
        self.image = pygame.Surface((5, 15))  # Create a surface for the bullet
        self.image.fill(self.color)  # Fill it with the bullet color

        # Create the rect for the bullet and set its position.
        self.rect = self.image.get_rect()
        self.rect.centerx = x_position  # Set the starting x position
        self.rect.top = y_position  # Set the starting y position

        # Store the bullet's position as a float for smoother movement.
        self.y = float(self.rect.y)

    def update(self):
        """Move the bullet down the screen."""
        self.y += self.speed  # Move the bullet downwards at the slower speed
        self.rect.y = self.y  # Update the rect position with the float value

    def draw_bullet(self):
        """Draw the bullet to the screen."""
        self.screen.blit(self.image, self.rect)

