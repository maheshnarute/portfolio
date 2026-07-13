from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Visitor
from .serializers import VisitorSerializer, ContactMessageSerializer
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
def visitor_api(request):
    """Log a new site visitor."""
    ip_address = request.META.get('HTTP_X_FORWARDED_FOR')
    if ip_address:
        ip_address = ip_address.split(',')[0].strip()
    else:
        ip_address = request.META.get('REMOTE_ADDR', '127.0.0.1')

    data = {
        'ip_address': ip_address,
        'user_agent': request.META.get('HTTP_USER_AGENT', ''),
        'page_viewed': request.data.get('page_viewed', '/'),
    }

    serializer = VisitorSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status': 'logged'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def visitor_count_api(request):
    """Return visitor count starting from 500."""
    count = 500 + Visitor.objects.count()
    return Response({'count': count}, status=status.HTTP_200_OK)


@api_view(['POST'])
def contact_api(request):
    """Handle contact form submission — store message & send emails."""
    serializer = ContactMessageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    contact_message = serializer.save()
    email_sent = False

    try:
        admin_email = getattr(settings, 'ADMIN_EMAIL', 'narutem07@gmail.com')

        # ── Email 1: Notify Mahesh ────────────────────────────────────────────
        send_mail(
            subject=f"[Portfolio] New Message from {contact_message.name}",
            message=(
                f"You received a new message from your portfolio:\n\n"
                f"Name:    {contact_message.name}\n"
                f"Email:   {contact_message.email}\n"
                f"Subject: {contact_message.subject or 'N/A'}\n\n"
                f"Message:\n{contact_message.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[admin_email],
            fail_silently=False,
        )

        # ── Email 2: Thank-you to visitor ─────────────────────────────────────
        send_mail(
            subject="Thanks for reaching out — Mahesh Narute",
            message=(
                f"Hi {contact_message.name},\n\n"
                f"Thank you for contacting me! I have received your message and will "
                f"get back to you within 24 hours.\n\n"
                f"Your message summary:\n"
                f"Subject: {contact_message.subject or 'General Inquiry'}\n\n"
                f"Best regards,\n"
                f"Mahesh Narute\n"
                f"Full-Stack Developer | narutem07@gmail.com"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[contact_message.email],
            fail_silently=False,
        )

        email_sent = True
        logger.info(f"Emails sent successfully for message from {contact_message.email}")

    except Exception as e:
        logger.warning(f"Email send failed (message still saved): {e}")

    return Response(
        {
            'status': 'success',
            'message': 'Your message has been received!',
            'email_sent': email_sent,
            'id': contact_message.id,
        },
        status=status.HTTP_201_CREATED,
    )
