from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ticket, Team, UserProfile

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class UserProfileSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), source='team', write_only=True
    )
    class Meta:
        model = UserProfile
        fields = ['team', 'team_id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), write_only=True
    )
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'team_id']

    def create(self, validated_data):
        team = validated_data.pop('team_id')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        UserProfile.objects.create(user=user, team=team)
        return user

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

class TicketSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%B %#d %Y", read_only=True)
    ticket_id = serializers.CharField(read_only=True)

    class Meta:
        model = Ticket
        fields = ['ticket_id', 'type_of_issue', 'status', 'priority', 'type', 'date']

    def create(self, validated_data):
        # Auto-generate ticket_id like CICT-0001
        last = Ticket.objects.order_by('-id').first()
        next_num = (last.id + 1) if last else 1
        validated_data['ticket_id'] = f"CICT-{next_num:04d}"
        return super().create(validated_data)