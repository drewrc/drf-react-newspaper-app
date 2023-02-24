from django.conf import settings
from django.db import models

# Create your models here.

class Article(models.Model):
    OPTION_A = 'technews'
    OPTION_B = 'software'
    OPTION_C = 'gaming'
    OPTION_D = 'esports'

    OPTION_CHOICES = [
        (OPTION_A, 'technews'),
        (OPTION_B, 'software'),
        (OPTION_C, 'gaming'),
        (OPTION_D, 'esports'),
    ]
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=30, null=True)
    category = models.CharField(max_length=8, choices=OPTION_CHOICES, null=True)
    title = models.CharField(max_length=255)
    text = models.TextField()
    img = models.ImageField(upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_published = models.BooleanField(default=False)
    def __str__(self):
        return self.title[:50]