from django.core.mail import  EmailMessage
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.core.mail import send_mail

from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    print("te email")

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-confirm'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Smak UNISHK"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email],
        fail_silently=False
    )