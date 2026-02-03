from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    author_profile_image = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ("id", "title", "instructions", "image", "author", "author_profile_image", "created_at", "updated_at")
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
    
    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance