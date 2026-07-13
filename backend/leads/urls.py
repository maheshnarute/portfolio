from django.urls import path
from .views import visitor_api, contact_api, visitor_count_api

urlpatterns = [
    path('visitor/', visitor_api, name='visitor_api'),
    path('visitor/count/', visitor_count_api, name='visitor_count_api'),
    path('contact/', contact_api, name='contact_api'),
]
