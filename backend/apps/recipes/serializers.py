from rest_framework import serializers
from .models import Recipe, Rating

class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    author_profile_image = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    rating_count = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ("id", "title", "instructions", "image", "author", "author_profile_image", "user_rating", "average_rating", "rating_count", "created_at", "updated_at")
        read_only_fields = ("id", "author", "created_at", "updated_at")

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
    
    def get_author_profile_image(self, obj):
        if hasattr(obj.author, 'profile') and obj.author.profile.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.profile.image.url)
        return None
    
    def get_user_rating(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                rating = Rating.objects.get(recipe=obj, user=request.user)
                return rating.rating
            except Rating.DoesNotExist:
                return None
        return None
    
    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance
    
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if ratings:
            return round(sum(r.rating for r in ratings) / len(ratings), 1)
        return 0

    def get_rating_count(self, obj):
        return obj.ratings.count()