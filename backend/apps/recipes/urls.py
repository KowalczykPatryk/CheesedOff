from django.urls import path
from .views import RecipesView, AddRecipeView


urlpatterns = [
    path('', RecipesView.as_view()),
    path('add/', AddRecipeView.as_view()),
]
