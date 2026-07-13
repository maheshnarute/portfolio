from django.contrib import admin
from .models import Visitor, ContactMessage

@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'page_viewed', 'timestamp', 'user_agent')
    search_fields = ('ip_address', 'page_viewed')
    list_filter = ('timestamp',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'timestamp', 'is_read')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('is_read', 'timestamp')
