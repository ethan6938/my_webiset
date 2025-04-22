import pygame

class Ship:
    """A class to manage the ship."""

    def __init__(self, ai_game):
        """Initialize the ship and set its starting position."""
        self.screen = ai_game.screen
        self.screen_rect = ai_game.screen.get_rect()

        # Load the ship image and get its rect, then scale it down
        self.image = pygame.image.load('images/ship.bmp')
        self.image = pygame.transform.scale(self.image, (50, 50))  # Resize the image to (50x50)
        self.rect = self.image.get_rect()

        # Start each new ship at the bottom center of the screen.
        self.rect.midbottom = self.screen_rect.midbottom

    def update(self):
        """Update the ship's position based on the mouse."""
        # Get the current mouse position and set the ship's position
        mouse_x, mouse_y = pygame.mouse.get_pos()
        
        # Constrain ship's x position within screen boundaries
        if mouse_x < 0:
            mouse_x = 0
        elif mouse_x > self.screen_rect.width:
            mouse_x = self.screen_rect.width

        # Set the ship's position to the mouse's position, but leave it at the bottom
        self.rect.centerx = mouse_x
        self.rect.bottom = self.screen_rect.bottom  # Keep ship at the bottom of the screen

    def blitme(self):
        """Draw the ship at its current location."""
        self.screen.blit(self.image, self.rect)
