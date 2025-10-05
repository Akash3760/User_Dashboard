from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Users, Role, SubRole

# Register your models here.
# Custom action to mark status as Done
def mark_as_done(modeladmin, request, queryset):
    queryset.update(status="Done")
mark_as_done.short_description = "Mark selected items as Done"

# Register Role model
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "status", "created_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("name",)
    actions = [mark_as_done]

# Register SubRole model
@admin.register(SubRole)
class SubRoleAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "status", "created_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("name",)
    actions = [mark_as_done]

# Register Users model with custom UserAdmin
@admin.register(Users)
class CustomUserAdmin(UserAdmin):
    # Fields shown when editing a user
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        ("Role info", {"fields": ("role", "subrole", "request_access", "status")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    # Fields shown when adding a new user
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "username", "password1", "password2",
                "first_name", "last_name", "email",
                "role", "subrole", "request_access", "status",
                "is_staff", "is_superuser", "groups", "user_permissions"
            ),
        }),
    )

    readonly_fields = ("created_at", "updated_at")

    list_display = ("username", "email", "role", "subrole", "request_access", "status", "is_staff", "is_superuser", "created_at", "updated_at")
    list_filter = ("status", "is_staff", "is_superuser", "role")
    search_fields = ("username", "email", "first_name", "last_name")
    ordering = ("username",)
    actions = [mark_as_done]
