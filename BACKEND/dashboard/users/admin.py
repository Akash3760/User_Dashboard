from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.contrib.auth.admin import UserAdmin
from .models import Users, Role, SubRole

# Register your models here.
# ---------- Custom Action ----------
def mark_as_done(modeladmin, request, queryset):
    queryset.update(status="Done")
mark_as_done.short_description = "Mark selected items as Done"

# ---------- Mixin for Edit Link ----------
class EditLinkMixin:
    @admin.display(description="Edit")
    def edit_link(self, obj):
        url = reverse(f"admin:{obj._meta.app_label}_{obj._meta.model_name}_change", args=[obj.pk])
        return format_html('<a class="btn btn-primary btn-sm" href="{}">Edit</a>', url)

# ---------- Role Admin ----------
@admin.register(Role)
class RoleAdmin(EditLinkMixin, admin.ModelAdmin):
    list_display = ("id", "name", "status", "edit_link")
    list_display_links = ("edit_link",)
    list_filter = ("status",)
    list_per_page = 10
    search_fields = ("name",)
    actions = [mark_as_done]

# ---------- SubRole Admin ----------
@admin.register(SubRole)
class SubRoleAdmin(EditLinkMixin, admin.ModelAdmin):
    list_display = ("id", "name", "status", "edit_link")
    list_display_links = ("edit_link",)
    list_filter = ("status",)
    list_per_page = 10
    search_fields = ("name",)
    actions = [mark_as_done]

# ---------- Custom User Admin ----------
@admin.register(Users)
class CustomUserAdmin(EditLinkMixin, UserAdmin):
    # Fields shown when editing a user
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        ("Role info", {"fields": ("role", "subrole", "request_access", "status")}),
        ("Permissions", {
            "fields": (
                "is_active", "groups", "user_permissions"
            )
        }),
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
                "is_active", "groups", "user_permissions"
            ),
        }),
    )

    readonly_fields = ("created_at", "updated_at")

    list_display = (
        "username", "email", "role", "subrole",
        "request_access", "status", "edit_link",
    )
    list_display_links = ("edit_link",)
    list_filter = ("status", "role")
    list_per_page = 10
    search_fields = ("username", "email", "first_name", "last_name")
    ordering = ("username",)
    actions = [mark_as_done]

