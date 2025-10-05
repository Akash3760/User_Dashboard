from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Role, SubRole, Users
from .serializers import RoleSerializer, SubRoleSerializer, UserSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_roles(request):
    roles = Role.objects.filter(status="active")
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_subroles(request):
    subroles = SubRole.objects.filter(status="active")
    serializer = SubRoleSerializer(subroles, many=True)
    return Response(serializer.data)

# -----------------------------
# Signup View
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """
    Create a new user.
    Expected JSON body:
    {
        "first_name": "",
        "last_name": "",
        "username": "",
        "email": "",
        "password": "",
        "role": "",
        "subrole": "",
        "request_access": false
    }
    """
    data = request.data
    if Users.objects.filter(username=data.get("username")).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    if Users.objects.filter(email=data.get("email")).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = Users.objects.create_user(
        username=data.get("username"),
        email=data.get("email"),
        password=data.get("password"),
        first_name=data.get("first_name"),
        last_name=data.get("last_name"),
        role_id=data.get("role"),  # Make sure frontend sends Role ID
        subrole_id=data.get("subrole"),
        request_access=data.get("request_access", False)
    )
    
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# -----------------------------
# Login View
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Login user and return JWT token.
    Expected JSON body:
    {
        "username": "",
        "password": ""
    }
    """
    data = request.data
    username = data.get("username")
    password = data.get("password")
    user = authenticate(username=username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role.name if user.role else None,
                "subrole": user.subrole.name if user.subrole else None,
            }
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# -----------------------------
# Current User View
# -----------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    Get currently authenticated user info
    """
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

