from django.conf import settings
from django.db import models

# Create your models here.


class Article(models.Model):
    OPTION_A = 'technews'
    OPTION_B = 'software'
    OPTION_C = 'gaming'
    OPTION_D = 'esports'

    CATEGORY_CHOICES = [
        (OPTION_A, 'technews'),
        (OPTION_B, 'software'),
        (OPTION_C, 'gaming'),
        (OPTION_D, 'esports'),
    ]

    DRAFT = 'DFT'
    SUBMITTED = 'SBM'
    PUBLISHED = 'PUB'
    REJECTED = 'REJ'
    ARCHIVED = 'ARC'

    PHASE_CHOICES = [
        (DRAFT, 'DFT'),
        (SUBMITTED, 'SBM'),
        (PUBLISHED, 'PUB'),
        (REJECTED, 'REJ'),
        (ARCHIVED, 'ARC'),
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    category = models.CharField(
        max_length=8, choices=CATEGORY_CHOICES, blank=True, null=True)
    title = models.CharField(max_length=255)
    text = models.TextField()
    img = models.ImageField(upload_to='images/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_published = models.BooleanField(default=False)
    phase = models.CharField(max_length=20, choices=PHASE_CHOICES, blank=True)

    def __str__(self):
        return self.title[:50]
