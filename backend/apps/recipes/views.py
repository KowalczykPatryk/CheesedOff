from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import RecipeSerializer


class RecipesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        recipes = request.user.recipes.all()
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
