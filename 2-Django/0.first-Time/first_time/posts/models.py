from django.db import models
import os



class Post(models.Model): 
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    content = models.TextField()
    slug = models.SlugField()
    date = models.DateTimeField(auto_now_add=True) 
    banner = models.ImageField(default="../media/d.png"  , blank=True)
    def __str__(self):
        return self.title