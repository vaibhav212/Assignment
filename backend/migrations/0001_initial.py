# Generated by Django 4.2.1 on 2024-04-15 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('userID', models.CharField(max_length=100)),
                ('message', models.TextField()),
            ],
        ),
    ]
