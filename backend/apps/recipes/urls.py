from django.urls import path
from .views import RecipesView, AddRecipeView, RecipeDetailView, MyRecipesView, EditRecipeView


urlpatterns = [
    path('', RecipesView.as_view()),
    path('add/', AddRecipeView.as_view()),
    path('my/', MyRecipesView.as_view()),
    path('edit/<int:pk>/', EditRecipeView.as_view()),
    path('<int:pk>/', RecipeDetailView.as_view()),
]
