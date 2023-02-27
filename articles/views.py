from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from .models import Article
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly, IsAdminOrReadOnly, IsAdminUser

############## VIEWS FOR UNAUTHENTICATED USER  ##################
#################################################################

# READ ONLY -- display only list view here --------- >
class ArticleListAPIView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='PUB')
    serializer_class = ArticleSerializer


################ VIEWS FOR AUTHENTICATED USER ###################
#################################################################

# CREATE AND VIEW -- users can CREATE and VIEW articles here --- >
class UserArticleListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)
# method is defined to return a queryset of Article objects 
# where the author field matches the current authenticated user (self.request.user)    
    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)
#value of author is saved as name as current authenticated user here 
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
 #custom update_phase method 
 # allows user to either SAVE as draft or SUBMIT to be published   
    def update_phase(self, request, *args, **kwargs):
        article = self.get_object()
        phase = request.data.get('phase')
        if phase in ['DFT', 'SBM']:
            article.phase = phase
            article.save()        
            serializer = self.get_serializer(article)
            return JsonResponse(serializer.data)
#return error if phase value is not 'dft' or 'sbt'
        return Response({'message': 'Invalid phase value'}, status=status.HTTP_400_BAD_REQUEST)
    
###################################################################
#EDIT, DELETE, SUBMIT OR SAVE -- 'USER DETAIL' VIEW HERE -------- >
###################################################################
class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)
#filter articles based off user // drf-built-in method
    def get_queryset(self):
        return Article.objects.filter(author=self.request.user)
#allows user to edit // drf-built-in method
    def perform_update(self, serializer):
        serializer.save(author=self.request.user)
# allows user to delete // drf-built-in method
# when a user sends a DELETE request -> UserDetailAPIView 
# w/ Article object's primary key as the URL parameter, 
# the perform_destroy method will be called to delete the Article object
    def perform_destroy(self, instance):
        instance.delete()
#allows user to update // custom method that allows us to update 'phase'        
    def update_phase(self, request, *args, **kwargs):
#retrieve current article using pk value in URL
        article = self.get_object()
#phase will need to be sent to end point when 'save draft' or 'submit' is clicked in component
        phase = request.data.get('phase')
#if phase value 'dft' or 'sbt' execute...
        if phase in ['DFT', 'SBM']:
#update the phase field of the Article object with the new value 
            article.phase = phase
#save object to database 
            article.save()
#serialize the updated Article object            
            serializer = self.get_serializer(article)
#returns the serialized data
            return JsonResponse(serializer.data)
#return error if phase value is not 'dft' or 'sbt'
        return Response({'message': 'Invalid phase value'}, status=status.HTTP_400_BAD_REQUEST)

################filter drafts by user################# ------ >
class UserDraftArticleListAPIView(UserArticleListCreateAPIView):
    def get_queryset(self):
        #can use methods of super class
        queryset = super().get_queryset()
        return queryset.filter(phase='DFT')


###################### VIEWS FOR ADMIN ##########################
#################################################################
class AdminSubmittedListView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='SBM')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminOrReadOnly,)

class AdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.filter(phase='SBM')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)
    def admin_update_phase(self, request, *args, **kwargs):
        article = self.get_object()
        phase = request.data.get('phase')
        if phase in ['PUB', 'REJ', 'ARC']:
            article.phase = phase
            article.save()
            serializer = self.get_serializer(article)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid phase value'})
        
class AdminArchivedListView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='ARC')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)

class AdminArchivedDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.filter(phase='ARC')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)

class AdminRejectedListView(generics.ListAPIView):
    queryset = Article.objects.filter(phase='REJ')
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)