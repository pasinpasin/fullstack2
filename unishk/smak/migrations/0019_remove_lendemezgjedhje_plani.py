# Generated by Django 4.1.7 on 2023-03-19 19:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('smak', '0018_lendemezgjedhje_viti'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lendemezgjedhje',
            name='plani',
        ),
    ]
