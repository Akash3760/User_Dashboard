from rest_framework import serializers
from .models import Users, Role, SubRole

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class SubRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubRole
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    subrole = SubRoleSerializer(read_only=True)

    class Meta:
        model = Users
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'subrole', 'request_access', 'status', 'created_at', 'updated_at'
        ]
