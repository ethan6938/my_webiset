import pygame

class Alien(pygame.sprite.Sprite):
    def __init__(self, ai_game):
        super().__init__()
        self.screen = ai_game.screen
        self.settings = ai_game.settings

        # Load the alien image and scale it down
        self.image = pygame.image.load('images/alien.png')  # Replace with your image file path
        self.image = pygame.transform.scale(self.image, (50, 50))  # Make aliens smaller, adjust size

        self.rect = self.image.get_rect()
        self.screen_rect = ai_game.screen.get_rect()

        # Start each new alien at a random position in the middle of the screen
        self.rect.x = self.screen_rect.centerx
        self.rect.y = self.screen_rect.top

    def update(self):
        """Move the alien across the screen."""
        self.rect.x += self.settings.alien_speed_factor * self.settings.fleet_direction

        # If the alien hits the left or right edge of the screen, reverse its direction and move down
        if self.rect.right >= self.screen_rect.right or self.rect.left <= 0:
            # self.rect.y = self.settings.fleet_drop_speed  # Move the alien down
            self.settings.fleet_direction *= -1 # Reverse the direction horizontally
            
            # Prevent aliens from moving off the bottom of the screen
            if self.rect.bottom > self.screen_rect.bottom:
                self.rect.bottom = self.screen_rect.bottom