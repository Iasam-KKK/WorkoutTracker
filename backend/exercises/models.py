from django.db import models

class Exercise(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    # Add any other fields you need for the Exercise model

    def __str__(self):
        return self.name