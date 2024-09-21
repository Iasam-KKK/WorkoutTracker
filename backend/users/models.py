from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add any additional fields you want for your custom user model
    # For example:
    # bio = models.TextField(blank=True)
    pass