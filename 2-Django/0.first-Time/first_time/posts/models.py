from django.db import models



class Post(models.Model): 
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    content = models.TextField()
    slug = models.SlugField()
    date = models.DateTimeField(auto_now_add=True) 
