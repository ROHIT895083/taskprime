from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.models import User
from .models import UserProfile, Task

# Show default Django Users in Admin (already registered)
# Only register your custom models below

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'address')
    search_fields = ('user__username', 'phone')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'created_at')
    search_fields = ('title',)