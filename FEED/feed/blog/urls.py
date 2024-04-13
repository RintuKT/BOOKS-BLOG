from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name='Blog_Home'),
    path('about/', views.about,name='About Page')

]