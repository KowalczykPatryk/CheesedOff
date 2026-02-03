from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from .serializers import RecipeSerializer
from .models import Recipe


class RecipesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response(serializer.data)
    
class AddRecipeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = RecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Recipe added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class RecipeDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RecipeSerializer
    def get_queryset(self):
        return Recipe.objects.all()
    
class MyRecipesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recipes = Recipe.objects.filter(author=request.user)
        serializer = RecipeSerializer(recipes, many=True, context={'request': request})
        return Response(serializer.data)
    
class EditRecipeView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RecipeSerializer
    def get_queryset(self):
        return Recipe.objects.all()
    def update(self, request, *args, **kwargs):
        recipe = self.get_object()
        if recipe.author != request.user:
            return Response({"message": "You do not have permission to edit this recipe."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)
