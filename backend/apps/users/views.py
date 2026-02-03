from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from .models import Profile

class RegisterView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Account created successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Welcome",
                "accessToken": str(refresh.access_token),
                "refreshToken": str(refresh)
            })
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile_image_url = None

        if hasattr(user, 'profile') and user.profile.image:
            profile_image_url = request.build_absolute_uri(user.profile.image.url)
            
        return Response({
            "username": user.username,
            "email": user.email,
            "profile_image": profile_image_url
        })
    def post(self, request):
        user = request.user
        profile_image = request.FILES.get("profile_image")
        if profile_image:
            if not hasattr(user, 'profile'):
                Profile.objects.create(user=user)
            user.profile.image = profile_image
            user.profile.save()
            return Response({"message": "Profile image set successfully"})
        return Response({"message": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
    