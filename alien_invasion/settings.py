class Settings:
    """A class to store all settings for Alien Invasion."""

    def __init__(self):
        """Initialize the game's settings."""
        # Screen settings
        self.screen_width = 800
        self.screen_height = 600
        self.bg_color = (0, 0, 0)  # Black background

        # Ship settings
        self.ship_speed_factor = 1.5

        # Bullet settings
        self.bullet_speed_factor = 1
        self.bullet_width = 3
        self.bullet_height = 15
        self.bullet_color = (255, 255, 255)
        self.bullets_allowed = 3

        # Alien settings
        self.alien_speed_factor = 1  # Speed of aliens' movement
        self.fleet_drop_speed = 2  # Speed at which aliens drop when they hit screen edge
        self.fleet_direction = 1  # 1 represents moving right, -1 represents moving left
