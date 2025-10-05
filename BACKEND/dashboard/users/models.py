from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
# Base model
class BaseModel(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
    ]

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # This model won't create its own table


class Role(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class SubRole(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Users(AbstractUser, BaseModel):
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    subrole = models.ForeignKey(SubRole, on_delete=models.SET_NULL, null=True, blank=True)
    request_access = models.BooleanField(default=False)

    def __str__(self):
        return self.username

