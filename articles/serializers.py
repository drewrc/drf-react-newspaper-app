from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    #this returns user.username from author on our article model 
    #it is now visible in our views
    user_name = serializers.ReadOnlyField(source = 'author.username')
    class Meta:
        model = Article
        fields = '__all__'