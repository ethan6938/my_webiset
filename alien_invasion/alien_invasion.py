import pygame
import sys
from settings import Settings
from ship import Ship
from bullet import Bullet
from alien import Alien
from alien_bullet import AlienBullet

class AlienInvasion:
    """Overall class to manage game assets and behavior."""

    def __init__(self):
        """Initialize the game, and create game resources."""
        pygame.init()  # Initialize Pygame
        self.clock = pygame.time.Clock()
        self.settings = Settings()

        # Initialize the screen
        self.screen = pygame.display.set_mode(
            (self.settings.screen_width, self.settings.screen_height)
        )
        pygame.display.set_caption("Alien Invasion")

        # Create an instance of the ship.
        self.ship = Ship(self)

        # Store bullets in a group.
        self.bullets = pygame.sprite.Group()

        # Store alien bullets
        self.alien_bullets = pygame.sprite.Group()

        # Store aliens in a group.
        self.aliens = pygame.sprite.Group()

        # Create the fleet of aliens.
        self._create_fleet()

        # Set background color
        self.bg_color = (0, 0, 0)  # Black background

        # Initialize score and lives
        self.score = 0
        self.lives = 3

        # Create font for score and lives display
        self.font = pygame.font.SysFont(None, 48)

    def _create_alien(self, x_position, y_position):
        """Create an alien and place it in the aliens group at the given position."""
        alien = Alien(self)
        alien.rect.x = x_position
        alien.rect.y = y_position
        self.aliens.add(alien)

    def _create_fleet(self):
        """Create the fleet of aliens (3 rows and 6 columns)."""
        alien = Alien(self)
        alien_width, alien_height = alien.rect.size  # Get the alien's width and height
        
        # Number of aliens per row and column
        number_of_aliens_x = 6
        number_of_aliens_y = 5

        # Calculate the starting position to center the fleet
        starting_x = (self.settings.screen_width - (alien_width * number_of_aliens_x)) // 2
        starting_y = (self.settings.screen_height // 4)  # Adjusted to center vertically

        # Create aliens in rows and columns
        for row in range(number_of_aliens_y):
            for column in range(number_of_aliens_x):
                x_position = starting_x + column * alien_width  # Space out aliens horizontally
                y_position = starting_y + row * alien_height  # Space out aliens vertically
                self._create_alien(x_position, y_position)

    def run_game(self):
        """Start the main loop for the game."""
        while True:
            self._check_events()
            self.ship.update()  # Update ship's position
            self._update_bullets()  # Update bullets
            self._update_fleet()  # Update the fleet (move aliens)
            self._update_alien_bullets()  # Update alien bullets
            self._update_screen()  # Update the screen

            # Check if all aliens are eliminated
            if not self.aliens:
                print("You Win! All aliens are defeated.")
                break  # Exit the game loop
            
            if self.lives <= 0:  # End the game if lives are 0
                print("Game Over!")
                break

            self.clock.tick(30)  # Maintain 60 frames per second

    def _check_events(self):  
        """Respond to keypresses and mouse events."""      
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Left mouse button
                    # Fire bullet from ship's position when clicked anywhere
                    self._fire_bullet()

    def _fire_bullet(self):
        """Create a new bullet and add it to the bullets group."""
        new_bullet = Bullet(self)
        self.bullets.add(new_bullet)

    def _update_bullets(self):
        """Update the position of bullets and check for collisions with aliens."""
        # Check for collisions between bullets and aliens
        collisions = pygame.sprite.groupcollide(self.bullets, self.aliens, True, True)
        if collisions:
            self.score += 10  # Increase score for each alien hit
            print("Score: ", self.score)
        
        # Remove bullets that go off-screen
        for bullet in self.bullets.copy():
            if bullet.rect.bottom <= 0:
                self.bullets.remove(bullet)
        self.bullets.update()

    def _update_fleet(self):
        """Update the position of the fleet and animate it."""
        self.aliens.update()  # Update aliens' positions
       
        # Let aliens shoot randomly
        self._alien_shoot()


    def _alien_shoot(self):
        """Let the aliens shoot at the player."""
        for alien in self.aliens.sprites():
            if pygame.sprite.collide_rect(alien, self.ship):
                self.lives -= 1
                print("Lives left: ", self.lives)

            if alien.rect.bottom >= self.settings.screen_height:
                continue  # Skip if the alien is at the bottom
            if pygame.time.get_ticks() % 60 == 0:  # Alien shoots periodically
                new_alien_bullet = AlienBullet(self, alien.rect.centerx, alien.rect.bottom)
                self.alien_bullets.add(new_alien_bullet)

    def _update_alien_bullets(self):
        """Update the position of alien bullets and check for collisions with the ship."""
        for bullet in self.alien_bullets.copy():
            if bullet.rect.top >= self.settings.screen_height:
                self.alien_bullets.remove(bullet)
        
        # Check for collisions between alien bullets and the ship
        collisions = pygame.sprite.spritecollide(self.ship, self.alien_bullets, True)
        if collisions:
            self.lives -= 1
            print("Lives left: ", self.lives)

        self.alien_bullets.update()

    def _update_screen(self):
        """Update the screen and redraw everything."""
        self.screen.fill(self.bg_color)  # Fill the screen with background color
        self.ship.blitme()  # Draw the ship
        self.bullets.draw(self.screen)  # Draw the bullets
        self.aliens.draw(self.screen)  # Draw the aliens
        self.alien_bullets.draw(self.screen)  # Draw alien bullets

        # Display score and lives
        score_text = self.font.render(f"Score: {self.score}", True, (255, 255, 255))
        lives_text = self.font.render(f"Lives: {self.lives}", True, (255, 255, 255))
        self.screen.blit(score_text, (10, 10))
        self.screen.blit(lives_text, (10, 50))  # Display lives in the top-left corner

        pygame.display.flip()  # Update the display

if __name__ == '__main__':
    # Create an instance of the game and run it.
    ai = AlienInvasion()
    ai.run_game()   

