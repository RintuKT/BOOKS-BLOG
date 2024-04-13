from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Post(models.Model):
    objects = None
    book_name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    price = models.IntegerField()
    year = models.IntegerField()
    date_posted = models.DateTimeField(default=timezone.now)
    content = models.CharField(max_length=1000)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    images = models.ImageField(upload_to='Post', blank=True)

    def __str__(self):
        return self.book_name
