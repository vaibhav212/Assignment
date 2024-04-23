from django.db import models


# Create your models here.
class Message(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.CharField(max_length=100)
    message = models.TextField()
