# Generated by Django 5.0.6 on 2024-06-17 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_banner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='banner',
            field=models.ImageField(blank=True, default='../media/d.png', upload_to=''),
        ),
    ]
