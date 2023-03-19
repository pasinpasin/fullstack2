# Generated by Django 4.1.7 on 2023-03-19 14:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('smak', '0016_alter_profile_roli'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lendemezgjedhje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emertimi', models.CharField(max_length=500)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('lenda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='i_perket_lendes', to='smak.planpermbajtja')),
                ('plani', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='i_perket_planit', to='smak.planet')),
            ],
        ),
    ]