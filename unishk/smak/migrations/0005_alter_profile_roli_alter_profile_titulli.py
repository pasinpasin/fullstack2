# Generated by Django 4.1.7 on 2023-02-25 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('smak', '0004_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='roli',
            field=models.CharField(choices=[('Pedagog', 'Pedagog'), ('ShefDep', 'ShefDep'), ('Dekan', 'Dekan'), ('Rektor', 'Rektor'), ('Kurrikula', 'Kurrikula'), ('Admin', 'Admin')], default='Pedagog', max_length=10),
        ),
        migrations.AlterField(
            model_name='profile',
            name='titulli',
            field=models.CharField(choices=[('Msc', 'Msc.'), ('Dr', 'Dr'), ('Prof.Dr', 'Prof.Dr'), ('Doc', 'Doc')], max_length=10),
        ),
    ]
