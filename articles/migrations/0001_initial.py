# Generated by Django 4.1.7 on 2023-02-21 03:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('text', models.TextField()),
                ('img', models.ImageField(upload_to='images/')),
            ],
        ),
    ]
