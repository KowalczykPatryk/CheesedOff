from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class RecipesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        recipes = [{"title" : "Pancakes", "rating" : "9.0"}, {"title" : "Fish", "rating" : "8.5"}]
        return Response(recipes)


